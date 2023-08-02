import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import ForgetPassword from '../Auth/ForgetPassword/ForgetPassword';

interface RouterProps {}

const Router: FC<RouterProps> = () => {
    return (

        <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='*' element={<Login/>}/>
                {/* <Route path='/forgetpassword' element={<ForgetPassword/>}/> */}
            </Routes>
        </BrowserRouter>
        
        </>
    );
}

export default Router;
