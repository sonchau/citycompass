import templateRender from "./templateRender";

const buildQueryUrl = (query, params = {}) => {
  const baseURL = `https://maps.geografia.com.au`;
  const username = "casey";
  const sqlApi = `/user/${username}/api/v2/sql`;
  const q = templateRender(query, params);
  return `${baseURL}/${sqlApi}?q=${q}`;
};

export default buildQueryUrl;
