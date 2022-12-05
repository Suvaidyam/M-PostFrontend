const checkValidJson = (text) => {
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

export const checkParams = (formData, paramsData, headersData, jsonText) => {
  if (!formData.url) {
    return false;
  }
  if (!checkValidJson(jsonText)) {
    return false;
  }
  return true;
};

// export const getHeadersAndParams = (objArr) => {
//   let obj = {};
//   objArr.forEach((data) => {
//     if (data.hasOwnProperty("check") && data.check) {
//       obj = { ...obj, [data.key]: data.value };
//     }
//   });
//   return obj;
// };
