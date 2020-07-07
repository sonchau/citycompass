import styled from "styled-components";

const StyledTable = styled.div`
  width: 100%;
  .ant-table-thead > tr > th {
    background-color: ${(props) => props.theme.tableHeader};
    color: ${(props) => props.theme.white};
  }
`;

export default StyledTable;
