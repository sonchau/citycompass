import axios from "axios";
import buildQueryUrl from "./buildQueryUrl";
import {barChartItemStyles} from '../utils/chart'
import _ from 'lodash';

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
  let newSql = inputSql;
  for (let item = 0; item <= inputArray.length - 1; item++) {
    const key = `{{${Object.keys(inputArray[item])[0]}}}`;
    const regexp = new RegExp(key, "g");
    newSql = newSql.replace(regexp, `${Object.values(inputArray[item])[0]}`);
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

// removes the "{" and "}" surrounding the query coz SQL queries can't be stored in a database field without these
export const santaizeSql = (rawSql) => {
  const re = new RegExp(/^\{(.*)\}$/s)
  const match = re.exec(rawSql);
  return match ? match[1] : rawSql;
};

export const convertAjdPageToMetaData = ({
  page_code,
  page_filters,
  a_title,
  b_title,
  c_title,
  d_title,
}) => {
  return {
    pageMetaData: {
      page_titles: {
        a_title,
        b_title,
        c_title,
        d_title,
      },
      page_filters,
    },
    page_code,
  };
};

export const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj = { ...obj, ...item };
    return obj;
  }, {});

export const getSelectedFilterValue = (filterItems, selectedFilters) => {
  const findObjectKey = Object.keys(filterItems[0])[0]
  const foundObject = selectedFilters.find((selectedFilter) => {
    return Object.keys(selectedFilter)[0] === findObjectKey
  })
  const filterValue = foundObject[findObjectKey]
  return filterValue
}

export const makeChartLabel = (inputArray, label) => {
  const labels =  inputArray.map(item => {
    return item[label]
  })
  return _.uniqBy(labels)
}

export const makeChartDataSets = (inputArray, datasets, valueInput) => {
  const groups = _.groupBy(inputArray, datasets)
  const dataOutput = Object.keys(groups).map( (group, index) => {
    const data = _.map(groups[group], valueInput)
    return {
      label: group,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      data,
      ...barChartItemStyles[index]
    }
  })
  //console.log('dataOutput', dataOutput)
  return dataOutput
}