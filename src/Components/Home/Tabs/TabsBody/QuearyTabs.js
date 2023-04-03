import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import QueryForm from "./QueryForm";
import CenterTabs from "./CenterTabs";
import { DataContext } from "../../../Context/DataProvider";
import "./Tabs.css";
import { Resizable } from "react-resizable-element";

function TabPanel(props) {
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function QuearyTabs() {
  let activeQueryTab = sessionStorage.getItem("queryTab")
  const [value, setValue] = useState(activeQueryTab? parseInt(activeQueryTab): 0);
  const { paramsData, setParamsData, headersData, setHeadersData, tabsList ,tabData, currentActive  } =
    useContext(DataContext);
    // console.log(paramsData);
    const locTabList = JSON.parse(localStorage.getItem('tabsList'))
    const activeData = locTabList.filter(e => e._id === currentActive)
    const paramsBackendData = tabData?.details?.query || activeData[0]?.details?.query;
    const headersBackendData = tabData?.details?.headers || activeData[0]?.details?.headers;

    // let params = Object.entries(paramsBackendData).map(([key,value])=>({key,value}))
    let params = ''
    // console.log("params(query)",params);
    // console.log("headers",headersBackendData);

  sessionStorage.setItem("queryTab", value);
  const handleChange = (event, newValue) => {
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
            <QueryForm data={paramsData} setData={setParamsData} 
            // {...{params}} 
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <QueryForm data={headersData} setData={setHeadersData} />
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
