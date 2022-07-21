import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Col, Form, Row } from 'react-bootstrap';
import {
  BiographyFormContainer,
  BiographyFormFooter,
  BiographyFormFooterContainer,
  BiographyFormFooterRight,
  BiographyFormPersonalInfo,
  BiographyFormSectionOne,
  BiographyHeaderContainer,
  BiographyLeftHeader,
  BiographyRightHeader,
  BlankSpace,
  InputTextSpan,
  RowCol,
  RowColLabel,
} from './ContractForm.styled';
import { gql, useQuery } from '@apollo/client';
import { Graph } from '../../../../generated/graph';

interface BiographyFormProps {
  style?: any;
  info?: Graph.HrEmployee;
}

const ContractForm: React.FC<BiographyFormProps> = ({ style, info }) => {
  const getYear = (dob: string | undefined | null) => {
    if (!dob) {
      return 'NA';
    }

    let year: string[] | string = dob.split('-');
    year = year[0];
    return year;
  };

  const getMonth = (dob: string | undefined | null) => {
    if (!dob) {
      return 'NA';
    }

    let month: string[] | string = dob.split('-');
    month = month[1];
    return month;
  };

  const getDay = (dob: string | undefined | null) => {
    if (!dob) {
      return 'NA';
    }

    let day: string[] | string = dob.split('-');
    day = day[2];
    return day;
  };

  return (
    <BiographyFormContainer id="section-to-print" style={style}>
      <BiographyHeaderContainer>
        <h5>ព្រះរាជាណាចក្រកម្ពុជា</h5>
        <h5 className="mt-2">ជាតិ សាសនា ព្រះមហាក្សត្រ</h5>
        <h6 style={{ marginTop: '40px' }}>
          <u>កិច្ចសន្យា</u>
        </h6>
      </BiographyHeaderContainer>

      <BiographyFormSectionOne>
        <BiographyFormPersonalInfo>
          <Row style={{ lineHeight: '30px', fontWeight: 600, fontSize: '16px' }}>
            <RowCol lg={5} md={5} style={{ width: '400px' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ខ្ញុំបាទ-នាងខ្ញុំឈ្មោះ:{' '}
              <InputTextSpan>&nbsp;{info?.fullname}</InputTextSpan>
            </RowCol>
            <RowCol lg={2} md={2} style={{ width: '200px' }}>
              កើតនៅថ្ងៃទី: <InputTextSpan>&nbsp;{getDay(info?.dob)}</InputTextSpan>
            </RowCol>
            <RowCol lg={2} md={2} style={{ width: '140px' }}>
              ខែ: <InputTextSpan>&nbsp;{getMonth(info?.dob)}</InputTextSpan>
            </RowCol>
            <RowCol lg={2} md={2} style={{ width: '140px' }}>
              ឆ្នាំ: <InputTextSpan>&nbsp;{getYear(info?.dob)}</InputTextSpan>
            </RowCol>
            <RowCol lg={1} md={1} style={{ width: '200px' }}>
              ជនជាតិ <InputTextSpan>&nbsp;{info?.nationality}</InputTextSpan>
            </RowCol>
          </Row>

          <Row style={{ lineHeight: '30px', fontWeight: 600, fontSize: '16px' }}>
            <RowCol lg={2} style={{ width: '200px' }}>
              សញ្ជាតិ: <InputTextSpan>&nbsp;{info?.nationality}</InputTextSpan>
            </RowCol>
            <RowCol lg={4} style={{ width: '280px' }}>
              ទីលំនៅបច្ចុប្បន្នផ្ទះលេខ: <InputTextSpan>&nbsp;{info?.homeNo}</InputTextSpan>
            </RowCol>
            <RowCol lg={1} style={{ width: '180px' }}>
              ក្រុម: <InputTextSpan>&nbsp;{info?.contact_village}</InputTextSpan>
            </RowCol>
            <RowCol lg={1} style={{ width: '180px ' }}>
              ផ្លូវលេខ: <InputTextSpan>&nbsp;{info?.streetNo}</InputTextSpan>
            </RowCol>
            <RowCol lg={2} style={{ width: '160px' }}>
              ភូមិ: <InputTextSpan>&nbsp;{info?.contact_village}</InputTextSpan>
            </RowCol>
            <RowCol lg={2} style={{ width: '180px' }}>
              សង្កាត់: <InputTextSpan>&nbsp;{info?.contact_district}</InputTextSpan>
            </RowCol>
          </Row>

          <Row style={{ lineHeight: '30px', fontWeight: 600, fontSize: '16px' }}>
            <Col lg={7}>
              <Row>
                <RowCol lg={5} style={{ width: '200px' }}>
                  ខណ្ឌ: <InputTextSpan>&nbsp;{info?.district}</InputTextSpan>
                </RowCol>
                <RowCol lg={7} style={{ justifyContent: 'space-between', width: '300px' }}>
                  <span>
                    រាជធានី/ខេត្ត:{' '}
                    <InputTextSpan>
                      &nbsp;
                      {info?.contact_city_or_province}
                    </InputTextSpan>
                  </span>{' '}
                  <span>។</span>
                </RowCol>
              </Row>
            </Col>
          </Row>

          <br />
          <br />
          <br />

          <Row style={{ lineHeight: '30px', fontWeight: 600, fontSize: '16px' }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; នៅពេលដែលខ្ញុំបាទ-នាងខ្ញុំ
            បានចូលបម្រើការងារជាបុគ្គលិកជាប់កិច្ចសន្យា-អណ្តែតក្រសួងពាណិជ្ជកម្មរួចហើយ ខ្ញុំសូមធានាចំពោះមុខក្រសួងថាៈ
          </Row>

          <Row style={{ lineHeight: '30px', fontWeight: 600, fontSize: '16px' }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ១-គោរពម៉ោងពេល ធ្វើការងារទាំងពេលចូល
            ទាំងពេលចេញ និងបទបញ្ជាផ្សេងៗ
          </Row>

          <Row style={{ lineHeight: '30px', fontWeight: 600, fontSize: '16px' }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            ២-ខិតខំបំពេញភារកិច្ចដែលអង្គភាពប្រគល់ឲ្យ
          </Row>

          <Row style={{ lineHeight: '30px', fontWeight: 600, fontSize: '16px' }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ៣-ខិតខំការពារមិនឲ្យខូច
            ឬបាត់បង់ទ្រព្យសម្បត្តិរដ្ឋ
          </Row>

          <Row style={{ lineHeight: '30px', fontWeight: 600, fontSize: '16px' }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            ៤-គ្មានទាមទារលក្ខខណ្ឌអ្វីដែលក្រសួងបញ្ឈប់ពីការងារ
          </Row>

          <Row
            style={{
              lineHeight: '30px',
              fontWeight: 600,
              fontSize: '16px',
              marginTop: '40px',
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ក្នុងករណីដែលខ្ញុំបាទ-នាងខ្ញុំ
            ប្រព្រឹត្តខុសពីកិច្ចសន្យាខាងលើ ខ្ញុំសូមទទួលខុសត្រូវទាំងស្រុងចំពោះមុខច្បាប់។
          </Row>

          <Row></Row>

          <Row
            style={{
              lineHeight: '30px',
              fontWeight: 600,
              fontSize: '16px',
              marginTop: '40px',
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; សូមផ្តិតមេដៃស្តាំទុកជាសំអាង។
          </Row>
        </BiographyFormPersonalInfo>
      </BiographyFormSectionOne>

      <BiographyFormFooter>
        <BiographyFormFooterContainer>
          <BiographyFormFooterRight>
            <p>
              ធ្វើនៅភ្នំពេញ,ថ្ងៃទី
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ខែ{' '}
              <InputTextSpan>
                {/* {getYear(info.dob)} */}
                &nbsp;&nbsp;&nbsp;&nbsp;
              </InputTextSpan>{' '}
              ឆ្នាំ២០........
            </p>
            <p style={{ fontWeight: 600, fontSize: '16px' }}>ស្នាមមេដៃនិងឈ្មោះសាមីខ្លួន</p>
          </BiographyFormFooterRight>
        </BiographyFormFooterContainer>
      </BiographyFormFooter>
    </BiographyFormContainer>
  );
};

export default ContractForm;
