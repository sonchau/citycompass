import React, { useState, useEffect } from "react";
import { getData, replaceContent, makeInputData } from "../utils/common";

const PageContent = ({ header, content, footer, query }) => {
  const [pageContent, setPageContent] = useState(null);
  useEffect(() => {
    // TODO: use sanatizeSql function
    const updatedQuery = query.replace("{", "").replace("}", "");
    getData(updatedQuery).then(({ data: { rows } }) => {
      setPageContent(rows);
    });
  }, [query]);
  let newContent = "";
  if (pageContent) {
    const inputArray = makeInputData(pageContent);
    newContent = replaceContent(inputArray, content);
  }

  return (
    <>
      <h1>{header}</h1>
      <p>{newContent}</p>
      <p>{footer}</p>
    </>
  );
};

export default PageContent;
