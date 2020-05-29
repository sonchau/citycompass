import React from "react";

const GenericDataComponent = ({ page_code, pageMetaData }) => {
  return (
    <>
      <h1>I am community profiles page {page_code}</h1>
      <pre>{JSON.stringify(pageMetaData, null, 2)}</pre>
    </>
  );
};

export default GenericDataComponent;
