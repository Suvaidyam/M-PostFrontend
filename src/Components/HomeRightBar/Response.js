import ReactJson from "react-json-view";
import { AiOutlineGlobal } from "react-icons/ai";

const Response = ({ apiResponse }) => {
  console.log(apiResponse);
  return (
    <div className=" h-screen  bg-white mx-2 overflow-scroll scrollbar-hide ">
      <div className="flex justify-between py-1">
        <div className="px-2 flex items-center gap-5">
          <span className="text-gray-800 text-sm font-medium">Body</span>
          <span className="text-gray-800 text-sm font-medium ">Cookies</span>
          <span className="text-gray-800 text-sm font-medium">Headers</span>
        </div>
        <div className="px-2 flex items-center gap-5">
          <span className="text-gray-800 text-sm font-medium">
            <AiOutlineGlobal />
          </span>
          <span className="text-gray-800 text-sm font-medium">Status:</span>
          <span className="text-gray-800 text-sm font-medium ">Time</span>
          <span className="text-gray-800 text-sm font-medium">Size</span>
          <span className="text-gray-700 text-sm font-medium">
            SaveResponse
          </span>
        </div>
      </div>
      <div className="px-2 pt-1 font-mono">
        <ReactJson
          src={apiResponse === undefined ? apiResponse : apiResponse.data}
        />
      </div>
    </div>
  );
};

export default Response;
