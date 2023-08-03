import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import DataProvider from '..//..//Context//Context'
import MainWorkspace from '..//MainWorkspace//MainWorkspace';
import Workspace from '../MainWorkspace/WorkSpace/Workspace';
import Reports from '../MainWorkspace/Reports/Reports';
import Explore from '../MainWorkspace/Explore/Explore';

interface RouterProps { }

const Router: FC<RouterProps> = () => {
    return (

        <>
            <BrowserRouter>
                <DataProvider >
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='*' element={<Login />} />
                        <Route path='/' element={<MainWorkspace />}>
                            <Route path='/workspace' element={<Workspace />} />
                            <Route path='/reports' element={<Reports />} />
                            <Route path='/explore' element={<Explore />} />
                        </Route>
                    </Routes>
                </DataProvider>
            </BrowserRouter>

        </>
    );
}

export default Router;
