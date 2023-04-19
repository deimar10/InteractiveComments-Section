import React, { useEffect, useState } from 'react';
import './Home.scss';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Reply from '../Components/Reply';
import Replies from '../Components/Replies';
import ActionModal from '../Components/ActionModal';
import SideBar from '../Components/SideBar';
import {FaReply} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentsInterface } from '../Interfaces/Interface';
import { RepliesInterface } from '../Interfaces/Interface';
import { NotificationInterface } from '../Interfaces/Interface';
import CommentsModal from '../Components/CommentsModal';
import Notifications from '../Components/Notifications';

interface Props {
    comments?: CommentsInterface[];
    setComments: any;
    replies?: RepliesInterface[];
    setReplies: any;
    notifications?: NotificationInterface[];
    setNotifications: any;
    auth: any,
    setAuth: (auth: any) => void,
    notificationModel: boolean,
    setNotificationModel: (notificationModel: any) => void,
}

function Home(
    {comments, setComments, replies, setReplies, notifications, setNotifications, auth, setAuth, notificationModel, setNotificationModel}: Props) {

    const [replyView, setReplyView] = useState<boolean>(false);
    const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
    const [editCommentView, setEditCommentView] = useState<boolean>(false);

    const navigate = useNavigate();
    let { username } = useParams<{ username?: any }>();

    const decryptedUsername = CryptoJS.AES.decrypt(username, 'secret-key').toString(CryptoJS.enc.Utf8);
  
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
                return updatedData;
            })
        }
    }

    const [score, setScore] = useState<{ count: number}>({
        count: 0
    });
    const [comment, setComment] = useState({
        content: ""
    });
    const [viewAlertModal, setViewAlertModal] = useState<{view: boolean}>({
        view: false,
    });
 
    const commentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newComment = ({...comment, [e.target.name]: e.target.value});
        setComment(newComment);
    }

    const commentSend = () => {
        axios.post(`http://localhost:3002/comments/create/${username}`, {
        content: comment.content,
        username: username
        }).then(response => {
                setComment({...comment, content: ""});
                comments?.push(response.data);
                setViewAlertModal({...viewAlertModal, view: true });
        }).catch(error => {
                console.log(error);
        });
    }
   
    const handleUpVote = (data: Props | any) => {
       let newScore = ({...score, count : data.score ++ });

       setScore(newScore);
        axios.put(`http://localhost:3002/comments/${username}/editScore/${data.id}`, {
            score: newScore.count,
            type: 'upvote'
        })
    }
   
    const handleDownVote = (data: Props | any) => {
        if(score.count === 0) {
            return null;
        } else {
            let newScore = ({...score, count : data.score -- });

            setScore(newScore)

            axios.put(`http://localhost:3002/comments/${username}/editScore/${data.id}`, {
                score: newScore.count,
                type: 'downvote'
            })
        }
    }

    const handleModalClose = () => {
        setViewAlertModal({...viewAlertModal, view: false});
    }

    const handleCommentsModal = (id: number) => {
        if(comments) {
            let updatedData = [...comments];
            updatedData.map((comments: CommentsInterface) => {
                if(comments.id === id) {
                    setActiveCommentId(id);
                }
                return updatedData;
            })
        }
    }

    const localUser = localStorage.getItem('username');

    const settings = ['Successfull'];

    useEffect(() => {
        if (!auth.login && (localUser === null || decryptedUsername !== localUser)) { navigate('/login'); }
    }, [auth, decryptedUsername, localUser, navigate]);

    return (
    <div className='main-home-cotnainer'>
        <div className={`notifications-container${notificationModel ? ' active' : ''}`} 
        style={{
            overflowY: 'scroll'
        }}>
            <Notifications
            notifications={notifications}
            setNotifications={setNotifications}
            />
        </div>
      {viewAlertModal.view && 
        <ActionModal 
            modal={settings} 
            handleModalClose={handleModalClose} 
            open={viewAlertModal} 
        />
      }
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
                                            {data.modified && <span id='modified'>Modified</span>}
                                        <p>{data.createdAt}</p>
                                    </div>
                                    <div className='user-reply'>
                                        <span id='reply-icon' onClick={e => handleReply(data.id)}><FaReply />Reply</span> 
                                    </div>
                                </div>
                            <div className='comment-feedback-container'>
                                <p style={{
                                    display: activeCommentId === data.id && editCommentView ? 'none' : ''
                                }}>{data.content}</p>
                            </div>
                            { decryptedUsername === data.username ?
                            <div 
                                onMouseEnter={e => handleCommentsModal(data.id)}>
                            <CommentsModal
                                comments={comments}
                                setComments={setComments}
                                activeCommentId={activeCommentId}
                                editCommentView={editCommentView}
                                setEditCommentView={setEditCommentView} 
                            />
                            </div>
                            : null }
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
                </div>
                <div className="add-comment-right">
                    <input name="content" value={comment.content} type="text" placeholder="Add a comment..." onChange={commentChange} />
                    <button onClick={commentSend}>Send</button>
                </div>
            </div>
        </div>
        <SideBar 
            auth={auth} 
            setAuth={setAuth}
            notificationModel={notificationModel}
            setNotificationModel={setNotificationModel}
            />
        </div>
    );
}
export default Home;