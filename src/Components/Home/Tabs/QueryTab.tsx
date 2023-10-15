import React, { useContext } from 'react'
// import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import QueryForm from "./QueryForm";
// import "./Tabs.css";
import type { FC } from 'react';
import { MyContext } from '../../../Context/Context';

interface QueryTabProps { }

const QueryTab: FC<QueryTabProps> = () => {
    const { setcurrentTab } = useContext(MyContext)
    return (

        <Box sx={{ width: "100%" }}>
            <Box sx={{ height: "32px", minHeight: "32px", color: "#2563EB" }}>
                <Tabs
                    sx={{ height: "32px", minHeight: "32px", color: "#2563EB" }}
                    // value={value}
                    // onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab
                        onClick={() => setcurrentTab("Params")}
                        sx={{
                            height: "32px",
                            minHeight: "32px",
                            textTransform: "capitalize",
                            color: "#000000",
                        }}
                        label="Params"
                    // {...a11yProps(0)}
                    />
                    <Tab
                        onClick={() => setcurrentTab("Headers")}

                        sx={{
                            height: "32px",
                            minHeight: "32px",
                            textTransform: "capitalize",
                            color: "#000000",
                        }}
                        label="Headers"
                    // {...a11yProps(1)}
                    />
                    <Tab
                        onClick={() => setcurrentTab("Body")}
                        sx={{
                            height: "32px",
                            minHeight: "32px",
                            textTransform: "capitalize",
                            color: "#000000",
                        }}
                        label="Body"
                    // {...a11yProps(2)}
                    />
                </Tabs>
            </Box>
        </Box>


    );
}

export default QueryTab;
