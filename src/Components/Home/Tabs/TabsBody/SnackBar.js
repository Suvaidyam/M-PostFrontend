import React, { useContext } from "react";
import { Snackbar } from "@mui/material";
import { DataContext } from "../../../Context/DataProvider";

const SnackBar = () => {
  const { Msg,error,setError } = useContext(DataContext);

  const handleClose = () => {
    setError(false);
  };

  return (
    <>
      <Snackbar
        open={error}
        autoHideDuration={4000}
        onClose={handleClose}
        message={Msg}
      />
    </>
  );
};

export default SnackBar;
