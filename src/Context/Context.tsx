import React, { useState, FC } from 'react';

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
    collection: any;
    setCollection: any;
    currentTab: string;
    setcurrentTab: React.Dispatch<React.SetStateAction<string>>
}
interface ContextProps {
    children: React.ReactNode;
}

interface Item {
    created_by: string;
    id: number;
}
export const MyContext = React.createContext<ContextValue>({} as ContextValue);

const Context: FC<ContextProps> = ({ children }) => {
    const [forgetPasswordPopup, setForgetPasswordPopup] = useState(false);
    const [workspaceLefttoggle, setWorkspaceLefttoggle] = useState(true);
    const [darkToggle, setDakToggle] = useState(false);
    const [slide, setSlide] = useState(false);
    const activeNav = localStorage.getItem("currentNav")
    const [currentNav, setcurrentNav] = useState(activeNav ? activeNav : "Collection");
    const [collection, setCollection] = useState<Item[]>([]);
    const [currentTab, setcurrentTab] = useState('Params')

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
        setcurrentNav,
        collection,
        setCollection,
        currentTab,
        setcurrentTab
    };

    return (
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
};

export default Context;
