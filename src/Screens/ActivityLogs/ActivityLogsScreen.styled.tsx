import styled from "styled-components";
import { Table } from "react-bootstrap";

export const ActivityLogContainer = styled.div`
  .flex-end {
    justify-content: flex-end;
  }

  .flex-start {
    justify-content: flex-start;
  }

  .row {
    margin: 0px;
  }

  .filter_button {
    border: 2px solid #969a9c;
    background-color: transparent;
    margin-bottom: 20px;
    padding: 5px 10px 3px 10px;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;

    p {
      margin: 0px;
      font-size: 13px;
      margin-left: 4px;
    }

    svg {
      margin-bottom: 3px;
    }
  }
`;

export const ActivityTable = styled(Table)`
  thead {
    th {
      border: none;
      background-color: transparent;
      border-top: 1px solid #e3eaef;
      border-bottom: 1px solid #e3eaef;
    }
  }
  tbody {
    td {
      border-bottom: 1px solid #e3eaef;
      border-top: none;
    }
  }
`;
