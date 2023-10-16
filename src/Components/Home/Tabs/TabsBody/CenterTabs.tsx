import React, { useState } from 'react'
import ReactJson from 'react-json-view';

type Props = {}

function CenterTabs({ }: Props) {
  const [selected, setSelected] = useState("json");

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };
  const initialData = {
    name: 'sujeet',
    email: 'sujeet@gmail.com',
    password: 'Sky@123',
  };

  const [data, setData] = useState(initialData);

  const handleEdit = (edit: any) => {
    // Update the data with the changes made using react-json-view
    setData(edit.updated_src);
  };
  return (
    <>
      <div className='w-full h-44'>
        <div className="mx-2 flex items-center   py-2 ">
          <input
            className="mx-2"
            type="radio"
            id="form-data"
            name="choose"
            value="form-data"
            checked={selected === "form-data"}
            onChange={handleChange}
          />
          <label htmlFor="form-data" className="font-medium text-xs">
            form-data
          </label>

          <input
            className="mx-2"
            type="radio"
            id="x-www-form-urlencoded"
            name="choose"
            value="x-www-form-urlencoded"
            onChange={handleChange}
            checked={selected === "x-www-form-urlencoded"}
          />
          <label htmlFor="x-www-form-urlencoded" className="font-medium text-xs">
            x-www-form-urlencoded
          </label>

          <input
            className="mx-2 "
            type="radio"
            id="json"
            name="choose"
            value="json"
            onChange={handleChange}
            checked={selected === "json"}
          />
          <label htmlFor="json" className="font-medium text-xs">
            json
          </label>
        </div>
        {selected === "json" ? (
          <div className='w-full'>
            <ReactJson
              src={data}
              name={false}
              displayDataTypes={false}
              displayObjectSize={false}
              enableClipboard={false}
              onEdit={handleEdit}
              onDelete={handleEdit}
              onAdd={handleEdit}
              // theme="apathy:inverted"
            />
          </div>
        ) : (
          <></>
        )}
        {selected === "form-data" ? (
          'Form Data'
        ) : (
          <></>
        )}

      </div>
    </>
  )
}

export default CenterTabs