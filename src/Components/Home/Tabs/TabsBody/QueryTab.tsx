import React, { useContext, useEffect, useState } from 'react'
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import QueryForm from "./QueryForm";
import "../../../Home/Tabs/Tabs.css";
import type { FC } from 'react';
import { MyContext } from '../../../../Context/Context';
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import CenterTabs from './CenterTabs';
import { Resizable } from "react-resizable-element";

interface QueryTabProps { }
function TabPanel(props: { [x: string]: any; children: React.ReactNode; value: any; index: number; }) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const QueryTab: FC<QueryTabProps> = () => {
    const {  paramsData, setParamsData, headersData, setHeadersData,setBodyTab } = useContext(MyContext)
    let activeQueryTab = sessionStorage.getItem("queryTab")
    const [value, setValue] = useState(activeQueryTab ? parseInt(activeQueryTab) : 0);
    useEffect(() => {
        sessionStorage.setItem("queryTab", value as any);
    }, [value])
    const locTabList: any = JSON.parse(localStorage.getItem('tabsList') as any)
    // const activeData = locTabList.filter((e: any) => e._id === currentActive)
    // const paramsBackendData = tabData?.details?.query || activeData[0]?.details?.query;
    // const headersBackendData = tabData?.details?.headers || activeData[0]?.details?.headers;
    // console.log(headersBackendData)
    const handleChange = (event: any, newValue: any) => {
        sessionStorage.setItem("queryTab", newValue);
        setValue(newValue);
        // console.log(value);
    };
    return (
        <div className=" w-full h-full">
            <Box sx={{ width: "100%" }}>
                <Box sx={{ height: "32px", minHeight: "32px", color: "#2563EB" }}>
                    <Tabs
                        sx={{ height: "32px", minHeight: "32px", color: "#2563EB" }}
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab
                            sx={{
                                height: "32px",
                                minHeight: "32px",
                                textTransform: "capitalize",
                                color: "#000000",
                            }}
                            label="Params"
                            onClick={()=>setBodyTab("Params")}
                            {...a11yProps(0)}
                        />
                        <Tab
                            sx={{
                                height: "32px",
                                minHeight: "32px",
                                textTransform: "capitalize",
                                color: "#000000",
                            }}
                            label="Headers"
                            onClick={()=>setBodyTab("Headers")}
                            {...a11yProps(1)}
                        />
                        <Tab
                            sx={{
                                height: "32px",
                                minHeight: "32px",
                                textTransform: "capitalize",
                                color: "#000000",
                            }}
                            onClick={()=>setBodyTab("Body")}
                            label="Body"
                            {...a11yProps(2)}
                        />
                    </Tabs>
                </Box>
                <Resizable direction="bottom" >
                    <div className="bg-white h-full overflow-hidden overflow-y-scroll">
                        <TabPanel value={value} index={0}>
                            <QueryForm data={paramsData} setData={setParamsData} params={null}/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <QueryForm data={headersData} setData={setHeadersData} params={null} />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <CenterTabs />
                        </TabPanel>
                    </div>
                </Resizable>
            </Box>

        </div>


    );
}

export default QueryTab;
