import axios from "axios";
export default async (option) => {
    let token = sessionStorage.getItem("token");
    option.headers = !option.headers ? { token } : Object.assign(option.headers, { token })
    option.url = `${process.env.REACT_APP_BASEURL}/${option.url}`
    return axios(option);
};
