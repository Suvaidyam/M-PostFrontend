import { useContext, useState, type FC } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Select, Option } from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { MyContext } from '../../../../Context/Context';

interface SetCodeProps { }
interface IMethodArray {
    id: number
    method: string;
}

const SetCode: FC<SetCodeProps> = () => {
    const [method, setMethod] = useState('Blank');
    const { setRightBar } = useContext(MyContext)
    const methodArray: IMethodArray[] = [
        { id: 1, method: 'NodeJs-Axios' },
        { id: 2, method: 'NodeJs-Native' },
        { id: 3, method: 'NodeJs-Request' },
        { id: 4, method: 'NodeJs-Unirest' },
        { id: 5, method: 'JavaScript-Fetch' },
    ];

    // const methodArrays = [
    //     {
    //         key: 'JavaScript-Fetch',
    //         code: `const axios = require('axios');
    //             let config = {
    //             method: 'get',
    //             maxBodyLength: Infinity,
    //             url: 'http://localhost:4000/collection',
    //             headers: {
    //                 token goes Hare
    //             }};
    //             axios.request(config)
    //             .then((response) => {
    //             console.log(JSON.stringify(response.data));
    //             })
    //             .catch((error) => {
    //             console.log(error);
    //             });
    //     `
    //     },
    //     {
    //         key: 'JavaScript-Fetch',
    //         code: `var myHeaders = new Headers();
    //     myHeaders.append("token", "");
    //     var requestOptions = {
    //         method: 'GET',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };
    //     fetch("http://localhost:4000/collection", requestOptions)
    //         .then(response => response.text())
    //         .then(result => console.log(result))
    //         .catch(error => console.log('error', error));`
    //     },
    //     {
    //         key: 'NodeJs-Native',
    //         code: `var myHeaders = new Headers();
    //     myHeaders.append("token", "");
    //     var requestOptions = {
    //         method: 'GET',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };
    //     fetch("http://localhost:4000/collection", requestOptions)
    //         .then(response => response.text())
    //         .then(result => console.log(result))
    //         .catch(error => console.log('error', error));`
    //     },
    //     {
    //         key: 'NodeJs-Request',
    //         code: `
    //                 var myHeaders = new Headers();
    //     myHeaders.append("token", "");
    //     var requestOptions = {
    //         method: 'GET',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };
    //     fetch("http://localhost:4000/collection", requestOptions)
    //         .then(response => response.text())
    //         .then(result => console.log(result))
    //         .catch(error => console.log('error', error));`
    //     },
    //     {
    //         key: 'NodeJs-Unirest',
    //         code: `
    //                 var unirest = require('unirest');
    //     var req = unirest('GET', 'http://localhost:4000/collection')
    //         .headers({
    //         'token': ''
    //         })
    //         .end(function (res) {
    //         if (res.error) throw new Error(res.error);
    //         console.log(res.raw_body);
    //         });
    //                 `

    //     },
    // ]
    const JavaScriptFetch = `
    var myHeaders = new Headers();
    myHeaders.append("token", "");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch("http://localhost:4000/collection", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        `
    const NodeJsAxios = `
            const axios = require('axios');
            let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/collection',
            headers: {
                token goes Hare
            }};
            axios.request(config)
            .then((response) => {
            console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
            console.log(error);
            });
            `
    const NodeJsNative = `
    var http = require('follow-redirects').http;
    var fs = require('fs');
    var options = {
    'method': 'GET',
        'hostname': 'localhost',
        'port': 4000,
        'path': '/collection',
        'headers': {
        'token': ''
        },
        'maxRedirects': 20
        };
        var req = http.request(options, function (res) {
        var chunks = [];
        res.on("data", function (chunk) {
        chunks.push(chunk);
        });
        res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        });
        res.on("error", function (error) {
        console.error(error);
        });
        });
    req.end();
        `
    const NodeJsRequest = `
    var request = require('request');
    var options = {
        'method': 'GET',
        'url': 'http://localhost:4000/collection',
        'headers': {
        'token': ''
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
        `
    const NodeJsUnirest = `
    var unirest = require('unirest');
    var req = unirest('GET', 'http://localhost:4000/collection')
        .headers({
        'token': ''
        })
        .end(function (res) {
        if (res.error) throw new Error(res.error);
        console.log(res.raw_body);
        });
        `
    // Copy Function 
    // const copyJson = () => {
    //     setCopyLoader(true)
    //     { method === 'JavaScript-Fetch' && setCopyMethod(JavaScriptFetch) }
    //     { method === 'NodeJs-Axios' && setCopyMethod(NodeJsAxios) }
    //     { method === 'NodeJs-Native' && setCopyMethod(NodeJsNative) }
    //     { method === 'NodeJs-Request' && setCopyMethod(NodeJsRequest) }
    //     { method === 'NodeJsUnirest' && setCopyMethod(NodeJsUnirest) }
    //     navigator.clipboard.writeText(copyMethod).then(
    //         () => {
    //             setTimeout(function () {
    //                 toast.success("Text Copied");
    //                 setCopyLoader(false)
    //             }, 2000);
    //         },
    //         (err) => {
    //             console.error(err);
    //         }
    //     );
    // };
    return (
        <>
            <div className="w-full border-l h-full">
                <div className='w-full h-16 border-b flex  items-center justify-between'>
                    <div className="w-40 ml-4">
                    <Select label="Select Method" placeholder="Select Method"> {/* Add placeholder prop */}
        {methodArray.map((e: IMethodArray) => (
          <Option key={e.id} onClick={() => setMethod(e.method)}>
            {e.method}
          </Option>
        ))}
      </Select>
                    </div>
                    {/* <div className='w-full  h-10 flex border-b justify-between items-center px-2.5 text-xl font-semibold'>
                        <p>Trash</p>
                        <IoClose onClick={() => setRightBar('close')} className='hover:bg-blue-gray-200 duration-500 hover:text-white w-7 h-7 py-1 cursor-pointer rounded-full' />
                    </div> */}
                    <div className="h-[90%]  w-8 flex justify-center items-center text-lg hover:bg-slate-100 duration-300 rounded-full cursor-pointer mr-2">
                        <IoClose onClick={() => setRightBar('close')} className='hover:bg-blue-gray-200 duration-500 hover:text-white w-7 h-7 py-1 cursor-pointer rounded-full' />
                    </div>
                </div>
                <div className="w-full h-full overflow-hidden text-start  bg-white  rounded-md  py-2">
                    <Scrollbars className='w-full h-full overflow-hidden'>
                        <div className='w-full h-full flex justify-center'>
                            {
                                method === 'Blank' &&
                                <div className='w-full h-full flex justify-center items-center'>
                                    <p>Please Select Method</p>
                                </div>
                            }
                            {
                                method === 'JavaScript-Fetch' &&
                                <div className='flex justify-center text-sm'>
                                    <pre>{JavaScriptFetch}</pre>
                                </div>
                            }
                            {
                                method === 'NodeJs-Axios' &&
                                <div className='flex justify-center text-sm'>
                                    <pre>{NodeJsAxios}</pre>
                                </div>
                            }
                            {
                                method === 'NodeJs-Native' &&
                                <div className='flex justify-center text-sm'>
                                    <pre>{NodeJsNative}</pre>
                                </div>
                            }
                            {
                                method === 'NodeJs-Request' &&
                                <div className='flex justify-center text-sm'>
                                    <pre>{NodeJsRequest}</pre>
                                </div>
                            }
                            {
                                method === 'NodeJs-Unirest' &&
                                <div className='flex justify-center text-sm'>
                                    <pre>{NodeJsUnirest}</pre>
                                </div>
                            }
                        </div>
                    </Scrollbars>
                </div>
            </div>
        </>
    );
}

export default SetCode;