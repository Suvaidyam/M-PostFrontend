import React from "react";
import CollectionBody from "./CollectionBody/CollectionBody";
import EnviromentBody from "./EnvironmentBody/EnvironmentBody";
import History from "./HistoryBody/HistoryBody";
import ApiBody from "./ApiBody/ApiBody";

const LeftBody = ({ currentNav }) => {
  return (
    <>
      <div className="w-full h-full ">
        {currentNav === "Collection" && <CollectionBody />}
        {currentNav === "APIs" && <ApiBody />}
        {currentNav === "Enviroment" && <EnviromentBody />}
        {currentNav === "History" && <History />}
      </div>
    </>
  );
};

export default LeftBody;
