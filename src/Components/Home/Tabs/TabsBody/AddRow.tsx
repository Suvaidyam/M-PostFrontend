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
    // defaultValue
}: Props) {
    const [checkCheckbox, setCheckCheckbox] = useState(false);
    const [checkRadio, setCheckRadio] = useState(false);
    const [types, setTypes] = useState<string>('text')
    const { formData, setFormData, setText } = useContext(MyContext)
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
        if (e.target.type === 'file') {
            setFormData(e.target.files[0])
        }
        result = { ...result, id: rowId, [e.target.name]: e.target.value }
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
    return (
        <>
            <tr className="bg-white border  w-full">
                <td className="w-4  px-4">
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
                    className="w-[33%] p-1 border font-normal text-gray-900 whitespace-nowrap dark:text-white group relative">
                    <div>
                        <input
                            type={type}
                            className="w-full px-6 border py-0.5 focus:outline-none  "
                            onChange={(e) => onTextChange(e)}
                            name={variableN}
                            placeholder={variable}
                        // defaultValue={defaultValue}
                        />
                    </div>

                    <div className='hidden group-hover:block absolute right-0 top-2 '>
                        <select name="" id="" onChange={(e) => handleTypeChange(e)} className='bg-transparent'>
                            <option value={'text'}>Text</option>
                            <option value={'file'}>File</option>
                        </select>
                    </div>
                </th>
                <th className="w-[33%] p-1 font-normal text-gray-900 whitespace-nowrap dark:text-white">
                    <input
                        type={types}
                        className="w-full px-6 border py-0.5 focus:outline-none "
                        onChange={(e) => onTextChange(e)}
                        name={valueN}
                        placeholder={value}
                    // defaultValue={defaultValue}
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
                    // defaultValue={defaultValue}
                    />
                </th>
            </tr>
        </>

    )
}