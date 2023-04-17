import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import { RepliesInterface } from '../Interfaces/Interface';
import './Reply.scss';
import {MdSend} from 'react-icons/md';
import axios from 'axios';

interface Props {
    viewAlertModal: any;
    setViewAlertModal: any;
    replies?: any;
    setReplies: React.Dispatch<React.SetStateAction<RepliesInterface[]>>;
  }

function Reply({viewAlertModal, setViewAlertModal, replies, setReplies}: Props) {

    let { username, id } = useParams();

    const [reply, setReply] = useState<any>({
        content: ""
    })

    const replyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newReply = ({...reply, [e.target.name]: e.target.value});
        setReply(newReply);
    }

    const sendReply = () => {
        axios.post(`http://localhost:3002/reply/${username}/create/${id}`, {
        replyingId: id,
        content: reply.content,
        username: username,
        type: 'reply'
        }).then(response => {
            setReply({...reply, content: ""});
            replies?.push({
                id: response.data.id,
                content: response.data.content,
                score: response.data.score,
                username: response.data.username,
                createdAt: response.data.createdAt,
                replyingTo: response.data.replyingTo[0].username
             });
            setViewAlertModal({...viewAlertModal, view: true});
            }) .catch(error => {
                    console.log(error);
            });
    }

    return (
        <div className='add-reply-container'>
            <div className="add-reply-left">
                <input name="content" value={reply.content} type="text" placeholder="Add a reply..." onChange={replyChange} />
                <MdSend id='send-reply-icon' onClick={sendReply} />
            </div>
        </div> 
    )
}
export default Reply;