import React,{useState,useEffect} from 'react'
import queryString from 'query-string' //to retrieve parameters 
import io from 'socket.io-client'
import Infobar from '../Infobar/Infobar'
import Input from '../Input/Input'

import './Chat.css'
import Messages from '../Messages/Messages'

let socket;

const Chat = ({location}) => { //locaton is the path of chat
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    const [messages,setMessages]=useState([]);
    const [message,setMessage]=useState('')
    const ENDPOINT='https://roomchat-app-backend.herokuapp.com/';
    useEffect(() => {

        const data=queryString.parse(location.search);
        socket =io(ENDPOINT)
        console.log(socket);

        const {name,room}=data;
        setName(name);
        setRoom(room);

        socket.emit('join',{name,room},()=>{
            
        })

       
        // return  ()=>{  //cleanup function used for unmounting 
        //                //called after user disconnects
        //         socket.emit('disconnect');
        //         socket.off();

        // }
    },[ENDPOINT,location.search]) //socket function called when ENDPOINT and location parameters change

    useEffect(()=>{
        socket.on('message',(message)=>{  //receives admin message
            setMessages(messages=>[...messages,message])

        }) //called everytime there is change in messages array
    },[])

    //function to send message

    const sendMessage =(e)=>{

        e.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''))
        }
    }

    console.log(message,messages);
    return (
        <div className="outerContainer">
            <div className="container">
                <Infobar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>

            </div>
        </div>
    )
}

export default Chat

//Cleanup used because we have to do something after user disconnects