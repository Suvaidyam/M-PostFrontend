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
    setCurrentNav: any;
    collection: any;
    setCollection: any;
    currentTab: string;
    setcurrentTab: React.Dispatch<React.SetStateAction<string>>
    paramsData: any
    setParamsData: React.Dispatch<React.SetStateAction<any>>
    headersData: any
    setHeadersData: React.Dispatch<React.SetStateAction<any>>
    tabData: any
    setTabData: React.Dispatch<React.SetStateAction<any>>
    jsonText: any
    setJsonText: React.Dispatch<React.SetStateAction<any>>
    currentActive: any
    setCurrentActive: React.Dispatch<React.SetStateAction<any>>
    tabsList: any
    setTabsList: React.Dispatch<React.SetStateAction<any>>
    workSpaceId: any
    setWorkSpaceId: React.Dispatch<React.SetStateAction<any>>
    workSpaceOpen: any
    setWorkSpaceOpen: React.Dispatch<React.SetStateAction<any>>
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
    const [currentNav, setCurrentNav] = useState(activeNav ? activeNav : "Collection");
    const [collection, setCollection] = useState<Item[]>([]);
    const [currentTab, setcurrentTab] = useState('Params')
    const [paramsData, setParamsData] = useState([]);
    const [headersData, setHeadersData] = useState([]);
    const [tabData, setTabData] = useState([]);
    const [jsonText, setJsonText] = useState("");
    let activetabs = localStorage.getItem('tabsList')
    const [tabsList, setTabsList] = useState(activetabs ? JSON.parse(activetabs) : []);
    localStorage.setItem("tabsList", JSON.stringify(tabsList))
    // collection active tabs
    let abc = localStorage.getItem("currentActive")
    const [currentActive, setCurrentActive] = useState(abc ? JSON.parse(abc) : '');
    localStorage.setItem("currentActive", JSON.stringify(currentActive));

    const storedWorkSpace = localStorage.getItem('workSpace');
    const initialWorkSpaceId = storedWorkSpace ? JSON.parse(storedWorkSpace) : '';

    const [workSpaceId, setWorkSpaceId] = useState(initialWorkSpaceId);
    const [workSpaceOpen, setWorkSpaceOpen] = useState(false);



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
        setCurrentNav,
        collection,
        setCollection,
        currentTab,
        setcurrentTab,
        paramsData,
        setParamsData,
        headersData,
        setHeadersData,
        tabData,
        setTabData,
        jsonText,
        setJsonText,
        currentActive,
        setCurrentActive,
        tabsList,
        setTabsList,
        workSpaceId,
        setWorkSpaceId,
        workSpaceOpen,
        setWorkSpaceOpen
    };

    return (
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
};

export default Context;
