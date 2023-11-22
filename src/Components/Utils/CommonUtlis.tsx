const checkValidJson = (text: string) => {
  if (typeof text == "object") return true;
  if (
    /^[\],:{}\s]*$/.test(
      text
        .replace(/\\["\\\/bfnrtu]/g, "@")
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
    )
  ) {
    return true;
  } else {
    return false;
  }
};

export const checkParams = (
  data: any,
  paramsData: any,
  headersData: any,
  jsonText: string,
  setMsg: any
) => {
  if (!data.url) {
    setMsg("Request URL is Missing");
    return false;
  }
  if (!checkValidJson(jsonText)) {
    setMsg("Text is Not Valid Json");
    return false;
  }
  return true;
};

export const getHeadersAndParams = (objArr: any[]) => {
  if (!Array.isArray(objArr)) {
    console.error('objArr is not an array');
    return {
      objArr
    }; // Return an appropriate value or handle the error
  }

  let obj = {};
  objArr.forEach((data) => {
    if (data.hasOwnProperty("check") && data.check) {
      obj = { ...obj, [data.key]: data.value };
    }
  });
  return obj;
};
