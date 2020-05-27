export const PAGE_DATA_QUERY = `/* PAGE_DATA_QUERY */ SELECT
  a_level, a_title,
  b_level, b_title,
  c_level, c_title,
  d_level, d_title,
  page_code
  FROM casey.cc_pagedirectory_21610
  ORDER BY a_level, b_level, c_level, d_level`;
