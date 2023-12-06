import { MyContext } from '../../../../Context/Context';
import { useContext, useRef, useState } from "react";
import Scrollbars from 'react-custom-scrollbars';
import { AiOutlineSave } from "react-icons/ai";
import http from "../../../../Service/http";
import { BsArrowRight } from 'react-icons/bs';
import { GoCopy } from 'react-icons/go';
import { Formik, FieldArray, ErrorMessage, Field, ArrayHelpers, Form } from 'formik';
import * as Yup from 'yup';
import { MdDelete } from 'react-icons/md';
import { GrAdd } from 'react-icons/gr';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import JSONView from 'react-json-view';


type Props = {}
interface Details {
    method?: string | undefined;
}
interface Colors {
    [key: string]: string;
    GET: string;
    POST: string;
    PUT: string;
    DELETE: string;
    NA: string;
}
function EnvironmentTab({ }: Props) {
    const { collection, setStatus, setMsg, setError, tabData, setTabData, currentActive, tabsList, setTabsList, setCurrentActive, loader, setLoader } = useContext(MyContext);
    const [effect, setEffect] = useState(false);
    const buttonRef: any = useRef();
    const getDetails = (details: Details) => {
        const method: string = details?.method ? details.method.toUpperCase() : "NA";
        const colors: Colors = {
            GET: "green",
            POST: "blue",
            PUT: "yellow",
            DELETE: "red",
            NA: "grey",
        };
        return { method, color: colors[method.toUpperCase()] };
    };
    const handleRequest = (e: { _id: any; }) => {
        if (tabsList.findIndex((f: { _id: any; }) => f._id === e._id) < 0) {
            setTabsList([...tabsList, e]);
            setCurrentActive(e._id);
            setTabData(e);
        }
    };
    const postData = () => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    };
    //  Add Row
    const validationSchema: any = Yup.object().shape({
        items: Yup.array().of(
            Yup.object().shape({
                variable: Yup.string(),
                initial: Yup.string(),
                current_value: Yup.string(),
            })
        ),
    });
    const initialValues: any = {
        items: tabData?.details?.length > 0 ? tabData?.details?.map((item: any) => {
            return {
                variable: item.variable ?? '',
                value: item.value ?? '',
                current_value: item.current_value ?? ''
            }
        })
            :
            [{
                variable: '',
                value: '',
                current_value: ''
            }]
    };
    const handleSubmit = (values: { items: any }): any => {
        http({
            method: "put",
            url: `${process.env.REACT_APP_BASEURL}/environment/${currentActive}`,
            data: {
                details: values.items
            }
        })
            .then((res) => {
                setMsg('Save Successfully')
                setStatus(res.status)
                setError(true)
                setEffect(true)
                toast.success(res.data.message)
                setLoader(!loader)
                setTimeout(() => {
                    setEffect(false)
                }, 1000)
            })
            .catch((err) => {
                setMsg(err.response.data.message)
                setStatus(err.response.status)
                setError(true)
            });
    };
    // const deleteData = (indexToDelete: any) => {
    //     console.log(indexToDelete)
    // };
    // Copy Function 
    const copyJson = (e: any) => {
        const textToCopy = JSON.stringify(e);
        navigator.clipboard.writeText(textToCopy).then(
            () => {
                toast.success("Json Copied");
            },
            (err) => {
                console.error(err);
            }
        );
    };
    return (
        <>
            <Scrollbars className="w-full h-[80vh] min-h-[80vh] scrollbar-hide overflow-y-scroll bg-white ">
                {tabData.type === 'folder' ?
                    (
                        <div className="flex justify-center">
                            <div className='w-1/2 h-'>
                                <p className='py-3 font-semibold'>Documentation</p>
                                <p className="text-2xl font-semibold">{tabData?.name}</p>
                                {collection?.map((view: any) => (
                                    <div key={view._id}>
                                        {tabData._id === view.parent ? (
                                            <div>
                                                <div className="w-full h-14 mb-3 rounded hover:bg-gray-100 flex justify-between items-center mt-5 pl-4">
                                                    <div className='flex gap-5 '>
                                                        <p className={`text-xl font-semibold text-${getDetails(view?.details).color}-600 `} >
                                                            {getDetails(view?.details).method}
                                                        </p>
                                                        <p className='text-xl font-semibold'>{view.name}</p>
                                                    </div>
                                                    <div onClick={() => handleRequest(view)} className="flex gap-1 items-center pr-2 hover:text-blue-700 hover:underline cursor-pointer">Open Request <BsArrowRight /></div>
                                                </div>
                                                {/* ============ Url ============ */}
                                                <div className='w-full h-10 px-2 flex items-center group justify-between rounded text-gray-800 bg-gray-100'>
                                                    {view.details.url}
                                                    <div className='flex items-center'>
                                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
                                                            <GoCopy onClick={() => copyJson(view?.details?.url)} className='cursor-pointer hidden group-hover:block' />
                                                        </motion.div>
                                                    </div>
                                                </div>
                                                <div>
                                                    {/* ========== Body =========== */}
                                                    <div className='text-2xl mt-2 font-semibold'>Body</div>
                                                    <div className="w-full mt-2 py-1  px-2 border">
                                                        <div className='flex justify-between py-1'>
                                                            <p className='py-2 px-5 font-semibold bg-gray-100 text-xs'>JSON</p>
                                                            <div>
                                                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
                                                                    <GoCopy onClick={() => copyJson(view?.details?.body)} className='text-xl cursor-pointer' />
                                                                </motion.div>
                                                            </div>
                                                        </div>
                                                        <div className='w-full h-auto'>
                                                            {view?.details?.body === null ?
                                                                <pre>
                                                                    &#123;
                                                                    &#125;
                                                                </pre>
                                                                :
                                                                <JSONView src={view?.details?.body} theme="monokai" name={null} />
                                                            }
                                                        </div>
                                                    </div>
                                                    {/* ========== Response =========== */}
                                                    <p className='text-2xl mt-2 font-semibold'>Response</p>
                                                    <div className="w-full mt-2 py-1  px-2 border">
                                                        <div className="w-full flex justify-end mb-1">
                                                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
                                                                <GoCopy onClick={() => copyJson(view?.details?.response)} className='text-xl cursor-pointer' />
                                                            </motion.div>
                                                        </div>
                                                        <div className='w-full break-all truncate'>
                                                            {view?.details?.response === null ?
                                                                <pre>
                                                                    &#123;
                                                                    &#125;
                                                                </pre>
                                                                :
                                                                <JSONView src={view?.details?.response} theme="monokai" name={null} />}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                    : (
                        // ================ Design 2 ==============
                        <div className='w-full h-full'>
                            <div className=" h-14 border-b mb-4 px-5 flex items-center justify-between">
                                <div>
                                    <p className="font-semibold">{tabData?.name}</p>
                                </div>
                                <div className=" flex items-center justify-center">
                                    <div className="">
                                        <button type='button' className="flex justify-start items-center text-lg rounded px-4 py-2
                                        hover:bg-gray-200"
                                            onClick={postData}
                                        >
                                            <AiOutlineSave />
                                            <span className="ml-0.5 text-sm font-semibold">{effect === true ? <>...</> : <>save</>}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                {({ values }) => (
                                    <Form>
                                        <FieldArray name="items">
                                            {(arrayHelpers: ArrayHelpers) => (
                                                <table>
                                                    <thead>
                                                        <tr className='font-semibold'>
                                                            <th>ADD</th>
                                                            <th>Variable</th>
                                                            <th>Initial value</th>
                                                            <th>Current value</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className=''>
                                                        <>
                                                            {values.items.map((item: any, index: number) => (
                                                                <tr key={index} className='w-full border-y mx-3 group'>
                                                                    <td className='border-r pl-3 h-9 text-[15px]'>
                                                                        {index !== 0 ? (
                                                                            <GrAdd className='cursor-pointer hidden group-hover:block' onClick={() => arrayHelpers.push({ name: '', quantity: 0 })} />
                                                                        )
                                                                            : (
                                                                                <GrAdd className='cursor-pointer' onClick={() => arrayHelpers.push({ name: '', quantity: 0 })} />
                                                                            )}
                                                                    </td>
                                                                    <td className='w-[32%]'>
                                                                        <Field
                                                                            className="w-full border-r outline-none pl-2"
                                                                            type="text"
                                                                            placeholder="Add new variable"
                                                                            name={`items[${index}].variable`} />
                                                                        <ErrorMessage name={`items[${index}].variable`} component="div" />
                                                                    </td>
                                                                    <td className='w-[32%]'>
                                                                        <Field
                                                                            className="w-full border-r outline-none pl-2"
                                                                            type="text"
                                                                            name={`items[${index}].value`} />
                                                                        <ErrorMessage name={`items[${index}].value`} component="div" />
                                                                    </td>
                                                                    <td className='w-[32%]'>
                                                                        <Field
                                                                            className="w-full border-r outline-none pl-2"
                                                                            type="text"
                                                                            name={`items[${index}].current_value`} />
                                                                        <ErrorMessage name={`items[${index}].current_value`} component="div" />
                                                                    </td>
                                                                    <td className=''>
                                                                        {tabData?.details !== 0 ? ( // Disable for the first row
                                                                            <button className='ml-4 text-xl' type="button"
                                                                            // onClick={() => deleteData(index)}
                                                                            // onClick={() => arrayHelpers.remove(index)}
                                                                            >
                                                                                <MdDelete className='hidden group-hover:block' />
                                                                            </button>
                                                                        ) : (
                                                                            <button className='ml-4 text-xl' type="button" disabled>
                                                                                <MdDelete />
                                                                            </button>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </>
                                                    </tbody>
                                                </table>
                                            )}
                                        </FieldArray>
                                        <button type='submit' className='hidden' ref={buttonRef}>submit</button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )}
            </Scrollbars>
        </>
    )
}

export default EnvironmentTab