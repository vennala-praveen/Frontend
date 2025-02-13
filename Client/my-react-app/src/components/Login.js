import React, { useState } from 'react';
import axios from "axios";
import '../App.css';

const Login = ({onLogin})=> {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async()=>{
    try{
      const response = await axios.post("http://localhost:5000/login",{
        username, password
      });
      setMessage(response.data.message);
      if(response.data.message === "Login successful"){
        onLogin();
      }
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
      type={showPassword ? "text" : "password"}
      placeholder='Password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />

      <button
      style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        background: "none",
        border: "none",
        cursor: "pointer",
      }}
      onClick={()=> setShowPassword(!showPassword)}
      >
        
      </button>

      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
    
  );
}

export default Login;
