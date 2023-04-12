import React, { useEffect } from 'react';
import axios from 'axios';
import './Notifications.scss';
import { NotificationInterface } from '../Interfaces/Interface';
import { useParams } from 'react-router';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import Divider from '@mui/material/Divider';

interface Props {
    notifications?: NotificationInterface[];
    setNotifications: any;
}

function Notifications({ notifications, setNotifications }: Props) {

    let { username } = useParams<{ username?: any }>();

    useEffect(() => {
        axios.get(`http://localhost:3002/notifications/${username}/get`)
        .then(response => {
            const data = response.data;
            setNotifications(data);
          })
    }, []);
 
    return (
        <div className="notification-main-container">
             {notifications?.length === 0 ? 
              <p id="notifications-message">There arent any notifications!</p>
              :
            <div className='user-notifications-container'>
                {notifications?.map((data: NotificationInterface) => {
                    return (
                        <>
                            <List
                            sx={{
                                width: '100%',
                                maxWidth: 360,
                            }}
                            >
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar 
                                    sx={{
                                        bgcolor: '#32a952',
                                    }}>
                                        <ThumbUpIcon />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Upvote" secondary={data.content} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar
                                    sx={{
                                        bgcolor: '#3f4ed4',
                                    }}>
                                        <MapsUgcIcon />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="New reply" secondary={data.content} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </List>
                            </>
                    )
                })}
            </div>
             }
        </div>
    )
}
export default Notifications;