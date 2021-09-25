import React from 'react'
import './Input.css'
const Input = ({message,setMessage,sendMessage}) => {
    return (
        <form className="form">
            <input type="text" className="input" placeholder="Type amessage..."  value={message} onChange={(e) =>setMessage(e.target.value)}  onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}/>
            <button className="sendButton" onClick={(e) =>{sendMessage(e)}}>Send</button>
        </form>
    )
}

export default Input
