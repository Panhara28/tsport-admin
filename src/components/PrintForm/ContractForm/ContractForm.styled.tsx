import { Col, Row } from "react-bootstrap";
import styled from "styled-components";

/*
  Commons
*/
export const InputText = styled.p`
  margin-right: 80px !important;
  color: blue;
  font-weight: 600;
  font-family: "Siemreap", cursive !important;
`;

export const BlankSpace = styled.span`
  width: 80px;
`;

/*
  Container
*/

export const BiographyFormContainer = styled.div`
  padding: 80px 25px;
  padding-top: 180px;
  position: relative;
  font-family: "Moul", cursive;

  p,
  b,
  u,
  h4,
  h5,
  h6 {
    font-family: "Moul", cursive;
  }
`;

/*
  Header
*/

export const BiographyHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
`;

export const BiographyLeftHeader = styled.div`
  position: absolute;
  top: 140px;
  left: 25px;
`;

export const BiographyRightHeader = styled.div`
  position: absolute;
  top: 120px;
  right: 25px;
`;

/*
  Section One
*/

export const BiographyFormSectionOne = styled.div`
  margin-top: 70px;
`;

export const BiographyFormPersonalInfo = styled.div`
  .row {
    flex-wrap: nowrap;
  }
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap;


  p {
    margin-right: 20px;
  } */

  padding: 0px 60px 0px 60px;
`;

/*
  Biography Form Footer
*/

export const RowColLabel = styled(Col)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 33.33%;
`;

export const RowCol = styled(Col)`
  display: flex;
  flex-direction: row;
`;

export const BiographyFormFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
`;

export const BiographyFormFooterContainer = styled.div`
  display: flex;
  padding-top: 10px;
  padding-right: 90px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
`;

export const BiographyFormFooterLeft = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const BiographyFormFooterRight = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const InputTextSpan = styled.span`
  font-family: "Siemreap", cursive !important;
  color: blue;
  font-size: 16px;
  font-weight: 500;
`;
