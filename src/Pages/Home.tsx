import React, { useState } from 'react';
import './Home.scss';
import axios from 'axios';
import Replies from '../Components/Replies';
import {FaReply} from 'react-icons/fa';
import { useNavigate} from 'react-router-dom';
import { CommentsInterface } from '../Interfaces/Interface';
import { RepliesInterface } from '../Interfaces/Interface';

interface Props {
    comments?: CommentsInterface[];
    replies?: RepliesInterface[];
}

function Home({comments, replies}: Props) {

    const navigate = useNavigate();

    const handleReply = (id: number) => {
        navigate(`/reply/${id}`);
    }

    const [score, setScore] = useState<{ count: number}>({
        count: 0
    });
    const [comment, setComment] = useState({
        content: "",
        username: ""
    });
   
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
   
    const handleUpvote = (data: Props | any) => {
       let newScore = ({...score, count : data.score ++ + 1});

       setScore(newScore);
        axios.put(`http://localhost:3002/comments/editScore/${data.id}`, {
            score: newScore.count,
        })
    }
   
    const handleDownVote = (data: Props | any) => {
        if(score.count === 0) {
            return null;
        } else {
            let newScore = ({...score, count : data.score -- -1});

            setScore(newScore)

            axios.put(`http://localhost:3002/comments/editScore/${data.id}`, {
                score: newScore.count,
            })
        }
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
                                <p id='upvote' onClick={e => handleUpvote(data)}>+</p>
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
        <Replies replies={replies} />
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