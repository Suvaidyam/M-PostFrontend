import React, { useContext } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import QueryForm from "./QueryForm";
import BodyForm from "./BodyForm";
import { DataContext } from "../Context/DataProvider";
import { padding } from "@mui/system";

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
          <Typography>{children}</Typography>
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const { paramsData, setparamsData, headersData, setheadersData } =
    useContext(DataContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="  Params" {...a11yProps(0)} />
          <Tab label="Headers" {...a11yProps(1)} />
          <Tab label="Body" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <QueryForm
          name={"Queary Params"}
          data={paramsData}
          setdata={setparamsData}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <QueryForm
          name={"Headers"}
          data={headersData}
          setdata={setheadersData}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BodyForm />
      </TabPanel>
    </Box>
  );
}
