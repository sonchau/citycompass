import templateRender from "./templateRender";

const buildQueryUrl = (query, params = {}, format = 'json') => {
  const baseURL = `https://maps.geografia.com.au`;
  const username = "casey";
  const sqlApi = `/user/${username}/api/v2/sql`;
  params = { ...params, username };
  const q = templateRender(query, params);
  return `${baseURL}/${sqlApi}?q=${q}&format=${format}`;
};

export default buildQueryUrl;
