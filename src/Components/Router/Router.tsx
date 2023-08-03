import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import DataProvider from '..//..//Context//Context'
import MainWorkspace from '..//MainWorkspace//MainWorkspace';

interface RouterProps { }

const Router: FC<RouterProps> = () => {
    return (

        <>
            <BrowserRouter>
                <DataProvider >
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='*' element={<Login />} />
                        <Route path='/mainworkspace' element={<MainWorkspace/>}/>
                    </Routes>
                </DataProvider>
            </BrowserRouter>

        </>
    );
}

export default Router;
