import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import { CommentsInterface } from './Interfaces/Interface';
import { RepliesInterface } from './Interfaces/Interface';
import Home from './Pages/Home';
import Reply from './Components/Reply';

function App() {
  const [comments, setComments] = useState<CommentsInterface[]>();
  const [replies, setReplies] = useState<RepliesInterface[]>();

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
          <Route index element={<Home
            comments={comments}
            replies={replies}
            setReplies={setReplies}
            />}
          />
           <Route path="/reply/:id" index element={<Home 
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
