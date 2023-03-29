import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import { CommentsInterface } from './Interfaces/Interface';
import { RepliesInterface } from './Interfaces/Interface';
import Home from './Pages/Home';
import Login from './Pages/Login';

function App() {
  const [comments, setComments] = useState<CommentsInterface[]>();
  const [replies, setReplies] = useState<RepliesInterface[]>();
  const [auth, setAuth] = useState<{login: boolean}>({login:false});

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
          <Route path="/login" element={<Login
          auth={auth}
          setAuth={setAuth} 
          />}
          />
          <Route path="/home/:username" index element={<Home
            comments={comments}
            replies={replies}
            setReplies={setReplies}
            />}
          />
           <Route path="/home/:username/reply/:id" element={<Home 
            comments={comments}
            replies={replies}
            setReplies={setReplies}
             />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
