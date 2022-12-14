import React, { useState, useContext } from "react";
import QueryForm from "./QueryForm";
import BodyForm from "./BodyForm";
import { DataContext } from "../Context/DataProvider";

export default function BodyTabs() {
  const { paramsData, setparamsData, headersData, setheadersData } =
    useContext(DataContext);

  // 👇️ initialize state to default checked radio button
  const [selected, setSelected] = useState("form-data");

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };

  return (
    <div>
      <div className="mx-2 flex items-center py-2 ">
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
      {selected === "form-data" ? (
        <QueryForm data={paramsData} setdata={setparamsData} />
      ) : (
        <></>
      )}
      {selected === "x-www-form-urlencoded" ? (
        <QueryForm data={headersData} setdata={setheadersData} />
      ) : (
        <></>
      )}
      {selected === "json" ? <BodyForm /> : <></>}
    </div>
  );
}
