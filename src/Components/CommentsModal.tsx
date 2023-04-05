import react, { useState } from 'react';
import './CommentsModal.scss';
import { FaTrash, FaEdit} from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdSend } from 'react-icons/md'
import { CommentsInterface } from '../Interfaces/Interface';
import axios from 'axios';

interface Props {
    comments?: CommentsInterface[] | any;
    setComments: any;
    setCommentsModal: any;
    activeCommentId: number;
    editCommentView: boolean;
    setEditCommentView: any;
}

function CommentsModal({comments, setComments, setCommentsModal, activeCommentId, editCommentView, setEditCommentView}: Props) {

    const [edit, setEdit] = useState<any>({
        content: ''
    })

    const handleCloseModal = () => {
        setCommentsModal(false);
    }

    const handleDeleteComment = () => {
        axios.delete(`http://localhost:3002/comments/delete/${activeCommentId}`)
            .then(() => {
                let removedComment = comments?.filter((comment: CommentsInterface) => comment.id != activeCommentId);
                setComments(removedComment);
            })
    }

    const handleEditComment = () => {
        setEditCommentView(!editCommentView);
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEdit({...edit, [e.target.name]: e.target.value})
     }

     const handleSendEdit = () => {
        console.log(activeCommentId)
        axios.put(`http://localhost:3002/comments/edit/${activeCommentId}`, {
            content: edit.content
        })
        .then((response) => {
            const updatedComments = [...comments];
            const commentIndex = updatedComments.findIndex(comment => comment.id === activeCommentId);
            updatedComments[commentIndex].content = edit.content;
            setComments(updatedComments);
            setEditCommentView(!editCommentView);
        }).catch(error => {
            console.log(error);
        })
     }

    return (
        <>
        <div className='commentsModal-main-container'>
            <div className='commentsModal-close-section'>
                <AiFillCloseCircle id='close-icon' onClick={handleCloseModal} />
            </div>
            <div className='commensModal-handle-section'>
                <span id='delete-icon' onClick={handleDeleteComment}><FaTrash/>Delete</span>
                <span id='edit-icon' onClick={handleEditComment}><FaEdit/>Edit</span>
            </div>
        </div>
        {editCommentView ?
        <div className='commentsModal-edit-container'>
                <span id='edit-reply'>
                    <input name='content' value={edit.content} onChange={handleEditChange}></input>
                    <MdSend id='send-edited-reply' onClick={handleSendEdit}/>
                </span> 
        </div>
         : null   
        }
        </>
    )
}
export default CommentsModal;