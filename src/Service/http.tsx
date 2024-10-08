import axios from "axios";
const getSizeInBytes = (obj: any) => {
  let str = null;
  if (typeof obj === 'string') {
    // If obj is a string, then use it
    str = obj;
  } else {
    // Else, make obj into a string
    str = JSON.stringify(obj);
  }
  // Get the length of the Uint8Array
  const bytes = new TextEncoder().encode(str).length;
  return bytes;
};
// Add a request interceptor
axios.interceptors.request.use(function (config: any) {
  // Do something before request is sent
  config['startTime'] = new Date();
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
// Add a response interceptor
axios.interceptors.response.use(function (response: any) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log('response', response);
  response['resTime'] = (new Date() as any - response?.config?.startTime);
  response['resSize'] = getSizeInBytes(response?.data);
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  error.response['resTime'] = (new Date() as any - error.config.startTime);
  // console.log("error.config:", error);
  error.response['resSize'] = getSizeInBytes(error.response.data);
  return Promise.reject(error);
});
const httpService = (option: any) => {
  let token = sessionStorage.getItem("token");
  // eslint-disable-next-line
  option.headers = !option.headers ? { token } : Object.assign(option.headers);
  // option.url = `http://localhost:4000/${option.url}`
  return axios(option);
};

export default httpService;


