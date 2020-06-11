import axios from "axios";
import buildQueryUrl from "./buildQueryUrl";

export const getData = async (queryName) => {
  const response = await axios.get(buildQueryUrl(queryName));
  //TODO: catch error
  return response;
};
export const getAllData = async (queries) => {
  const queryUrls = queries.map(query => axios.get(buildQueryUrl(query)));
  const response = await axios.all(queryUrls).then(axios.spread((...responses) => {
    return responses.map( response => {
      return response.data.rows
    })
  })).catch(errors => {
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
  inputArray.map((item, index) => {
    for (const [key, value] of Object.entries(item)) {
      if (value !== null) {
        const newKey = `{{data.${index}.${key}}}`;
        const outputObj = new Object();
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

export const makeHeading = (input) => {
  const output = input.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ')

  return output
}