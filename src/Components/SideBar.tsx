import React from 'react';
import CryptoJS from 'crypto-js';
import './Sidebar.scss';
import { useNavigate, useParams } from 'react-router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

interface Props {
    auth: any;
    setAuth: (auth: any) => void,
    notificationModel: boolean,
    setNotificationModel: (notificationModel: any) => void,
}

function SideBar({ auth, setAuth, notificationModel, setNotificationModel }: Props) {

    let navigate = useNavigate();

    let { username } = useParams<{ username?: any }>();
    
    const decryptedUsername = CryptoJS.AES.decrypt(username, 'secret-key').toString(CryptoJS.enc.Utf8);

    const handleSignout = () => {
        window.localStorage.removeItem("username");
        setAuth({...auth, login: false});
    }

    const handleNotifcation = () => {
        setNotificationModel(!notificationModel);
    }

    const handleProfile = () => {
        navigate(`/profile/${username}`);
    }

    const handleHome = () => {
        navigate(`/home/${username}`);
    }

    const [value, setValue] = React.useState(0);

    const theme = createTheme({
        palette: {
          primary: {
            main: 'hsl(238, 40%, 52%)',
          }
        },
      });
   
    return (
        <div className='sidebar-main-container '>
        <ThemeProvider theme={theme}>
          <Box sx={{ width: '100%' }}>
          <BottomNavigation sx={{ padding: '0.5rem' }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction color="primary" label="Home" icon={<HomeIcon onClick={handleHome} />} />
            <BottomNavigationAction color="primary" label={decryptedUsername} icon={<AssignmentIndIcon onClick={handleProfile} />} />
            <BottomNavigationAction color="primary" label="Notifications" icon={<NotificationsIcon onClick={handleNotifcation} />} />
            <BottomNavigationAction color="primary" label="Logout" icon={<LogoutIcon onClick={handleSignout} />} />
          </BottomNavigation>
        </Box>
        </ThemeProvider>
        </div>
    )
}
export default SideBar;