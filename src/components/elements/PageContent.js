import React, {useState, useEffect} from "react"
import { getData, replaceContent, makeInputData } from "../../utils/common";
import { Typography } from 'antd';
import ReactMarkdown from "react-markdown";

const { Title, Text } = Typography;

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
