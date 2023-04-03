import React from 'react';
import './Sidebar.scss';
import { GoSignOut } from 'react-icons/go';
import { useParams } from 'react-router';

interface Props {
    auth: any;
    setAuth: (auth: any) => void,
}

function SideBar({ auth, setAuth }: Props) {

    let { username } = useParams();

    const handleSignout = () => {
        window.localStorage.removeItem("username");
        setAuth({...auth, login: false});
    }

    return (
        <div className='sidebar-main-container'>
            <div className='profile-container'>
                <h3>Logged in as: <span>{username}</span></h3>
            </div>
            <div className='signout-container'>
                <span onClick={handleSignout}>Signout<GoSignOut id='signout-icon' /></span>
            </div>
        </div>
    )
}
export default SideBar;