import axios from "axios";
import buildQueryUrl from "./buildQueryUrl";

export const getData = (queryName) => {
  const response = axios.get(buildQueryUrl(queryName));
  return response;
};

export const makeInputData = (inputArray) => {
  let result = []
  inputArray.map((item, index) => {
    for (const [key, value] of Object.entries(item)) {
      if(value !== null) {
        const newKey = `{{data.${index}.${key}}}`
        const outputObj = new Object()
        outputObj[newKey] = value
        result.push(outputObj)
      }
    }    
  })
  return result
}

export const replaceContent = (inputArray, inputString) => {
  let newString = inputString
  for (let item = 0; item <=inputArray.length -1; item++) {
    const regexp = new RegExp(Object.keys(inputArray[item])[0], 'g')
    newString = newString.replace(regexp, Object.values(inputArray[item])[0])
    //console.log('newString', newString)
  }
  return newString

}
