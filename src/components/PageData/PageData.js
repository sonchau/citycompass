import React from "react";
import PageContent from "../elements/PageContent";
import Table from '../elements/Table';
import Map from '../elements/Map';

const PageData = ({
  pageData,
  page_code,
  adjacentPages,
}) => {

  const pageFilterItem = adjacentPages.filter(item => page_code === item.page_code)
  let pageFilters = []
  if (pageFilterItem.length > 0) {
    pageFilters = pageFilterItem[0]['page_filters']
  }

  return (
    pageData.map((page, index) => {
      //NOTE: depend in element_type then render appropriate component type
      // 'text' => render PageContent
      // 'chart' => render Chart
      return {
        'text': <PageContent key={index} header={page.element_header} footer={page.element_footer} content={page.element_text} query={page.data_query} />,
        'table': <Table query={page.data_query} pageFilters={pageFilters} />,
        'map': <Map content={page.element_text} query={page.data_query} />
      }[page.element_type]
    })
  );
};

export default GenericDataComponent;