import { useEffect, useState } from 'react';
import axios from "axios";
import buildQueryUrl from "./buildQueryUrl";

export const useApi = (queryName, params) => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const getData = async (queryName, params) => {
    try {
      const response = await axios.get(buildQueryUrl(queryName, params));
      setResults(response.data.rows);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    getData(queryName, params);
  }, []);

  return [getData, results, errorMessage];
};
