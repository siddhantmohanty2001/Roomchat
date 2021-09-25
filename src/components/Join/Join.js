import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import '../Join/Join.css'

const Join = () => {
    const [name,setName] =useState('');
    const [room,setRoom] =useState('');
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <div>
                    <input placeholder="Name" className="joinInput" type="text" onChange={(e)=>{setName(e.target.value)}}/>

                </div>
                <div>
                    <input placeholder="Room" className="joinInput" type="text" onChange={(e)=>{setRoom(e.target.value)}}/>
                </div>
                <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/Chat?name=${name}&room=${room}`}>
                <button type="submit" className="button mt-20" >Sign In</button>
                </Link>
            </div>
            
        </div>
    )
}

export default Join
