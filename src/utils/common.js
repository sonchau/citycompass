import axios from "axios";
import buildQueryUrl from "./buildQueryUrl";

export const getData = async (queryName, params) => {
  const response = await axios.get(buildQueryUrl(queryName, params));
  //TODO: catch error
  return response;
};
export const getAllData = async (queries, params) => {
  const queryUrls = queries.map((query) =>
    axios.get(buildQueryUrl(query, params))
  );
  const response = await axios
    .all(queryUrls)
    .then(
      axios.spread((...responses) => {
        return responses.map((response) => {
          return response.data.rows;
        });
      })
    )
    .catch((errors) => {
      // TODO: need to catch error here
    });
  return response;
};

export const getGeoJSONData = (queryName) => {
  return buildQueryUrl(queryName, {}, "geojson");
};

export const getGeoJSONUrl = (query) => buildQueryUrl(query, {}, "geojson");

export const makeInputData = (inputArray) => {
  let result = [];
  inputArray.forEach((item, index) => {
    for (const [key, value] of Object.entries(item)) {
      if (value !== null) {
        const newKey = `{{data.${index}.${key}}}`;
        const outputObj = {};
        outputObj[newKey] = value;
        result.push(outputObj);
      }
    }
  });
  return result;
};

export const replaceContent = (inputArray, inputString) => {
  let newString = inputString;
  for (let item = 0; item <= inputArray.length - 1; item++) {
    const regexp = new RegExp(Object.keys(inputArray[item])[0], "g");
    newString = newString.replace(regexp, Object.values(inputArray[item])[0]);
    //console.log('newString', newString)
  }
  return newString;
};
export const replaceSqlContent = (inputArray, inputSql) => {
  let newSql = inputSql.slice(1, -1);
  for (let item = 0; item <= inputArray.length - 1; item++) {
    const key = `{{${Object.keys(inputArray[item])[0]}}}`;
    const regexp = new RegExp(key, "g");
    newSql = newSql.replace(regexp, `'${Object.values(inputArray[item])[0]}'`);
    //console.log('newSql', newSql)
  }
  return newSql;
};

export const makeHeading = (input) => {
  const output = input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return output;
};

export const updateFiltersFromDropdownEvent = (inputArray, { title, value }) =>
  inputArray.map((item) =>
    // Replace value of item is the title matches
    Object.keys(item).includes(title) ? { [title]: value } : item
  );

export const makeUrlQueryString = (inputArray) => {
  // Reduce over inputArray to create Url query string
  const params = inputArray.reduce((memo, curr) => {
    const key = Object.keys(curr)[0];
    const value = encodeURIComponent(Object.values(curr)[0]);
    memo.push(`${key}=${value}`);
    return memo;
  }, []);

  return "?" + params.join("&");
};
