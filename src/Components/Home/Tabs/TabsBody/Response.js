import ReactJson from "react-json-view";
import { AiOutlineGlobal } from "react-icons/ai";
import { LineWave } from "react-loader-spinner";
import ErrorScreen from "./ErrorScreen";

const Response = ({ apiResponse, isLoading }) => {
  // console.log("apiResponse", apiResponse);
  let { data, headers } = apiResponse;// ? apiResponse : {};

  const getStatusElem = (res) => {
    if (res) {
      // console.log(typeof res.status, res.status);
      if (res.status < 300) {
        return <span className="text-green-600">{res.status}</span>
      } else if ((res.status >= 300) && (res.status < 500)) {
        return <span className="text-yellow-600">{res.status}</span>
      } else {
        return <span className="text-red-600">{res.status}</span>
      }
    } else {
      return <span className="text-red-600">NA</span>
    }
  }
  const getResponseHeaderElem = (headers) => {
    let arr = [];
    if (headers) {
      for (let k in headers) {
        arr.push(
          <span key={k} className="text-gray-800 text-sm font-medium">
            <b>{k}:</b>{headers[k]}
          </span>
        )
      }
      return arr;
    } else {
      return <p>No Headers</p>
    }
  }
  // console.log(data);
  return (
    <>
      {data === undefined ? (
        <ErrorScreen />
      ) : (
        <>
          <div className=" h-screen  bg-white  overflow-scroll scrollbar-hide ">
            {isLoading ? (
              <div className="flex items-center justify-center  pt-12">
                <LineWave
                  height="100"
                  width="100"
                  color="#4fa94d"
                  ariaLabel="line-wave"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  firstLineColor="#2563EB"
                  middleLineColor="#2563EB"
                  lastLineColor="#2563EB"
                />
              </div>
            ) : (
              <>
                <div className="flex justify-between ">
                  {/* Show this part in tabs - Body and Headers */}
                  <div className="px-2 flex items-center  py-1 gap-5">
                    <span className="text-gray-800 text-sm font-medium">
                      Body
                    </span>

                    <span className="text-gray-800 text-sm font-medium">
                      Headers {getResponseHeaderElem(headers)}
                    </span>
                  </div>
                  <div className="px-2 flex items-center gap-5">
                    <span className="text-gray-800 text-sm font-medium">
                      <AiOutlineGlobal />
                    </span>
                    <pre>
                      <span className="text-gray-800 text-sm font-medium">
                        <b>Status:</b>{getStatusElem(apiResponse)}
                      </span>
                      <span className="text-gray-800 text-sm font-medium">
                        <b> Time:</b>{apiResponse.resTime}ms
                      </span>
                      <span className="text-gray-800 text-sm font-medium">
                        <b> Size:</b>{apiResponse.resSize}B
                      </span>
                    </pre>
                    <span className="text-gray-800 text-sm font-medium">
                      SaveResponse
                    </span>
                  </div>
                </div>
                <div className="px-2 pt-1 font-mono word-break: break-all ">
                  <ReactJson
                    src={
                      data.status === 400
                        ? data.data
                        : data
                    }
                  />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Response;
