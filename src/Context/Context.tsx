import React, { useState, createContext, FC } from 'react';

interface ContextValue {
    forgetPasswordPopup:boolean;
    setForgetPasswordPopup:React.Dispatch<React.SetStateAction<boolean>>;
    workspaceLefttoggle:boolean
    setWorkspaceLefttoggle:React.Dispatch<React.SetStateAction<boolean>>;
}
interface ContextProps {
    children: React.ReactNode;
}
export const MyContext = createContext<ContextValue | null>(null);
const Context: FC<ContextProps> = ({ children }) => {
   const [forgetPasswordPopup,setForgetPasswordPopup]=useState(false);
   const [workspaceLefttoggle,setWorkspaceLefttoggle]=useState(true);

    const contextValue: ContextValue = {
        forgetPasswordPopup,
        setForgetPasswordPopup,
        workspaceLefttoggle,
        setWorkspaceLefttoggle
    };

    return (
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
};

export default Context;
