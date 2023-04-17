import react, { useState } from 'react';
import './CommentsModal.scss';
import { MdSend } from 'react-icons/md'
import { CommentsInterface } from '../Interfaces/Interface';
import axios from 'axios';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
    comments?: CommentsInterface[] | any;
    setComments: any;
    activeCommentId: any;
    editCommentView: boolean;
    setEditCommentView: any;
}

function CommentsModal({comments, setComments, activeCommentId, editCommentView, setEditCommentView}: Props) {

    const [edit, setEdit] = useState<any>({
        content: ''
    });
    const [commentId, setCommentId] = useState<number>();
 
    const handleDeleteComment = () => {
        axios.delete(`http://localhost:3002/comments/delete/${activeCommentId}`)
            .then(() => {
                let removedComment = comments?.filter((comment: CommentsInterface) => comment.id != activeCommentId);
                setComments(removedComment);
            })
    }

    const handleEditComment = () => {
        const updatedComments = [...comments];
        const commentIndex = updatedComments.findIndex(comment => comment.id === activeCommentId);
        setEdit({
            content: updatedComments[commentIndex].content
          });
        const setId =  updatedComments[commentIndex].id;
        setCommentId(setId);
        setEditCommentView(!editCommentView);
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEdit({...edit, [e.target.name]: e.target.value})
     }

     const handleSendEdit = () => {
        axios.put(`http://localhost:3002/comments/edit/${activeCommentId}`, {
            content: edit.content,
            modified: true
        })
        .then((response) => {
            const updatedComments = [...comments];
            const commentIndex = updatedComments.findIndex(comment => comment.id === activeCommentId);
            updatedComments[commentIndex].content = edit.content;
            updatedComments[commentIndex].modified = true;
            setComments(updatedComments);
            setEditCommentView(!editCommentView);
        }).catch(error => {
            console.log(error);
        })
     }

     const actions = [
        { icon: <DeleteIcon />, name: 'Delete', onClick: handleDeleteComment },
        { icon: <EditIcon />, name: 'Edit', onClick: handleEditComment },
    ];
 
    return (
        <>
        <div className='main-commentsModal-container'>
            <Box sx={{ height: 220, transform: 'translateZ(0px)', flexGrow: 1}}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        '& .MuiFab-root': {
                          width: 30,
                          height: 30,
                          minHeight: 30,
                        }
                      }}
                    icon={<SpeedDialIcon />}
                    FabProps={{
                        style: { backgroundColor: 'hsl(238, 40%, 52%)' }
                      }}
                >
                    {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.onClick}
                    />
                    ))}
                </SpeedDial>
            </Box>
        </div>
        {editCommentView && activeCommentId === commentId ?
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