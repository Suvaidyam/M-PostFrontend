import React from 'react';
import './App.css';
import Login from './Components/Auth/Login/Login';
// import Register from './Components/Auth/Register/Register';
import Register from './Components/Auth/Register/Register';
import ForgetPassword from './Components/Auth/ForgetPassword/ForgetPassword';

function App() {
  return (
   <>
  
   {/* <Register/> */}
   <Login/>
   <ForgetPassword/>
   </>
  );
}

export default App;
