import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import DataProvider from '..//..//Context//Context'
// import MainWorkspace from '../MainWokspace/MainWorkspace';
// import Workspace from '../MainWokspace/Workspace/Workspace';
import { Reports } from '../MainWokspace/Report/Reports';
import Explore from '../MainWokspace/Explore/Explore';
import Protected from './ProtectedRouter/Protected';
import WorkSpace from '../WorkSpace/WorkSpace';
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
                        {/* <Route path='/workspace' element={<Protected Component={<MainWorkspace />} />}>
                            <Route index element={<Workspace />} />
                            <Route path='reports' element={<Reports />} />
                            <Route path='explore' element={<Explore />} />
                        </Route> */}
                        <Route path='/workspace' element={<Protected Component={<WorkSpace />} />} />
                        <Route path='/reports' element={<Reports />} />
                        <Route path='/explore' element={<Explore />} />
                        <Route path='/home' element={<Home />} />
                    </Routes>
                </DataProvider>
            </BrowserRouter>

        </>
    );
}

export default Router;
