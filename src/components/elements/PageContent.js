import React, {useState, useEffect} from "react"
import { getData, replaceContent, makeInputData, arrayToObject } from "../../utils/common";
import { Typography } from 'antd';
import ReactMarkdown from "react-markdown";

const { Title, Text } = Typography;

const PageContent = ({
    header,
    content,
    footer,
    query,
    selectedFilters
  }) => {
    const params = arrayToObject(selectedFilters);
    const [pageContent, setPageContent] = useState(null)
    useEffect(() => {
      getData(query, params).then(({ data }) => {
        //console.log('data', data.rows)
        setPageContent(data.rows)
      })
    }, [query, selectedFilters]);
    let newContent =''
    if (pageContent) {
      const inputArray = makeInputData(pageContent)
      newContent = replaceContent(inputArray, content)
      
    }
    return (
      <>
       <Title level={3}>{header}</Title>
       <ReactMarkdown
          source={newContent}
          escapeHtml={false}
        />
       <Text className="content-footer">{footer}</Text>
      </>
    );
  };

export default PageContent;
