import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import './Reply.scss';
import {MdSend} from 'react-icons/md';
import axios from 'axios';

function Reply() {

    let { id } = useParams();

    const [reply, setReply] = useState({
        content: "",
        username: ""
    })

    const replyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newReply = ({...reply, [e.target.name]: e.target.value, username : "User"});
        setReply(newReply);
    }

    const sendReply = () => {
        axios.post(`http://localhost:3002/reply/create/${id}`, {
        replyingId: id,
        content: reply.content,
        username: "John Doe"
        }).then(response => {
            setReply({...reply, content: "", username: ""});
                console.log(response.data)
            }) .catch(error => {
                    console.log(error);
            });
    }

    return (
        <div className='add-reply-container'>
            <div className="add-reply-left">
                <input name="content" type="text" placeholder="Add a reply..." onChange={replyChange} />
                <MdSend id='send-reply-icon' onClick={sendReply} />
            </div>
        </div> 
    )
}
export default Reply;