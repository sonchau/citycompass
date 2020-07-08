import React, { useEffect } from "react"
import { replaceContent, makeInputData, arrayToObject } from "../../utils/common";
import { Typography } from 'antd';
import ReactMarkdown from "react-markdown";
import {useApi} from '../../utils/hooks';
import styled from "styled-components";

const { Title, Text } = Typography;

const FooterText = styled.div`
  font-size: 1.2rem;
  opacity: 0.8;
  margin-bottom: 1rem;
`;

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
        <FooterText>
          <Text>{footer}</Text>
        </FooterText>
      </>
    );
  };

export default PageContent;
