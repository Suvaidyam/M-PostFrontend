import React, { useContext, useEffect, useState } from 'react'
// import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import QueryForm from "./QueryForm";
// import "./Tabs.css";
import type { FC } from 'react';
import { MyContext } from '../../../../Context/Context';
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import CenterTabs from './CenterTabs';
import { Resizable } from "react-resizable-element";

interface QueryTabProps { }
function TabPanel(props: { [x: string]: any; children: any; value: any; index: any; }) {
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
    const { setcurrentTab, paramsData, setParamsData, headersData, setHeadersData } = useContext(MyContext)
    let activeQueryTab = sessionStorage.getItem("queryTab")
    const [value, setValue] = useState(activeQueryTab? parseInt(activeQueryTab): 0);
    useEffect(()=>{
      sessionStorage.setItem("queryTab", value as any);
    },[value])
    const handleChange = (event:any, newValue:any) => {
        sessionStorage.setItem("queryTab", newValue);
        setValue(newValue);
        // console.log(value);
      };
    return (

        // <Box sx={{ width: "100%" }}>
        //     <Box sx={{ height: "32px", minHeight: "32px", color: "#2563EB" }}>
        //         <Tabs
        //             sx={{ height: "32px", minHeight: "32px", color: "#2563EB" }}
        //             // value={value}
        //             // onChange={handleChange}
        //             aria-label="basic tabs example"
        //         >
        //             <Tab
        //                 onClick={() => setcurrentTab("Params")}
        //                 sx={{
        //                     height: "32px",
        //                     minHeight: "32px",
        //                     textTransform: "capitalize",
        //                     color: "#000000",
        //                 }}
        //                 label="Params"
        //             // {...a11yProps(0)}
        //             />
        //             <Tab
        //                 onClick={() => setcurrentTab("Headers")}

        //                 sx={{
        //                     height: "32px",
        //                     minHeight: "32px",
        //                     textTransform: "capitalize",
        //                     color: "#000000",
        //                 }}
        //                 label="Headers"
        //             // {...a11yProps(1)}
        //             />
        //             <Tab
        //                 onClick={() => setcurrentTab("Body")}
        //                 sx={{
        //                     height: "32px",
        //                     minHeight: "32px",
        //                     textTransform: "capitalize",
        //                     color: "#000000",
        //                 }}
        //                 label="Body"
        //             // {...a11yProps(2)}
        //             />
        //         </Tabs>
        //     </Box>
        // </Box>
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
                            {...a11yProps(1)}
                        />
                        <Tab
                            sx={{
                                height: "32px",
                                minHeight: "32px",
                                textTransform: "capitalize",
                                color: "#000000",
                            }}
                            label="Body"
                            {...a11yProps(2)}
                        />
                    </Tabs>
                </Box>
                <Resizable direction="bottom" >
                    <div className="bg-white h-full overflow-hidden overflow-y-scroll">
                        <TabPanel value={value} index={0}>
                            <QueryForm data={paramsData} setData={setParamsData} params={undefined}                            // {...{params}} 
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <QueryForm data={headersData} setData={setHeadersData} params={undefined} />
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
