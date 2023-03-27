import React from 'react';
import './Replies.scss';
import {FaReply, FaTrash, FaEdit} from 'react-icons/fa';
import { RepliesInterface } from '../Interfaces/Interface';

interface Props {
    replies?: RepliesInterface[];
}

function Replies({replies}: Props) {
    return (
        <>
        {replies?.map((data: RepliesInterface) => {
            return (
            <div className='comments-reply-container'>
                <div className='comments-reply-wrapper'>
                    <div className='comment-left-section'>
                    <div className='vote-container'>
                        <p id='upvote'>+</p>
                        <h3>{data.score}</h3>
                        <p id='downvote'>-</p>
                    </div>
                </div>
                <div className='comment-right-section'>
                    <div className='comment-user-container'>
                        <div className='user-info'>
                            <h2>{data.username}</h2>
                            <p>{data.createdAt}</p>
                        </div>
                        <div className='user-reply'>
                            <span id='delete-icon'><FaTrash/>Delete</span>
                            <span  id='edit-icon'><FaEdit/>Edit</span>
                        </div>
                    </div>
                    <div className='comment-feedback-container'>
                        <p><span>@{data.replyingTo}</span> {data.content}</p>
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