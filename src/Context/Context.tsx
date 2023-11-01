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
    paramsData: string[]
    setParamsData: React.Dispatch<React.SetStateAction<string[]>>
    headersData: string[]
    setHeadersData: React.Dispatch<React.SetStateAction<string[]>>
    tabData: any
    setTabData: React.Dispatch<React.SetStateAction<any>>
    enviroment: string[]
    SetEnviroment: React.Dispatch<React.SetStateAction<string[]>>
    jsonText: string
    setJsonText: React.Dispatch<React.SetStateAction<string>>
    currentActive: any
    setCurrentActive: React.Dispatch<React.SetStateAction<any>>
    tabsList: any
    setTabsList: React.Dispatch<React.SetStateAction<any>>
    workSpaceOpen: any
    setWorkSpaceOpen: React.Dispatch<React.SetStateAction<any>>
    Msg: string
    setMsg: React.Dispatch<React.SetStateAction<string>>
    error: boolean
    setError: React.Dispatch<React.SetStateAction<boolean>>
    status: number
    setStatus: React.Dispatch<React.SetStateAction<number>>
    responseData: any
    setResponseData: React.Dispatch<React.SetStateAction<any>>
    changeAction: any
    setchangeAction: React.Dispatch<React.SetStateAction<any>>
    topBarData: any
    setTopBarData: React.Dispatch<React.SetStateAction<any>>
    currentActiveEnv: any
    setCurrentActiveEnv: React.Dispatch<React.SetStateAction<any>>
    workSpaceId: any
    setWorkSpaceId: React.Dispatch<React.SetStateAction<any>>
    loader: boolean
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
    historyRender: boolean
    sethistoryRender: React.Dispatch<React.SetStateAction<boolean>>
    activeOption: any
    setActiveOption: React.Dispatch<React.SetStateAction<any>>, 
    newEnvironment: any
    setNewEnvironment: React.Dispatch<React.SetStateAction<any>>, 
    globalLoader: any
    setGlobalLoader: React.Dispatch<React.SetStateAction<any>>, 
    url: any,
    setUrl: React.Dispatch<React.SetStateAction<any>>, 
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
    const [paramsData, setParamsData] = useState<string[]>([]);
    const [headersData, setHeadersData] = useState<string[]>([]);
    const [enviroment, SetEnviroment] = useState<string[]>([]);
    const [tabData, setTabData] = useState([]);
    const [jsonText, setJsonText] = useState("");
    let activetabs = localStorage.getItem('tabsList')
    const [tabsList, setTabsList] = useState(activetabs ? JSON.parse(activetabs) : []);
    localStorage.setItem("tabsList", JSON.stringify(tabsList))
    // collection active tabs
    let abc = localStorage.getItem("currentActive")
    const [currentActive, setCurrentActive] = useState(abc ? JSON.parse(abc) : '');
    localStorage.setItem("currentActive", JSON.stringify(currentActive));

    const [workSpaceOpen, setWorkSpaceOpen] = useState(false);
    const [Msg, setMsg] = useState("");
    const [error, setError] = useState(false);
    const [status, setStatus] = useState<number>(200);
    const [changeAction, setchangeAction] = useState(false);
    const [topBarData, setTopBarData] = useState("");
    // environment active tabs
    const [currentActiveEnv, setCurrentActiveEnv] = useState('');
    // workspce id provide to filtter to all task
    const [workSpaceId, setWorkSpaceId] = useState(JSON.parse(localStorage.getItem('workSpace') as any));
    const [loader, setLoader] = useState(false);
    const [historyRender, sethistoryRender] = useState(false);
    // Set Active option Data 
    const [activeOption, setActiveOption] = useState<string>('');
    // Set Environment Data 
    const [newEnvironment, setNewEnvironment] = useState<any>([]);
    const [globalLoader, setGlobalLoader] = useState(false);
    const [url, setUrl] = useState();
    const [responseData, setResponseData] = useState<string[] | null>(null);

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
        setWorkSpaceOpen,
        Msg,
        setMsg,
        error,
        setError,
        status,
        setStatus,
        responseData,
        setResponseData,
        changeAction,
        setchangeAction,
        topBarData,
        setTopBarData,
        enviroment,
        SetEnviroment,
        currentActiveEnv,
        setCurrentActiveEnv,
        loader,
        setLoader,
        historyRender,
        sethistoryRender,
        activeOption,
        setActiveOption,
        newEnvironment,
        setNewEnvironment,
        globalLoader,
        setGlobalLoader,
        url,
        setUrl
    };

    return (
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
};

export default Context;
