import React, { useContext, useState } from 'react'
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
}: Props) {
    const [checkCheckbox, setCheckCheckbox] = useState(false);
    const [checkRadio, setCheckRadio] = useState(false);
    const { newEnvironment, tabData } = useContext(MyContext);
    console.log(tabData);
    const handleChange = (e: any) => {
        let result = data.filter((entry: { id: number; }) => entry.id === Number(e.target.name))[0];
        if (!checkCheckbox) {
            setCheckCheckbox(true);
            // addRows(oldArr => [...oldArr, rowId]);
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
        result = { ...result, id: rowId, [e.target.name]: e.target.value }
        if (!checkCheckbox) {
            setCheckCheckbox(true);
            setCheckRadio(true)
            addRows((oldArr: any) => [...oldArr, rowId]);
            result = { ...result, id: rowId, check: true }
        } else {

        }



        let index = data.findIndex((value: { id: any; }) => value.id === rowId);

        if (index === -1) {
            setData((oldArr: any) => [...oldArr, result]);
        } else {
            const newArray = Object.assign([...data], {
                [index]: result
            });
            setData(newArray)
        }
    }


    return (
        <>
            {/* {tabData?.details?.map((e: any) => ( */}
                <tr className="bg-white border  w-full">
                    <div className='w-full'>
                        <td className="w-full  px-4">
                            <div className="flex items-center ">
                                {
                                    checkRadio === true ? <input
                                        checked={checkCheckbox}
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  "
                                        name={rowId}
                                        onChange={(e) => handleChange(e)}
                                    /> : <></>
                                }

                            </div>
                        </td>
                        <th
                            scope="row"
                            className="w-[33%] p-1 border font-normal text-gray-900 whitespace-nowrap dark:text-white">
                            <input
                                type={type}
                                className="w-full px-6 border py-0.5 focus:outline-none "
                                onChange={(e) => onTextChange(e)}
                                name={variableN}
                                placeholder={variable}
                                // defaultValue={e.variable}
                            />
                        </th>
                        <th className="w-[33%] p-1 font-normal text-gray-900 whitespace-nowrap dark:text-white">
                            <input
                                type={type}
                                className="w-full px-6 border py-0.5 focus:outline-none "
                                onChange={(e) => onTextChange(e)}
                                name={valueN}
                                placeholder={value}
                                // defaultValue={e.value}
                            />
                        </th>
                        <th
                            scope="row"
                            className="w-[33%] p-1 border font-normal text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            <input
                                type={type}
                                className="w-full px-4 border py-0.5  focus:outline-none "
                                onChange={(e) => onTextChange(e)}
                                name={descriptionN}
                                placeholder={description}
                                // defaultValue={e.current_value}
                            />
                        </th>
                    </div>
                </tr>
            {/* ))} */}
            {/* {tabData?.details?.map((e: any) => (
                <div>
                    {e.value}
                </div>
            ))} */}
        </>

    )
}