const checkValidJson = (text) => {
  if (typeof text == 'object')
    return true;
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
  formData,
  paramsData,
  headersData,
  jsonText,
  setErrorMsg
) => {
  if (!formData.url) {
    setErrorMsg("Request URL is Missing");
    return false;
  }
  if (!checkValidJson(jsonText)) {
    setErrorMsg("Text is Not Valid Json");
    return false;
  }
  return true;
};

export const getHeadersAndParams = (objArr) => {
  let obj = {};
  objArr.forEach((data) => {
    if (data.hasOwnProperty("check") && data.check) {
      obj = { ...obj, [data.key]: data.value };
    }
  });
  return obj;
};
