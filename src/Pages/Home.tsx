import React, { useEffect, useState } from 'react';
import './Home.scss';
import axios from 'axios';
import Reply from '../Components/Reply';
import Replies from '../Components/Replies';
import ActionModal from '../Components/ActionModal';
import SideBar from '../Components/SideBar';
import {FaReply} from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentsInterface } from '../Interfaces/Interface';
import { RepliesInterface } from '../Interfaces/Interface';
import CommentsModal from '../Components/CommentsModal';

interface Props {
    comments?: CommentsInterface[];
    setComments: any;
    replies?: RepliesInterface[];
    setReplies: any;
    auth: any,
    setAuth: (auth: any) => void,
}

function Home({comments, setComments, replies, setReplies, auth, setAuth}: Props) {

    const [replyView, setReplyView] = useState<boolean>(false);
    const [commentsModalView, setCommentsModal] = useState<boolean>(false);
    const [activeCommentId, setActiveCommentId] = useState<number | null>(null);

    const navigate = useNavigate();
    let { username } = useParams();

    const handleReply = (id: any) => {
        if(comments) {
            let updatedData = [...comments];
            updatedData.map((comments: any) =>{
                if (comments.id === id) {
                    setReplyView(!replyView);
                    setActiveCommentId(id);
                }   if (replyView === true) {
                    navigate(`/home/${username}`);
                } else {
                    navigate(`/home/${username}/reply/${id}`);
                }
            })
        }
    }

    const [score, setScore] = useState<{ count: number}>({
        count: 0
    });
    const [comment, setComment] = useState({
        content: ""
    });
    const [viewAlertModal, setViewAlertModal] = useState<{commentAlert: boolean, replyAlert: false}>({
        commentAlert: false,
        replyAlert: false
    });
 
    const commentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newComment = ({...comment, [e.target.name]: e.target.value});
        setComment(newComment);
    }

    const commentSend = () => {
        axios.post(`http://localhost:3002/comments/create/${username}`, {
        content: comment.content,
        username: username
        }) .then(response => {
                setComment({...comment, content: ""});
                comments?.push(response.data);
                setViewAlertModal({...viewAlertModal, commentAlert: true })
        }) .catch(error => {
                console.log(error);
        });
    }
   
    const handleUpVote = (data: Props | any) => {
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

    const handleModalClose = () => {
        setViewAlertModal({...viewAlertModal, commentAlert: false, replyAlert: false});
    }

    const handleCommentsModal = (id: number) => {
        if(comments) {
            let updatedData = [...comments];
            updatedData.map((comments: CommentsInterface) => {
                if(comments.id === id) {
                    setCommentsModal(true);
                    setActiveCommentId(id);
                }
            })
        }
    }

    window.onload = (username: any) => {
      window.localStorage.setItem('username', username);
    }

    const commentAlert = ['Comment added'];
    const replyAlert = ['Reply added'];

    useEffect(() => {
        if (!auth.login && localStorage.getItem('username') === null) { navigate('/login'); }
    }, [auth])

    return (
    <div className='main-home-cotnainer'>
      {viewAlertModal.commentAlert ? 
        <ActionModal modal={commentAlert} handleModalClose={handleModalClose} />
        : 
        viewAlertModal.replyAlert ? 
            <ActionModal modal={replyAlert} handleModalClose={handleModalClose} />
       : null }
        <div className='main-comments-container'>
              <div className='comments-main-section'>
            {comments?.map((data) => {
                return (
                    <div>
                        <div className='comments-wrapper' key={data.id}>
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
                                        <span id='reply-icon' onClick={e => handleReply(data.id)}><FaReply />Reply</span> 
                                        {username === data.username ?
                                        <BsThreeDotsVertical id='dots-icon' onClick={e => handleCommentsModal(data.id)} />  
                                        : null 
                                        }                  
                                    </div>
                                    {commentsModalView && activeCommentId === data.id ? 
                                        <CommentsModal 
                                            comments={comments}
                                            setComments={setComments}
                                            setCommentsModal={setCommentsModal}
                                            activeCommentId={activeCommentId}
                                        />
                                        : null
                                     }
                                </div>
                            <div className='comment-feedback-container'>
                                <p>{data.content}</p>
                            </div>
                            </div>
                        </div>
                        <div className='replyingTo-continer'>
                            {replyView && activeCommentId === data.id ? 
                            <Reply 
                            viewAlertModal={viewAlertModal} 
                            setViewAlertModal={setViewAlertModal}
                            replies={replies}
                            setReplies={setReplies}
                              />
                            : null
                            }
                        </div>
                    </div>
                )
            })}
        </div>
        <Replies replies={replies} setReplies={setReplies} />
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
        <SideBar auth={auth} setAuth={setAuth} />
        </div>
    );
}

export default Home;