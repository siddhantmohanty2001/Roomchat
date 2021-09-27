const express=require('express');
const socketio=require('socket.io');
const http=require('http');
const Cors=require('cors');

const {addUser,removeUser,getUser,getUsersInRoom}=require('./users')

const router=require('./Routers/router');

const PORT =process.env.PORT||5000;
const app=express();

//middleware
app.use(router);
app.use(Cors({origin:'*'}));
const server=http.createServer(app);
const io=socketio(server, {
    cors: {
      origin: '*',
    }
  }); //Stores reference of every new socket

//socket code
//to register a user
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('join',({name,room},callback)=>{ //recives name and room passed in emit function for join event
       const {error,user}=addUser({id:socket.id,name,room});          //addUser() returns a error or user
                                        //call back function used to send error to frontend
        if(error) 
        return callback(error);

        socket.emit('message',{user:'admin',text:`${user.name}, welcome to the room ${user.room}`})
        socket.broadcast.to(user.room).emit('message',{user:'admin', text:`${user.name}, has joined`})  //broadcast send message to all except user who triggers the event

        socket.join(user.room); //join joins user to room
        
        io.to(user.room).emit('roomData', {room:user.room,users: getUsersInRoom(user.room)}) //users in the room

        callback(); //because callback is there in frontend even if there is no error
    })

    socket.on('sendMessage',(message,callback)=>{
        let user=getUser(socket.id);

        io.to(user.room).emit('message',{user:user.name,text:message})
        io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)});
        callback()

    }) //receives msg emitted by user in frontend
    socket.on('disconnect', () => {
        console.log('a user disconnected');
        const user=removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left`})
        }
    })
})
server.listen(PORT,()=>{
    console.log('listening on: ',PORT);
})