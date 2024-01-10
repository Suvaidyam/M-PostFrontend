import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../../../Context/Context';
type Props = {
    params: any,
    addRows: any,
    rowId: any,
    data: any,
    setData: any,
    variable: any,
    value: any,
    description: any,
    type: any,
    variableN: any,
    valueN: any,
    descriptionN: any,
    responseHeaderData: any
    responseParmsrData: any
    // defaultValue:any
}

export default function AddRow({
    params,
    addRows,
    rowId,
    data,
    setData,
    variable,
    value,
    description,
    type,
    variableN,
    valueN,
    descriptionN,
    responseHeaderData,
    responseParmsrData
    // defaultValue
}: Props) {
    const [checkCheckbox, setCheckCheckbox] = useState<boolean>(false);
    const [checkRadio, setCheckRadio] = useState<boolean>(false);
    const [types, setTypes] = useState<string>('text')
    const { bodyTab, darkToggle } = useContext(MyContext)
    // const [responseHeaderData, setResponseheaderData] = useState<any | null>(null);
    // const queryKey = inputData?.split('?')?.[1]?.split('=')?.[0]
    // const queryValue = inputData?.split('?')?.[1]?.split('=')?.[1]
    // console.log(queryKey)
    const handleChange = (e: any) => {
        let result = data.filter((entry: { id: number; }) => entry.id === Number(e.target.name))[0];
        // console.log(result)
        if (!checkCheckbox) {
            setCheckCheckbox(true);
            result = { ...result, id: rowId, check: true }
        } else {
            setCheckCheckbox(false);
            result = { ...result, id: rowId, check: false }
        }

        let index = data.findIndex((value: any) => value.id === Number(e.target.name));
        if (index === -1) {
            setData((oldArr: any) => [...oldArr, result]);
        } else {
            const newArray = Object.assign([...data], {
                [index]: result
            });
            setData(newArray)
        }

    }



    const onTextChange = (e: any) => {
        let result = data.filter((entry: { id: any; }) => entry.id === rowId)[0];
        let { type, name, value, files } = e.target;
        // console.log(e.target.type)
        result = { ...result, id: rowId, [name]: value, type, files: files }
        // console.log("result",result);

        if (!checkCheckbox) {
            setCheckCheckbox(true);
            setCheckRadio(true)
            addRows((oldArr: any) => [...oldArr, rowId]);
            result = { ...result, id: rowId, check: true }
        } else {

        }
        let index = data.findIndex((value: { id: number; }) => value.id === rowId);
        if (index === -1) {
            setData((oldArr: any) => [...oldArr, result]);
        } else {
            const newArray = Object.assign([...data], {
                [index]: result
            });
            setData(newArray)
        }
    }

    const handleTypeChange = (e: any) => {
        setTypes(e.target.value)
    }

    useEffect(() => {
        if (data.length >= 1) {
            setCheckRadio(true)
        } else {
            setCheckRadio(false)
        }
        // eslint-disable-next-line
    }, [checkRadio])
    // useEffect(() => {
    //     // if (inputData && inputData?.split('?').length > 1) {
    //     // if (data[rowId].key && data[rowId].value) {
    //     // }
    //     data[0] = { key: queryKey, value: queryValue }
    //     setData([...data]);
    //     console.log(data[0] = { key: queryKey, value: queryValue }
    //     )

    // }, [inputData])




    return (
        <>
            {
                (responseHeaderData && Object.entries(responseHeaderData)?.map(([key, values]: [any, any]) => (
                    <tr className=" border  w-full">
                        <td className="w-4  px-4">
                            <div className="flex items-center ">
                                {
                                    checkRadio === true ? <input
                                        // checked={checkCheckbox}
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  "
                                        name={rowId}
                                        onChange={(e) => handleChange(e)}
                                        defaultChecked={data[rowId]?.check}
                                    /> : <></>
                                }

                            </div>
                        </td>
                        <th
                            scope="row"
                            className="w-[33%] p-1 border font-normal text-gray-900 whitespace-nowrap dark:text-white group relative">
                            <div>
                                <input
                                    type={type}
                                    className={`w-full px-6 border py-0.5 focus:outline-none ${darkToggle === true ? 'bg-blue-gray-900 text-white' : 'bg-white'}`}
                                    onChange={(e) => onTextChange(e)}
                                    name={variableN}
                                    placeholder={variable}
                                    // value={data[rowId]?.key}
                                    value={key}

                                />
                            </div>

                            {
                                bodyTab === 'Body' ? <div className='hidden group-hover:block absolute right-0 top-2 '>
                                    <select name="" id="" onChange={(e) => handleTypeChange(e)} className='bg-transparent cursor-pointer'>
                                        <option value={'text'}>Text</option>
                                        <option value={'file'}>File</option>
                                    </select>
                                </div> : null
                            }
                        </th>
                        <th className="w-[33%] p-1 font-normal text-gray-900 whitespace-nowrap dark:text-white">
                            <input
                                type={types}
                                className={`w-full px-6 border py-0.5 focus:outline-none ${darkToggle === true ? 'bg-blue-gray-900 text-white' : 'bg-white'}`}
                                onChange={(e) => onTextChange(e)}
                                name={valueN}
                                placeholder={value}
                                // defaultValue={data[rowId]?.value}
                                value={values}

                            />

                        </th>
                        <th
                            scope="row"
                            className="w-[33%] p-1 border font-normal text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            <input
                                type={type}
                                className={`w-full px-6 border py-0.5 focus:outline-none ${darkToggle === true ? 'bg-blue-gray-900 text-white' : 'bg-white'}`}
                                onChange={(e) => onTextChange(e)}
                                name={descriptionN}
                                placeholder={description}
                            // defaultValue={defaultValue}
                            />
                        </th>
                    </tr>
                ))) || (responseParmsrData && Object.entries(responseParmsrData)?.map(([key, values]: [any, any]) => (
                    <tr className=" border  w-full">
                        <td className="w-4  px-4">
                            <div className="flex items-center ">
                                {
                                    checkRadio === true ? <input
                                        // checked={checkCheckbox}
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  "
                                        name={rowId}
                                        onChange={(e) => handleChange(e)}
                                        defaultChecked={data[rowId]?.check}
                                    /> : <></>
                                }

                            </div>
                        </td>
                        <th
                            scope="row"
                            className="w-[33%] p-1 border font-normal text-gray-900 whitespace-nowrap dark:text-white group relative">
                            <div>
                                <input
                                    type={type}
                                    className={`w-full px-6 border py-0.5 focus:outline-none ${darkToggle === true ? 'bg-blue-gray-900 text-white' : 'bg-white'}`}
                                    onChange={(e) => onTextChange(e)}
                                    name={variableN}
                                    placeholder={variable}
                                    // value={data[rowId]?.key}
                                    value={key}

                                />
                            </div>

                            {
                                bodyTab === 'Body' ? <div className='hidden group-hover:block absolute right-0 top-2 '>
                                    <select name="" id="" onChange={(e) => handleTypeChange(e)} className='bg-transparent cursor-pointer'>
                                        <option value={'text'}>Text</option>
                                        <option value={'file'}>File</option>
                                    </select>
                                </div> : null
                            }
                        </th>
                        <th className="w-[33%] p-1 font-normal text-gray-900 whitespace-nowrap dark:text-white">
                            <input
                                type={types}
                                className={`w-full px-6 border py-0.5 focus:outline-none ${darkToggle === true ? 'bg-blue-gray-900 text-white' : 'bg-white'}`}
                                onChange={(e) => onTextChange(e)}
                                name={valueN}
                                placeholder={value}
                                // defaultValue={data[rowId]?.value}
                                value={values}

                            />

                        </th>
                        <th
                            scope="row"
                            className="w-[33%] p-1 border font-normal text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            <input
                                type={type}
                                className={`w-full px-6 border py-0.5 focus:outline-none ${darkToggle === true ? 'bg-blue-gray-900 text-white' : 'bg-white'}`}
                                onChange={(e) => onTextChange(e)}
                                name={descriptionN}
                                placeholder={description}
                            // defaultValue={defaultValue}
                            />
                        </th>
                    </tr>
                )))

                || <tr className=" border w-full">
                    <td className="w-4  px-4">
                        <div className="flex items-center ">
                            {
                                checkRadio === true ? <input
                                    // checked={checkCheckbox}
                                    id="checkbox-table-search-1"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  "
                                    name={rowId}
                                    onChange={(e) => handleChange(e)}
                                    defaultChecked={data[rowId]?.check}
                                /> : <></>
                            }

                        </div>
                    </td>
                    <th
                        scope="row"
                        className="w-[33%] p-1 border font-normal text-gray-900 whitespace-nowrap dark:text-white group relative">
                        <div>
                            <input
                                type={type}
                                className={`w-full px-6 border py-0.5 focus:outline-none ${darkToggle === true ? 'bg-blue-gray-900 text-white' : 'bg-white'}`}
                                onChange={(e) => onTextChange(e)}
                                name={variableN}
                                placeholder={variable}
                            // defaultValue={data[rowId]?.key ? data[rowId]?.key : ''}

                            />
                        </div>

                        {
                            bodyTab === 'Body' ? <div className={`hidden group-hover:block absolute right-0 top-2 ${darkToggle === true ? ' text-gray-500' : 'bg-white'}`}>
                                <select name="" id="" onChange={(e) => handleTypeChange(e)} className='bg-transparent cursor-pointer'>
                                    <option value={'text'}>Text</option>
                                    <option value={'file'}>File</option>
                                </select>
                            </div> : null
                        }
                    </th>
                    <th className="w-[33%] p-1 font-normal text-gray-900 whitespace-nowrap dark:text-white">
                        <input
                            type={types}
                            className={`w-full px-6 border py-0.5 focus:outline-none ${darkToggle === true ? 'bg-blue-gray-900 text-white' : 'bg-white'}`}
                            onChange={(e) => onTextChange(e)}
                            name={valueN}
                            placeholder={value}
                        // defaultValue={data && data[rowId]?.value ? data[rowId]?.value : ''}
                        />

                    </th>
                    <th
                        scope="row"
                        className="w-[33%] p-1 border font-normal text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        <input
                            type={type}
                            className={`w-full px-6 border py-0.5 focus:outline-none ${darkToggle === true ? 'bg-blue-gray-900 text-white' : 'bg-white'}`}
                            onChange={(e) => onTextChange(e)}
                            name={descriptionN}
                            placeholder={description}
                        // defaultValue={defaultValue}
                        />
                    </th>
                </tr>
            }
        </>

    )
}