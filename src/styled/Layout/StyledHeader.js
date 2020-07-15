import styled from "styled-components";
import { Layout } from 'antd';
const { Header } = Layout;

const StyledHeader = styled(Header)`
    background-color: ${(props) => props.theme.primaryBg};
    height: 8rem;
    line-height: 8rem;
    display: flex;
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 100%);
`
export default StyledHeader;
