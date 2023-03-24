import React from 'react';
import './Home.scss';
import {FaReply} from 'react-icons/fa';
import { CommentsInterface } from '../Interfaces/Interface';

interface Props {
    comments?: CommentsInterface[];
}

function Home({comments}: Props) {
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
                                        <span id='reply-icon'><FaReply />Reply</span>
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
                    <input name="content" type="text" placeholder="Add a comment..." />
                    <button>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Home;