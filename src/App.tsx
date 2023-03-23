import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './Pages/Home';

function App() {
  const [comments, setComments] = useState<any>();
  
  useEffect(() => {
    axios.get('http://localhost:3002/comments/get')
      .then(response => {
        const data = response.data;
        setComments(data);
      })
  },[]);
  return (
    <div className="App">
     <Home />
    </div>
  );
}

export default App;
