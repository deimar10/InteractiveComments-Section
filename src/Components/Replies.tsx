import React, { useState } from 'react';
import './Replies.scss';
import axios from 'axios';
import { FaTrash, FaEdit} from 'react-icons/fa';
import { RepliesInterface } from '../Interfaces/Interface';

interface Props {
    replies?: RepliesInterface[];
}

function Replies({replies}: Props) {

    const [score, setScore] = useState<{ count: number}>({
        count: 0
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

    return (
        <>
        {replies?.map((data: RepliesInterface) => {
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