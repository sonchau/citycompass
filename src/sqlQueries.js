export const PAGE_DIRECTORY_QUERY = `/* PAGE_DIRECTORY_QUERY */ SELECT
  a_level, a_title,
  b_level, b_title,
  c_level, c_title,
  d_level, d_title,
  page_code,
  page_filters
  FROM {{clientName}}.cc_pagedirectory_21610
  ORDER BY page_code`;

export const PAGE_CONTENT_QUERY = `/* PAGE_CONTENT_QUERY */ 
  SELECT page_code, element_order, element_type, element_header,
  element_text, element_footer, data_query, options
  FROM {{clientName}}.cc_pagecontent_21610
  WHERE page_code = '{{page_code}}'
  ORDER BY element_order`;
