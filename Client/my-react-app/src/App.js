import React, { useState } from 'react';
import Login from "./components/Login";
import Wallpapers from "./components/Wallpapers";
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return(
    <div>
      {!isLoggedIn ? (
        <Login onLogin={()=> setIsLoggedIn(true)}/>
      ):(
        <Wallpapers/>
      )}
    </div>
  )
  
}

export default App;
