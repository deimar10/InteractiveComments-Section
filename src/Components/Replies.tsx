import React, { useState } from 'react';
import './Replies.scss';
import axios from 'axios';
import { FaTrash, FaEdit} from 'react-icons/fa';
import {MdSend} from 'react-icons/md';
import { RepliesInterface } from '../Interfaces/Interface';
import { useParams } from 'react-router';

interface Props {
    replies?: RepliesInterface[] | any;
    setReplies: (replies: any) => void;
}

function Replies({replies, setReplies}: Props) {

    let { username } = useParams();

    const [score, setScore] = useState<{ count: number}>({
        count: 0
    });
    const [editReplyView, setEditReplyView] = useState<boolean>(false);
    const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
    const [edit, setEdit] = useState<any>({
        content: ''
    });

    const handleUpVote = (data: Props | any) => {
        let newScore = ({...score, count : data.score ++ + 1});
 
        setScore(newScore);
         axios.put(`http://localhost:3002/reply/editScore/${data.id}`, {
             score: newScore.count,
         })
     }
    
     const handleDownVote = (data: Props | any) => {
         if(score.count === 0) {
             return null;
         } else {
             let newScore = ({...score, count : data.score -- -1});
 
             setScore(newScore)
 
             axios.put(`http://localhost:3002/reply/editScore/${data.id}`, {
                 score: newScore.count,
             })
         }
     }

     const handleDeleteReplies = (id: number) => {
        axios.delete(`http://localhost:3002/reply/${username}/delete/${id}`)
        .then(() => {
            let removedReply = replies?.filter((reply: RepliesInterface) => reply.id !== id);
            setReplies(removedReply);
        })
     }

     const handleEditReplies = (id: number) => {
        if(replies) {
            let updatedData = [...replies]
            updatedData.map((reply: RepliesInterface) => {
                if(reply.id === id) {
                    setEditReplyView(!editReplyView);
                    setActiveReplyId(id);
                    setEdit({...edit, content: reply.content})
                }
            })
        }
     }

     const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEdit({...edit, [e.target.name]: e.target.value})
     }

     const handleSendEdit = (id: number) => {
        axios.put(`http://localhost:3002/reply/${username}/edit/${id}`, {
            content: edit.content,
        })
        .then((response) => {
            const updatedReplies = [...replies];
            const replyIndex = updatedReplies.findIndex(reply => reply.id === id);
            updatedReplies[replyIndex].content = edit.content;
            setReplies(updatedReplies);
        }).catch(error => {
            console.log(error);
        })
     }
    return (
        <>
        {replies && replies?.map((data: RepliesInterface) => {
            return (
            <div className='comments-reply-container' key={data.id}>
                <div className='comments-reply-wrapper'>
                    <div className='comment-left-section'>
                    <div className='vote-container'>
                        <p id='upvote' onClick={e => handleUpVote(data)}>+</p>
                        <h3>{data.score}</h3>
                        <p id='downvote' onClick={e => handleDownVote(data)}>-</p>
                    </div>
                </div>
                <div className='comment-right-section'>
                    <div className='comment-user-container'>
                        <div className='user-info'>
                            <h2>{data.username}</h2>
                            <p>{data.createdAt}</p>
                        </div>
                        <div className='user-reply'>
                         {username === data.username ?
                            <>
                            <span id='delete-icon' onClick={e => handleDeleteReplies(data.id)}><FaTrash/>Delete</span>
                            <span id='edit-icon' onClick={e => handleEditReplies(data.id)}><FaEdit/>Edit</span>
                            </>
                            : null
                         }
                        </div>
                    </div>
                    <div className='comment-feedback-container'>
                        {editReplyView && activeReplyId === data.id ? 
                        <span id='edit-reply'>
                            <input name='content' value={edit.content} onChange={handleEditChange}></input>
                            <MdSend id='send-edited-reply' onClick={e => handleSendEdit(data.id)} />
                        </span>
                        :
                        <p><span>@{data.replyingTo}</span> {data.content}</p>
                        }
                    </div>
                </div>
                </div>
            </div>
            )
        })}
        
        </>
    )
}
export default Replies;