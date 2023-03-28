import React from 'react';
import './ActionModal.scss';
import {MdClose} from 'react-icons/md';

interface Props {
    modal: string[],
    handleModalClose(): void,
    
}

function ActionModal({modal, handleModalClose } : Props) {
    return (
        <div className='action-container'>
            <p>
                {modal[0]}
            </p>
            <MdClose 
                id="icon-close"
                onClick={handleModalClose}
            />
        </div>
    )
}
export default ActionModal;