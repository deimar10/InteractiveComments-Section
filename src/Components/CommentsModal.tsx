import react from 'react';
import './CommentsModal.scss';
import { FaTrash, FaEdit} from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { CommentsInterface } from '../Interfaces/Interface';
import axios from 'axios';

interface Props {
    comments?: CommentsInterface[];
    setComments: any;
    setCommentsModal: any;
    activeCommentId: number;
}

function CommentsModal({comments, setComments, setCommentsModal, activeCommentId}: Props) {

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

    return (
        <div className='commentsModal-main-container'>
            <div className='commentsModal-close-section'>
                <AiFillCloseCircle id='close-icon' onClick={handleCloseModal} />
            </div>
            <div className='commensModal-handle-section'>
                <span id='delete-icon' onClick={handleDeleteComment}><FaTrash/>Delete</span>
                <span id='edit-icon'><FaEdit/>Edit</span>
            </div>
        </div>
    )
}
export default CommentsModal;