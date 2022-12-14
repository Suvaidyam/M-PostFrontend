import axios from "axios";
import { getHeadersAndParams } from "../Utils/CommonUtils";

const GetData = async (formData, paramsData, headersData, jsonText) => {
  console.log(formData)
  const apiType = formData.type.type.toLowerCase();
  const apiURL = formData.url.url;
  const apiHeaders = getHeadersAndParams(headersData);
  const apiParams = getHeadersAndParams(paramsData);
  if (typeof jsonText == 'string') {
    try {
      console.log(jsonText);
      jsonText = JSON.parse(jsonText)
    } catch (error) {
      console.log('JsonParse', error);
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
