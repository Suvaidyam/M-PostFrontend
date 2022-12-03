import React from "react";

const HeadersForm = () => {
  return (
    <div>
      <div className="px-3 bg-white min-h-screen mx-2 my-2">
        <p className=" font-medium text-sm py-2 text-gray-600">Headers</p>

        <div className="overflow-x-auto relative  ">
          <table className="w-full text-sm text-left text-gray-600 ">
            <thead className="text-xs  text-gray-600 uppercase bg-white ">
              <tr>
                <th scope="col" className="p-2 w-6 border">
                  <div className="flex items-center"></div>
                </th>
                <th scope="col" className=" w-1/2 py-2 px-6 border">
                  KEY
                </th>
                <th scope="col" className="w-1/2 py-2 px-6 border">
                  VALUE
                </th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="bg-white border  w-full">
                <td className=" w-4 px-4">
                  <div className="flex items-center ">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300  "
                    />
                  </div>
                </td>
                <th
                  scope="row"
                  className="  w-1/2 border font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <input
                    type="text"
                    className="w-full px-6 py-1.5 focus:outline-none "
                    placeholder="Key "
                  />
                </th>
                <th
                  scope="row"
                  className="  font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <input
                    type="text"
                    className="w-full px-6 py-1.5 focus:outline-none "
                    placeholder="Value "
                  />
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HeadersForm;
