import axios from "axios";
import { getHeadersAndParams } from "../Utils/CommonUtils";

const GetData = async (data, paramsData, headersData, jsonText) => {
  console.log(data, "ujokli");
  const apiType = data.method.toLowerCase();
  const apiURL = data.url;
  const apiHeaders = getHeadersAndParams(headersData);
  const apiParams = getHeadersAndParams(paramsData);
  if (typeof jsonText == "string") {
    try {
      console.log(jsonText);
      jsonText = JSON.parse(jsonText);
    } catch (error) {
      console.log("JsonParse", error);
    }
  }

  let option = {
    method: apiType,
    url: apiURL,
    data: jsonText,
    params: apiParams,
    headers: apiHeaders,
  };

  return await axios(option);
};

export default GetData;
