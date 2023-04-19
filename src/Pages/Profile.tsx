import React, { useEffect } from 'react';
import CryptoJS from 'crypto-js';
import './Profile.scss';
import { useNavigate, useParams } from 'react-router';
import SideBar from '../Components/SideBar';
import Background from '../Images/Parrot.jpg';
import Notifications from '../Components/Notifications';
import { NotificationInterface } from '../Interfaces/Interface';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props {
    notifications?: NotificationInterface[];
    setNotifications: any;
    auth: any;
    setAuth: (auth: any) => void,
    notificationModel: boolean,
    setNotificationModel: (notificationModel: any) => void,
}

function Profile({ auth, setAuth, notificationModel, setNotificationModel,  notifications, setNotifications }: Props) {

    let { username } = useParams<{ username?: any }>();
    let navigate = useNavigate();

    const decryptedUsername = CryptoJS.AES.decrypt(username, 'secret-key').toString(CryptoJS.enc.Utf8);

    const localUser = localStorage.getItem('username');

    const handleShare = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
          .then(() => {
            alert("URL copied");
          })
          .catch((error) => {
            console.error('Error copying URL: ', error);
          });
    }

    useEffect(() => {
        if (!auth.login && (localUser === null || decryptedUsername !== localUser)) { navigate('/login'); }
    }, [auth, decryptedUsername, localUser, navigate]);

    return (
        <div className='profile-main-container'>
            <div className={`notifications-container${notificationModel ? ' active' : ''}`} 
            style={{
                overflowY: 'scroll'
            }}>
                <Notifications
                notifications={notifications}
                setNotifications={setNotifications}
                />
            </div>
            <div className='profile-card-section'>
                <Card sx={{ maxWidth: '100%' }}>
                    <CardMedia
                    sx={{
                        height: 340,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}
                    component="img" 
                    alt="Profile wallpaper"
                    image={Background}
                    />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {decryptedUsername}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleShare}>Share</Button>
                </CardActions>
                </Card>
            </div>
            <SideBar 
                auth={auth} 
                setAuth={setAuth}
                notificationModel={notificationModel}
                setNotificationModel={setNotificationModel}
            />
        </div>
    )
}
export default Profile;