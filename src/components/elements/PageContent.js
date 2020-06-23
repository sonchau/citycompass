import React, { useEffect } from "react"
import { replaceContent, makeInputData, arrayToObject } from "../../utils/common";
import { Typography } from 'antd';
import ReactMarkdown from "react-markdown";
import {useApi} from '../../utils/hooks';

const { Title, Text } = Typography;

const PageContent = ({
    header,
    content,
    footer,
    query,
    selectedFilters
  }) => {
    const params = arrayToObject(selectedFilters);
    const [getData, results, errorMessage] = useApi(query, params)

    useEffect(() => {
      getData(query, params)
    }, [selectedFilters]);
    
    let newContent = ''
    if (results) {
      const inputArray = makeInputData(results)
      newContent = replaceContent(inputArray, content)
    }

    return errorMessage ? 
    (<p>{errorMessage}</p>) : 
    (<>
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
