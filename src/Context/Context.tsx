import React, { useState, createContext, FC } from 'react';

interface ContextValue {
    forgetPasswordPopup:boolean;
    setForgetPasswordPopup:React.Dispatch<React.SetStateAction<boolean>>
}
interface ContextProps {
    children: React.ReactNode;
}
export const MyContext = createContext<ContextValue | null>(null);
const Context: FC<ContextProps> = ({ children }) => {
   const [forgetPasswordPopup,setForgetPasswordPopup]=useState(false);

    const contextValue: ContextValue = {
        forgetPasswordPopup,
        setForgetPasswordPopup
    };

    return (
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
};

export default Context;
