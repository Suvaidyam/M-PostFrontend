import React, { useState, createContext, FC } from 'react';

interface ContextValue {
    forgetPasswordPopup: boolean;
    setForgetPasswordPopup: React.Dispatch<React.SetStateAction<boolean>>;
    workspaceLefttoggle: boolean
    setWorkspaceLefttoggle: React.Dispatch<React.SetStateAction<boolean>>;
    darkToggle: boolean;
    setDakToggle: React.Dispatch<React.SetStateAction<boolean>>;
    slide: boolean;
    setSlide: React.Dispatch<React.SetStateAction<boolean>>;
    currentNav: any;
    setcurrentNav: any;
}
interface ContextProps {
    children: React.ReactNode;
}
export const MyContext = React.createContext<ContextValue>({} as ContextValue);

const Context: FC<ContextProps> = ({ children }) => {
    const [forgetPasswordPopup, setForgetPasswordPopup] = useState(false);
    const [workspaceLefttoggle, setWorkspaceLefttoggle] = useState(true);
    const [darkToggle, setDakToggle] = useState(false);
    const [slide, setSlide] = useState(false);
    const activeNav = localStorage.getItem("currentNav")
    const [currentNav, setcurrentNav] = useState(activeNav ? activeNav : "Collection");


    const contextValue: ContextValue | null = {
        forgetPasswordPopup,
        setForgetPasswordPopup,
        workspaceLefttoggle,
        setWorkspaceLefttoggle,
        darkToggle,
        setDakToggle,
        slide,
        setSlide,
        currentNav,
        setcurrentNav
    };

    return (
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
};

export default Context;
