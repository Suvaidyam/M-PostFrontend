import { useContext, type FC } from 'react';
import { MyContext } from '../../../Context/Context';
import CenterTabs from './CenterTabs';
import ReactJson from 'react-json-view';

interface QueryFormProps { }

const QueryForm: FC<QueryFormProps> = () => {
    const { currentTab } = useContext(MyContext)

    return (
        <>
            {currentTab === "Params" ? <><div className='border border-blue-800 w-14 mx-3'></div><div className="px-3  h-44">
                <div className="overflow-x-auto relative  pt-3 pb-[2px]">
                    <table className="w-full text-sm text-left text-gray-600 ">
                        <thead className="text-xs border text-gray-600 uppercase bg-white ">
                            <tr>
                                <th scope="col" className="p-2 w-6 border">
                                    <div className="flex items-center"></div>
                                </th>
                                <th scope="col" className="  py-1.5 px-6 border">
                                    KEY
                                </th>
                                <th scope="col" className="py-1.5 px-6 border">
                                    VALUE
                                </th>
                                <th scope="col" className=" py-1.5 px-6 border">
                                    DESCRIPTION
                                </th>
                            </tr>
                        </thead>
                        <thead className="text-xs border text-gray-600 uppercase bg-white ">
                            <tr>
                                <th scope="col" className="p-2 w-6 border">
                                    <div className="flex items-center"></div>
                                </th>
                                <th scope="col" className="  py-1.5 px-6 border">
                                    KEY
                                </th>
                                <th scope="col" className="py-1.5 px-6 border">
                                    VALUE
                                </th>
                                <th scope="col" className=" py-1.5 px-6 border">
                                    DESCRIPTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                      
                            {/* {rows.map((row, index) => (
              <AddRow
                addRows={addRows}
                rowId={index}
                key={index}
                data={data}
                setData={setData}
                {...{variable:'Key',value:'Value',description:'Description',type:'text',
                variableN:'key',valueN:'value',descriptionN:'description', params}}
              />
            ))} */}
                        </tbody>
                    </table>
                </div>
            </div></> : null}
            {currentTab === "Headers" ? <> <div className='border border-blue-800 w-14 mx-3'> </div>Headers</> : null}
            {currentTab === "Body" ? <><CenterTabs /></> : null}

        </>);
}

export default QueryForm;
