import React from "react"
import { Breadcrumb } from 'antd';
import styled from "styled-components";

const BreadcrumbContainer = styled(Breadcrumb)`
  margin-bottom: 1.4rem;
  font-size: 1.6rem;
  color: ${(props) => props.theme.color};
`;

const PageBreadcrumb = ({
  titles
  }) => {
    return ( <BreadcrumbContainer>
        {Object.values(titles).map((pageTitle, index) => (
          <Breadcrumb.Item key={index}>{pageTitle}</Breadcrumb.Item>
        ))}
      </BreadcrumbContainer>
    )
  };

export default PageBreadcrumb;

