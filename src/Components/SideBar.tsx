import React from 'react';
import CryptoJS from 'crypto-js';
import './Sidebar.scss';
import { GoSignOut } from 'react-icons/go';
import { BsBellFill } from 'react-icons/bs';
import { useParams } from 'react-router';

interface Props {
    auth: any;
    setAuth: (auth: any) => void,
    notificationModel: boolean,
    setNotificationModel: (notificationModel: any) => void,
}

function SideBar({ auth, setAuth, notificationModel, setNotificationModel }: Props) {

    let { username } = useParams<{ username?: any }>();
    
    const decryptedUsername = CryptoJS.AES.decrypt(username, 'secret-key').toString(CryptoJS.enc.Utf8);

    const handleSignout = () => {
        window.localStorage.removeItem("username");
        setAuth({...auth, login: false});
    }

    const handleNotifcation = () => {
        setNotificationModel(!notificationModel);
    }
   
    return (
        <div className='sidebar-main-container'>
            <div className='profile-container'>
                <h3>Logged in as: <span>{decryptedUsername}</span></h3>
                <BsBellFill id='notification-icon' onClick={handleNotifcation} />
            </div>
            <div className='signout-container'>
                <span onClick={handleSignout}>Signout<GoSignOut id='signout-icon' /></span>
            </div>
        </div>
    )
}
export default SideBar;