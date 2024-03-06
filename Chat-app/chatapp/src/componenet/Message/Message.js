import React, { useState } from 'react';
import "./Message.css";

const Message = ({ user, message, classs, isSpam }) => {
    console.log("spam message ", isSpam)
    const [spam, setSpam] = useState(isSpam === 1)
    if (user) {
        if (spam) {
            return (
                <div className={`messageBox spam ${classs}`} onClick={() => setSpam(false)}>
                    <span>ALERT! SPAM </span>
                    <span className='taptoview'>tap to view</span>
                </div>
            );
        } else {
            return (
                <div className={`messageBox ${classs}`}>
                    {`${user}: ${message}`}
                </div>
            );
        }
    } else {
        return (
            <div className={`messageBox ${classs}`}>
                {`You: ${message}`}
            </div>
        );
    }
};

export default Message;
