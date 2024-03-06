import React, { useEffect, useState } from 'react'
import { user } from "../Join/Join";
import io from "socket.io-client";
import "./Chat.css";
import sendLogo from "../../images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";

let socket;

const ENDPOINT = "http://localhost:4000/";
const SPAM_ENDPOINT = "http://127.0.0.1:5000/predict";


const Chat = () => {
    const [id, setid] = useState("");
    const [messages, setMessages] = useState([])

    const send = async() => {
        
        const message = document.getElementById('chatInput').value;
     
        const response = await fetch(SPAM_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
            }),
        });
        const data = await response.json();
        const isSpam = data.prediction
        console.log('Data:',isSpam );
        

        socket.emit('message', { message, id, isSpam });
        document.getElementById('chatInput').value = "";
    }

   
    useEffect(() => {
        socket = io(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            setid(socket.id);

        })
        console.log(socket);
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message)
        })

        return () => {
            socket.emit('disconnects');
            socket.off();
        }
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
        })
        return () => {
            socket.off();
        }
    }, [messages])

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>Messaging</h2>
                    <a href="/"> <img src={closeIcon} alt="Close" /></a>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} isSpam={item.id===id ? "":item.isSpam}/>)}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input  onKeyDown={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
                </div>
            </div>

        </div>
    )
}

export default Chat
