import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import DataProvider from '..//..//Context//Context'
import Protected from './ProtectedRouter/Protected';
import Home from '../Home/Home';

interface RouterProps { }

const Router: FC<RouterProps> = () => {
    return (
        <>
            <BrowserRouter>
                <DataProvider >
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        {/* <Route path='*' element={<Login />} /> */}
                        <Route path='/workspace' element={<Protected Component={<Home />} />} />
                        {/* <Route path='/reports' element={<Reports />} />
                        <Route path='/explore' element={<Explore />} /> */}
                    </Routes>
                </DataProvider>
            </BrowserRouter>

        </>
    );
}

export default Router;
