import React, {useState, useEffect} from "react"
import { getData, replaceContent, makeInputData } from "../../utils/common";

const PageContent = ({
    header,
    content,
    footer,
    query,

  }) => {

    const [pageContent, setPageContent] = useState(null)
    useEffect(() => {
      const updatedQuery = query.replace('{','').replace('}','')
      //console.log('updatedQuery', updatedQuery)
      getData(updatedQuery).then(({ data }) => {
        //console.log('data', data.rows)
        setPageContent(data.rows)
      })
    }, [query]);
    let newContent =''
    if(pageContent) {
      const inputArray = makeInputData(pageContent)
      newContent = replaceContent(inputArray, content)
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
