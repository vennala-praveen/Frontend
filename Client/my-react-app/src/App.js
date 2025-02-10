import React, { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async()=>{
    try{
      const response = await axios.post("http://localhost:5000/login",{
        username, password
      });
      setMessage(response.data.message);
    }catch(error){
      setMessage("Login failed");
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <input
      type='text'
      placeholder='Username'
      value={username}
      onChange={(e)=>setUsername(e.target.value)}
      />

      <input
      type='text'
      placeholder='Password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
    
  );
}

export default App;
