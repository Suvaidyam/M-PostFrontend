import axios from 'axios';

export const  login = (data:{}):void=>{
    console.log("login")
    console.log()

    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data)
    .then((response:any) => {
     console.log(response)
    })
    .catch((error) => {
      console.log("Error occurred:", error);
    });
}


