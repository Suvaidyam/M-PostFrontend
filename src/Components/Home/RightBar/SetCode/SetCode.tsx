import type { FC } from 'react';
// import { Fragment, useRef, useState } from 'react';
// import { Dialog, Transition } from '@headlessui/react';
// import Scrollbars from 'react-custom-scrollbars';
// import { Select, Option } from "@material-tailwind/react";
// import { AiOutlineClose } from 'react-icons/ai';
// import { GoCopy } from 'react-icons/go';
// import { toast } from 'react-toastify';

interface SetCodeProps {
    // open: any,
    // setOpen: any
}
// interface IMethodArray {
//     id: number
//     method: string;
// }
const SetCode: FC<SetCodeProps> = () => {
    //     const cancelButtonRef = useRef(null);
    //     const [method, setMethod] = useState('Blank');
    //     const [copyLoader, setCopyLoader] = useState<boolean>(false)
    //     const [copyMethod, setCopyMethod] = useState('');
    //     const methodArray: IMethodArray[] = [
    //         { id: 1, method: 'NodeJs-Axios' },
    //         { id: 2, method: 'NodeJs-Native' },
    //         { id: 3, method: 'NodeJs-Request' },
    //         { id: 4, method: 'NodeJs-Unirest' },
    //         { id: 5, method: 'JavaScript-Fetch' },
    //     ];
    //     //     const methodArrays = [
    //     //         {
    //     //             key: 'JavaScript-Fetch',
    //     //             code: `const axios = require('axios');
    //     //         let config = {
    //     //         method: 'get',
    //     //         maxBodyLength: Infinity,
    //     //         url: 'http://localhost:4000/collection',
    //     //         headers: {
    //     //             token goes Hare
    //     //         }};
    //     //         axios.request(config)
    //     //         .then((response) => {
    //     //         console.log(JSON.stringify(response.data));
    //     //         })
    //     //         .catch((error) => {
    //     //         console.log(error);
    //     //         });
    //     // `
    //     //         },
    //     //         {
    //     //             key: 'JavaScript-Fetch',
    //     //             code: `var myHeaders = new Headers();
    //     // myHeaders.append("token", "");
    //     // var requestOptions = {
    //     //     method: 'GET',
    //     //     headers: myHeaders,
    //     //     redirect: 'follow'
    //     // };
    //     // fetch("http://localhost:4000/collection", requestOptions)
    //     //     .then(response => response.text())
    //     //     .then(result => console.log(result))
    //     //     .catch(error => console.log('error', error));`
    //     //         },
    //     //         {
    //     //             key: 'NodeJs-Native',
    //     //             code: `var myHeaders = new Headers();
    //     // myHeaders.append("token", "");
    //     // var requestOptions = {
    //     //     method: 'GET',
    //     //     headers: myHeaders,
    //     //     redirect: 'follow'
    //     // };
    //     // fetch("http://localhost:4000/collection", requestOptions)
    //     //     .then(response => response.text())
    //     //     .then(result => console.log(result))
    //     //     .catch(error => console.log('error', error));`
    //     //         },
    //     //         {
    //     //             key: 'NodeJs-Request',
    //     //             code: `
    //     //             var myHeaders = new Headers();
    //     // myHeaders.append("token", "");

    //     // var requestOptions = {
    //     //     method: 'GET',
    //     //     headers: myHeaders,
    //     //     redirect: 'follow'
    //     // };

    //     // fetch("http://localhost:4000/collection", requestOptions)
    //     //     .then(response => response.text())
    //     //     .then(result => console.log(result))
    //     //     .catch(error => console.log('error', error));`
    //     //         },
    //     //         {
    //     //             key: 'NodeJs-Unirest',
    //     //             code: `
    //     //             var unirest = require('unirest');
    //     // var req = unirest('GET', 'http://localhost:4000/collection')
    //     //     .headers({
    //     //     'token': ''
    //     //     })
    //     //     .end(function (res) {
    //     //     if (res.error) throw new Error(res.error);
    //     //     console.log(res.raw_body);
    //     //     });
    //     //             `

    //     //         },
    //     //     ]
    //     const JavaScriptFetch = `
    // var myHeaders = new Headers();
    // myHeaders.append("token", "");
    // var requestOptions = {
    //     method: 'GET',
    //     headers: myHeaders,
    //     redirect: 'follow'
    // };
    // fetch("http://localhost:4000/collection", requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));
    //     `
    //     const NodeJsAxios = `
    //         const axios = require('axios');
    //         let config = {
    //         method: 'get',
    //         maxBodyLength: Infinity,
    //         url: 'http://localhost:4000/collection',
    //         headers: {
    //             token goes Hare
    //         }};
    //         axios.request(config)
    //         .then((response) => {
    //         console.log(JSON.stringify(response.data));
    //         })
    //         .catch((error) => {
    //         console.log(error);
    //         });
    //         `
    //     const NodeJsNative = `
    // var http = require('follow-redirects').http;
    // var fs = require('fs');
    // var options = {
    // 'method': 'GET',
    //     'hostname': 'localhost',
    //     'port': 4000,
    //     'path': '/collection',
    //     'headers': {
    //     'token': ''
    //     },
    //     'maxRedirects': 20
    //     };
    //     var req = http.request(options, function (res) {
    //     var chunks = [];
    //     res.on("data", function (chunk) {
    //     chunks.push(chunk);
    //     });
    //     res.on("end", function (chunk) {
    //     var body = Buffer.concat(chunks);
    //     console.log(body.toString());
    //     });
    //     res.on("error", function (error) {
    //     console.error(error);
    //     });
    //     });
    // req.end();
    //     `
    //     const NodeJsRequest = `
    // var request = require('request');
    // var options = {
    //     'method': 'GET',
    //     'url': 'http://localhost:4000/collection',
    //     'headers': {
    //     'token': ''
    //     }
    // };
    // request(options, function (error, response) {
    //     if (error) throw new Error(error);
    //     console.log(response.body);
    // });
    //     `
    //     const NodeJsUnirest = `
    // var unirest = require('unirest');
    // var req = unirest('GET', 'http://localhost:4000/collection')
    //     .headers({
    //     'token': ''
    //     })
    //     .end(function (res) {
    //     if (res.error) throw new Error(res.error);
    //     console.log(res.raw_body);
    //     });
    //     `
    //     // Copy Function 
    //     const copyJson = () => {
    //         setCopyLoader(true)
    //         { method === 'JavaScript-Fetch' && setCopyMethod(JavaScriptFetch) }
    //         { method === 'NodeJs-Axios' && setCopyMethod(NodeJsAxios) }
    //         { method === 'NodeJs-Native' && setCopyMethod(NodeJsNative) }
    //         { method === 'NodeJs-Request' && setCopyMethod(NodeJsRequest) }
    //         { method === 'NodeJsUnirest' && setCopyMethod(NodeJsUnirest) }
    //         navigator.clipboard.writeText(copyMethod).then(
    //             () => {
    //                 setTimeout(function () {
    //                     toast.success("Text Copied");
    //                     setCopyLoader(false)
    //                 }, 2000);
    //             },
    //             (err) => {
    //                 console.error(err);
    //             }
    //         );
    //     };
    return (
        <>
            <div className="w-96 border-l h-full">
                <p className='text-lg my-1 border-b ml-2'>Methods</p>
            </div>
            {/* <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="">
                                    <div className="w-[800px] h-[400px] overflow-hidden text-start border bg-white shadow-inner rounded-md  py-2">
                                        <Scrollbars className='w-full h-full overflow-hidden'>
                                            <div className="w-full bg-white flex items-center fixed justify-between pt-1">
                                                <div className="w-72 ml-4">
                                                    <Select label="Select Method">
                                                        {methodArray.map((e: IMethodArray) => (
                                                            <Option key={e.id} onClick={() => setMethod(e.method)}>{e.method}</Option>
                                                        ))}
                                                    </Select>
                                                </div>
                                                <div className='flex items-center'>
                                                    {copyLoader === false ? <GoCopy onClick={copyJson} className='text-xl mr-4 cursor-pointer' /> : <p className='text-3xl text-green-600 mr-4 cursor-pointer'>...</p>}
                                                    <AiOutlineClose onClick={() => setOpen(false)} className='text-xl mr-4 cursor-pointer' />
                                                </div>
                                            </div>
                                            <div className='flex  items-center mt-10 justify-center'>
                                                {
                                                    method === 'Blank' &&
                                                    <div className='flex justify-center mt-36 items-center'>
                                                        <p>Please Select Method</p>
                                                    </div>
                                                }
                                                {
                                                    method === 'JavaScript-Fetch' &&
                                                    <div className='flex justify-center'>
                                                        <pre>{JavaScriptFetch}</pre>
                                                    </div>
                                                }
                                                {
                                                    method === 'NodeJs-Axios' &&
                                                    <div className='flex justify-center'>
                                                        <pre>{NodeJsAxios}</pre>
                                                    </div>
                                                }
                                                {
                                                    method === 'NodeJs-Native' &&
                                                    <div className='flex justify-center'>
                                                        <pre>{NodeJsNative}</pre>
                                                    </div>
                                                }
                                                {
                                                    method === 'NodeJs-Request' &&
                                                    <div className='flex justify-center'>
                                                        <pre>{NodeJsRequest}</pre>
                                                    </div>
                                                }
                                                {
                                                    method === 'NodeJs-Unirest' &&
                                                    <div className='flex justify-center'>
                                                        <pre>{NodeJsUnirest}</pre>
                                                    </div>
                                                }
                                            </div>
                                        </Scrollbars>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root > */}
        </>
    );
}

export default SetCode;
