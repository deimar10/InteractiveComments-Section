import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import { CommentsInterface } from './Interfaces/Interface';
import { RepliesInterface } from './Interfaces/Interface';
import { NotificationInterface } from './Interfaces/Interface';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  const [comments, setComments] = useState<CommentsInterface[]>();
  const [replies, setReplies] = useState<RepliesInterface[]>();
  const [notifications, setNotifications] = useState<NotificationInterface[]>();
  const [auth, setAuth] = useState<{login: boolean}>({login:false});
  const [notificationModel, setNotificationModel] = useState<boolean>(false);
  const [register, setRegister] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3002/comments/get')
      .then(response => {
        const data = response.data;
        setComments(data);
      })

      axios.get('http://localhost:3002/reply/get')
      .then(response => {
        const data = response.data;
        setReplies(data);
      })
  },[]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login auth={auth} setAuth={setAuth} />} />
          <Route path="/login" index element={<Login
          auth={auth}
          setAuth={setAuth} 
          />}
          />
          <Route path="/register" element={<Register 
          register={register}
          setRegister={setRegister}
          />}
          />
          <Route path="/home/:username" element={<Home
            comments={comments}
            setComments={setComments}
            replies={replies}
            setReplies={setReplies}
            notifications={notifications}
            setNotifications={setNotifications}
            auth={auth}
            setAuth={setAuth}
            notificationModel={notificationModel}
            setNotificationModel={setNotificationModel}
            />}
          />
           <Route path="/home/:username/reply/:id" element={<Home 
            comments={comments}
            setComments={setComments}
            replies={replies}
            setReplies={setReplies}
            notifications={notifications}
            setNotifications={setNotifications}
            auth={auth}
            setAuth={setAuth}
            notificationModel={notificationModel}
            setNotificationModel={setNotificationModel}
             />}
          />
          <Route path="/profile/:username" element={<Profile 
            notifications={notifications}
            setNotifications={setNotifications}
            auth={auth}
            setAuth={setAuth}
            notificationModel={notificationModel}
            setNotificationModel={setNotificationModel}
            />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
