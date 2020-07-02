import styled from "styled-components";
import { Layout } from 'antd';
const { Header } = Layout;

const StyledHeader = styled(Header)`
    background-color: ${(props) => props.theme.primaryBg};
    height: 8rem;
    line-height: 8rem;
    display: flex;
`;

export default StyledHeader;
