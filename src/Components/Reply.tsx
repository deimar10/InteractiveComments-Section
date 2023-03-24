import React from 'react';
import './Reply.scss';
import {MdSend} from 'react-icons/md';

function Reply() {
    return (
        <div className='add-reply-container'>
            <div className="add-reply-left">
                <input name="content" type="text" placeholder="Add a reply..."/>
                <MdSend id='send-reply-icon'/>
            </div>
        </div> 
    )
}
export default Reply;