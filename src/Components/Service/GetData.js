import axios from "axios";
import { getHeadersAndParams } from "../Utils/CommonUtils";

const GetData = async (formData, paramsData, headersData, jsonText) => {
  const apiType = formData.type.toLowerCase();
  const apiURL = formData.url;
  const apiHeaders = getHeadersAndParams(headersData);
  const apiParams = getHeadersAndParams(paramsData);
  try {
    return await axios({
      method: apiType,
      url: apiURL,
      body: jsonText,
      params: apiParams,
      headers: apiHeaders,
    });
  } catch (error) {
    console.log("Error while Calling  getData API", error);
    return error;
  }
};

export default GetData;
