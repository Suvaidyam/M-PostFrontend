import ReactJson from "react-json-view";
import { AiOutlineGlobal } from "react-icons/ai";
import { LineWave } from "react-loader-spinner";
import ErrorScreen from "./ErrorScreen";

const Response = ({ apiResponse, isLoading }) => {
  console.log(apiResponse);
  return (
    <>
      {apiResponse === undefined ? (
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
                  <div className="px-2 flex items-center  py-1 gap-5">
                    <span className="text-gray-800 text-sm font-medium">
                      Body
                    </span>
                    <span className="text-gray-800 text-sm font-medium ">
                      Cookies
                    </span>
                    <span className="text-gray-800 text-sm font-medium">
                      Headers
                    </span>
                  </div>
                  <div className="px-2 flex items-center gap-5">
                    <span className="text-gray-800 text-sm font-medium">
                      <AiOutlineGlobal />
                    </span>
                    <p className="text-gray-800 text-sm font-medium">
                      status:
                      {apiResponse === undefined ? (
                        <></>
                      ) : (
                        <>
                          {apiResponse.status === 200 ? (
                            <span className="text-green-600">
                              {apiResponse === undefined ? (
                                <></>
                              ) : (
                                apiResponse.status
                              )}
                            </span>
                          ) : (
                            <span className="text-red-600">
                              {apiResponse === undefined ? (
                                <></>
                              ) : (
                                apiResponse.status
                              )}
                            </span>
                          )}
                        </>
                      )}
                    </p>
                    <span className="text-gray-800 text-sm font-medium ">
                      Time
                    </span>
                    <span className="text-gray-800 text-sm font-medium">
                      Size
                    </span>
                    <span className="text-gray-700 text-sm font-medium">
                      SaveResponse
                    </span>
                  </div>
                </div>
                <div className="px-2 pt-1 font-mono">
                  <ReactJson
                    src={
                      apiResponse.status === 400
                        ? apiResponse.data
                        : apiResponse
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
