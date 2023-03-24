import React, { useState } from 'react';
import './Home.scss';
import axios from 'axios';
import {FaReply} from 'react-icons/fa';
import { useNavigate} from 'react-router-dom';
import { CommentsInterface } from '../Interfaces/Interface';

interface Props {
    comments?: CommentsInterface[];
}

function Home({comments}: Props) {

    const navigate = useNavigate();

    const handleReply = (id: any) => {
        navigate(`/reply/${id}`);
    }

    const [comment, setComment] = useState({
        content: "",
        username: ""
    })
   
    const commentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newComment = ({...comment, [e.target.name]: e.target.value, username : "User"});
        setComment(newComment);
    }

    const commentSend = () => {
        axios.post(`http://localhost:3002/comments/create`, {
        content: comment.content,
        username: comment.username
        }) .then(response => {
                setComment({...comment, content: "", username: ""});
                comments?.push(response.data);
        }) .catch(error => {
                console.log(error);
        });
    }
    return (
        <div className='main-comments-container'>
              <div className='comments-main-section'>
            {comments?.map((data) => {
                return (
                    <div>
                        <div className='comments-wrapper' key={data.id}>
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
                                        <span id='reply-icon' onClick={e => handleReply(data.id)}><FaReply />Reply</span>
                                    </div>
                                </div>
                            <div className='comment-feedback-container'>
                                <p>{data.content}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
            <div className='add-comment-container'>
                <div className="add-comment-left">
                    <img src='' />
                </div>
                <div className="add-comment-right">
                    <input name="content" type="text" placeholder="Add a comment..." onChange={commentChange} />
                    <button onClick={commentSend}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Home;