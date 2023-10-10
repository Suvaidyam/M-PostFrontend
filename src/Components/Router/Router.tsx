import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import DataProvider from '..//..//Context//Context'
import WorkSpace from '../WorkSpace/WorkSpace';

interface RouterProps { }

const Router: FC<RouterProps> = () => {
    return (
        <>
            <BrowserRouter>
                <DataProvider >
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/register' element={<Register />} />
                        {/* <Route path='*' element={<Login />} /> */}
                        <Route path='/workspace' element={<WorkSpace />} />
                    </Routes>
                </DataProvider>
            </BrowserRouter>

        </>
    );
}

export default Router;
