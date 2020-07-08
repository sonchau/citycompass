import styled from "styled-components";
import { Layout } from 'antd';
const { Content } = Layout;

const StyledContent = styled(Content)`
  background-color: ${(props) => props.theme.contentBg};
  padding: 3rem;
  section {
    border-radius: 1rem;
  }
`;

export default StyledContent;
