export const PAGE_DIRECTORY_QUERY = `/* PAGE_DIRECTORY_QUERY */ SELECT
  a_level, a_title,
  b_level, b_title,
  c_level, c_title,
  d_level, d_title,
  page_code
  FROM casey.cc_pagedirectory_21610
  ORDER BY a_level, b_level, c_level, d_level`;

  // TODO: make casey a liquid template param: {{clientName}}
export const PAGE_CONTENT_QUERY = (clientName, page_code) => {
  return `/* PAGE_CONTENT_QUERY */ 
  SELECT page_code, element_order, element_type, element_header,
  element_text, element_footer, data_query, options
  FROM ${clientName}.cc_pagecontent_21610
  WHERE page_code = '${page_code}'
  ORDER BY element_order`
} 
