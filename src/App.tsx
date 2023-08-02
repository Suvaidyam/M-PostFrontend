import React from 'react';
import './App.css';
import Router from './Components/Router/Router';
import Context from './Context/Context';
// import Login from './Components/Auth/Login/Login';
// import Register from './Components/Auth/Register/Register';
// import Register from './Components/Auth/Register/Register';
// import ForgetPassword from './Components/Auth/ForgetPassword/ForgetPassword'

function App() {
  return (
   <>
  
   
<Context>

 <Router/>

</Context>


  
   </>
  );
}

export default App;
