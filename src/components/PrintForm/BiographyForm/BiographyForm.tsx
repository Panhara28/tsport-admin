/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Col, Form, Row } from 'react-bootstrap';
import {
  BiographyFormContainer,
  BiographyFormFooter,
  BiographyFormFooterContainer,
  BiographyFormFooterLeft,
  BiographyFormFooterRight,
  BiographyFormPersonalInfo,
  BiographyFormSectionOne,
  BiographyHeaderContainer,
  BiographyLeftHeader,
  BiographyRightHeader,
  BlankSpace,
  InputText,
  InputTextSpan,
  RowCol,
  RowColLabel,
} from './BiographForm.styled';
import { gql, useQuery } from '@apollo/client';
import { Graph } from '../../../../generated/graph';

interface BiographyFormProps {
  style?: any;
  info?: Graph.HrEmployee;
}

const BiographyForm: React.FC<BiographyFormProps> = ({ style, info }) => {
  const getYear = (dob: string | undefined | null) => {
    if (!dob) {
      return;
    }

    let year: string[] | string = dob.split('-');
    year = year[0];
    return year;
  };

  const getMonth = (dob: string | undefined | null) => {
    if (!dob) {
      return;
    }

    let month: string[] | string = dob.split('-');
    month = month[1];
    return month;
  };

  const getDay = (dob: string | undefined | null) => {
    if (!dob) {
      return;
    }

    let day: string[] | string = dob.split('-');
    day = day[2];
    return day;
  };

  return (
    <BiographyFormContainer id="section-to-print" style={style}>
      <BiographyLeftHeader>
        <p>
          ក្រសួង: <InputTextSpan>ពាណិជ្ជកម្ម</InputTextSpan>
        </p>
        <p>អង្គភាព:</p>
      </BiographyLeftHeader>

      <BiographyRightHeader>
        {/* <ComponentUpload width="120px" height="150px" /> */}
        <img
          src={info?.profile ? info?.profile : '/user-placeholder-image.jpeg'}
          width="150px"
          height="180px"
          style={{ objectFit: 'cover' }}
        />
      </BiographyRightHeader>

      <BiographyHeaderContainer>
        <h5>ព្រះរាជាណាចក្រកម្ពុជា</h5>
        <h6 className="mt-2">ជាតិ សាសនា ព្រះមហាក្សត្រ</h6>
        <h4 className="mt-4">
          <u>ជីវប្រវត្តិសង្ខេប</u>
        </h4>
      </BiographyHeaderContainer>

      <BiographyFormSectionOne>
        <p>
          <b>
            <u>ក. ពត៌មានផ្ទាល់ខ្លួន</u>
          </b>
        </p>

        <BiographyFormPersonalInfo>
          <p>គោត្តនាម និង នាម:</p>
          <InputText>{info?.fullname}</InputText>

          <p>អក្សរពុម្ភឡាតាំង:</p>
          <InputText>
            {info?.fullname_en
              ?.split('_')
              ?.join(' ')
              ?.toUpperCase()}
          </InputText>

          <p>ភេទ:</p>
          <InputText>{info?.gender}</InputText>

          <p>កើតថ្ងៃទី:</p>
          <InputText>{getDay(info?.dob)}</InputText>

          <p>ខែទី:</p>
          <InputText>{getMonth(info?.dob)}</InputText>

          <p>ឆ្នាំ:</p>
          <InputText>{getYear(info?.dob)}</InputText>

          <p>សញ្ជាតិ:</p>
          <InputText>{info?.nationality}</InputText>

          <p>កើតនៅភូមិ:</p>
          <InputText>{info?.village_or_group}</InputText>

          <p>ឃុំ(សង្កាត់):</p>
          <InputText>{info?.commune}</InputText>

          <p>ស្រុក(ខ័ណ្ឌ):</p>
          <InputText>{info?.district}</InputText>

          <p>ខេត្ត(ក្រុង):</p>
          <InputText>{info?.province}</InputText>
        </BiographyFormPersonalInfo>

        <p>
          <b>
            <u>ខ. ពត៌មានគ្រួសារ</u>
          </b>
        </p>
        <BiographyFormPersonalInfo>
          <p>ឈ្មោះប្រពន្ធ ឬ ប្តី:</p>
          <InputText>{/* ឈូក បូរិន */}</InputText>
          <InputText>{/* (រស់) */}</InputText>

          <p>កើតថ្ងៃទី</p>
          <InputText>{/* {getDay(info.dob)} */}</InputText>

          <p>ខែ</p>
          <InputText>{/* {getMonth(info.dob)} */}</InputText>

          <p>ឆ្នាំ</p>
          <InputText>{/* {getYear(info.dob)} */}</InputText>

          <p>មុខរបរ:</p>
          <InputText>{/* ព្រឹទ្ធសាស្រ្តាចារ្យ */}</InputText>

          <p>អង្គភាព:</p>
          <InputText>{/* សកលវិទ្យាល័យភូមិន្ទកសិកម្ម */}</InputText>

          <p>ចំនួនកូន:</p>
          <InputText>{/* 1 នាក់ */}</InputText>
        </BiographyFormPersonalInfo>

        <p>
          <b>
            <u>គ. អាសយដ្ឋានបច្ចុប្បន្ន:</u>
          </b>
        </p>
        <BiographyFormPersonalInfo>
          <p>ផ្ទះលេខ:</p>
          <InputText>{info?.homeNo}</InputText>
          <p>ផ្លូវលេខ:</p>
          <InputText>{info?.streetNo}</InputText>
          <p>ភូមិ/ក្រុម:</p>
          <InputText>{info?.contact_village}</InputText>
          <p>ឃុំ/សង្កាត់:</p>
          <InputText>{info?.contact_commune}</InputText>
          <p>ស្រុក/ក្រុង/ខ័ណ្ឌ:</p>
          <InputText>{info?.contact_district}</InputText>
          <p>រាជធានី/ខេត្ត:</p>
          <InputText>{info?.contact_city_or_province}</InputText>
          <p>លេខទូរស័ព្ទ:</p>
          <InputText>{info?.phoneNumber}</InputText>
          <p>អុីម៉ែល(ប្រសិនបើមាន):</p>
          <InputText>{info?.email}</InputText>
        </BiographyFormPersonalInfo>

        <p>
          <b>
            <u>ឃ. ភាសាបរទេស:</u>
          </b>
        </p>

        <Row>
          <Col md={12}>
            <h6>១. កំរិតវប្បធម៌ទូទៅ បណ្តុះបណ្តាលវិជ្ជាជីវៈ និង បណ្តុះបណ្តាលបន្ត :</h6>
          </Col>

          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>វគ្គ ឬ កំរិតសិក្សា</th>
                <th>គ្រិះស្ថានសិក្សាបណ្តុះបណ្តាល</th>
                <th>ទីកន្លែងសិក្សា</th>
                <th>សញ្ញាប័ត្រដែលទទួលបាន</th>
                <th>ថ្ងៃខែឆ្នាំចូលសិក្សា</th>
                <th>ថ្ងៃខែឆ្នាំបញ្ជប់ការសិក្សា</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={6}>-កំរិតវប្បធម៌ទូទៅ</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td style={{ textAlign: 'center' }}>{info?.dob}</td>
                <td style={{ textAlign: 'center' }}>{info?.dob}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td style={{ textAlign: 'center' }}>{info?.dob}</td>
                <td style={{ textAlign: 'center' }}>{info?.dob}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td style={{ textAlign: 'center' }}>{info?.dob}</td>
                <td style={{ textAlign: 'center' }}>{info?.dob}</td>
              </tr>
            </tbody>
          </Table>

          <Col md={12} className="mt-3 mb-2">
            <h6>២. ប្រវត្តិការងារ :</h6>
          </Col>

          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>ថ្ងៃខែចូលបំពេញការងារ</th>
                <th>ថ្ងៃខែបញ្ញប់ការងារ</th>
                <th>ក្រសួង ស្ថាប័ន</th>
                <th>នាយកដ្ឋាន ឬ អង្គភាព ឬ មន្ទីរ</th>
                <th>ការិយាល័យ</th>
                <th>មុខដំណែង</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={{ textAlign: 'center' }}>{info?.dob}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>{info?.dob}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>{info?.dob}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>{info?.dob}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>{info?.dob}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>{info?.dob}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </BiographyFormSectionOne>

      <BiographyFormFooter>
        <p>ខ្ញុំសូមធានាទទួលខុសត្រូវចំពោះមុខច្បាប់ថាពត៌មានបំពេញខាងលើនេះពិតជាត្រឹមត្រូវពិតប្រាកដមែន ។</p>

        <BiographyFormFooterContainer>
          <BiographyFormFooterLeft>
            <p>បានឃើញ និង បញ្ជាក់ថា ពត៌មានដែល</p>
            <p>លោក: ...........................................</p>
            <p>បានអះអាងខាងលើពិតជាត្រឹមត្រូវប្រាកដមែន។</p>
            <p>
              ធ្វើនៅថ្ងែទី:{' '}
              <InputTextSpan>
                {/* {getYear(info.dob)} */}
                &nbsp;&nbsp;&nbsp;&nbsp;
              </InputTextSpan>{' '}
              ខែ:{' '}
              <InputTextSpan>
                {/* {getMonth(info.dob)} */}
                &nbsp;&nbsp;&nbsp;&nbsp;
              </InputTextSpan>{' '}
              ឆ្នាំ:{' '}
              <InputTextSpan>
                {/* {getYear(info.dob)} */}
                &nbsp;&nbsp;&nbsp;&nbsp;
              </InputTextSpan>
            </p>
            <h6>ប្រធានអង្គភាព</h6>
          </BiographyFormFooterLeft>

          <BiographyFormFooterRight>
            <p>
              ធ្វើ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;នៅថ្ងែទី:{' '}
              <InputTextSpan>
                {/* {getYear(info.dob)} */}
                &nbsp;&nbsp;&nbsp;&nbsp;
              </InputTextSpan>{' '}
              ខែ:{' '}
              <InputTextSpan>
                {/* {getMonth(info.dob)} */}
                &nbsp;&nbsp;&nbsp;&nbsp;
              </InputTextSpan>{' '}
              ឆ្នាំ:{' '}
              <InputTextSpan>
                {/* {getYear(info.dob)} */}
                &nbsp;&nbsp;&nbsp;&nbsp;
              </InputTextSpan>
            </p>
            <p>ហត្ថលេខា (សាមីខ្លួន)</p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p>ឈ្មោះ: ...........................................</p>
          </BiographyFormFooterRight>
        </BiographyFormFooterContainer>
      </BiographyFormFooter>
    </BiographyFormContainer>
  );
};

export default BiographyForm;
