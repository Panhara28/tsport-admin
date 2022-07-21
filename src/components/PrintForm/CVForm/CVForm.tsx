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
} from './CVForm.styled';
import { Graph } from '../../../../generated/graph';

interface BiographyFormProps {
  style?: any;
  info?: Graph.HrEmployee;
}

const CVForm: React.FC<BiographyFormProps> = ({ style, info }) => {
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
        <h4 style={{ marginTop: '60px' }}>
          <u>ប្រវត្តិរូបសង្ខេប</u>
        </h4>
      </BiographyHeaderContainer>

      <BiographyFormSectionOne>
        <p>
          <b>
            <u>ក. ពត៌មានផ្ទាល់ខ្លួន</u>
          </b>
        </p>

        <BiographyFormPersonalInfo>
          <Row>
            <RowColLabel md={4}>
              <p>- នាមត្រកូល និង នាមខ្លួន</p>
              <p>:</p>
            </RowColLabel>
            <Col md={8}>
              <Row>
                <Col md={4}>
                  <InputTextSpan>{info?.fullname}</InputTextSpan>
                </Col>
                <RowCol md={4}>
                  <p>ភេទ:</p>
                  <InputTextSpan>&nbsp;&nbsp;{info?.gender}</InputTextSpan>
                </RowCol>
                <RowCol md={4}>
                  <p>សញ្ជាតិ:</p>
                  <InputTextSpan>&nbsp;&nbsp;{info?.nationality}</InputTextSpan>
                </RowCol>
              </Row>
            </Col>
          </Row>

          <Row>
            <RowColLabel md={4}>
              <p>- អក្សរពុម្ភឡាតាំង</p>
              <p>:</p>
            </RowColLabel>
            <Col md={8}>
              <InputTextSpan>
                {info?.fullname_en
                  ?.split('_')
                  ?.join(' ')
                  ?.toUpperCase()}
              </InputTextSpan>
            </Col>
          </Row>

          <Row>
            <RowColLabel md={4}>
              <p>- ថ្ងៃ ខែ ឆ្នាំកំណើត</p>
              <p>:</p>
            </RowColLabel>
            <Col md={8}>
              <Row>
                <RowCol md={4}>
                  <p>កើតថ្ងៃទី:</p>
                  <InputTextSpan>&nbsp;&nbsp;{getDay(info?.dob)}</InputTextSpan>
                </RowCol>
                <RowCol md={4}>
                  <p>ខែទី:</p>
                  <InputTextSpan>&nbsp;&nbsp;{getMonth(info?.dob)}</InputTextSpan>
                </RowCol>
                <RowCol md={4}>
                  <p>ឆ្នាំ:</p>
                  <InputTextSpan>&nbsp;&nbsp;{getYear(info?.dob)}</InputTextSpan>
                </RowCol>
              </Row>
            </Col>
          </Row>

          <Row>
            <RowColLabel md={4}>
              <p>- កម្រិតវប្បធម៌</p>
              <p>:</p>
            </RowColLabel>
            <Col md={8}>
              <InputTextSpan></InputTextSpan>
            </Col>
          </Row>

          <Row>
            <RowColLabel md={4}>
              <p>- ទីកន្លែងកំណើត</p>
              <p>:</p>
            </RowColLabel>
            <Col md={8}>
              <Row>
                <RowCol md={6}>
                  <p>ឃុំ/សង្កាត់:</p>
                  <InputTextSpan>&nbsp;&nbsp;{info?.commune}</InputTextSpan>
                </RowCol>
                <RowCol md={6}>
                  <p>ស្រុក/ក្រុង/ខ័ណ្ឌ:</p>
                  <InputTextSpan>&nbsp;&nbsp;{info?.district}</InputTextSpan>
                </RowCol>
              </Row>
            </Col>
          </Row>

          <Row>
            <RowColLabel md={4}></RowColLabel>
            <Col md={8}>
              <Row>
                <RowCol md={12}>
                  <p>រាជធានី/ខេត្ត:</p>
                  <InputTextSpan>&nbsp;&nbsp;{info?.province}</InputTextSpan>
                </RowCol>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col md={8} style={{ gap: '5px', display: 'flex', flexDirection: 'row' }}>
              <p>- លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ</p>
              <input type="checkbox" style={{ marginTop: '4px' }} defaultChecked={true} />
              <p>ឬលិខិតឆ្លងដែន</p>
              <input type="checkbox" style={{ marginTop: '4px' }} />
              <p style={{ alignSelf: 'flex-end' }}>:</p>
              &nbsp;&nbsp;<InputTextSpan>{info?.national_id}</InputTextSpan>
            </Col>
          </Row>

          <Row>
            <RowColLabel md={4}>
              <p>- អង្គភាព/ទីកន្លែងបំពេញការងារ</p>
              <p>:</p>
            </RowColLabel>
            <Col md={8}>
              <InputTextSpan></InputTextSpan>
            </Col>
          </Row>

          <Row>
            <RowColLabel md={4}>
              <p>- បរិយាយមុខងារ</p>
              <p>:</p>
            </RowColLabel>
            <Col md={8}>
              <InputTextSpan></InputTextSpan>
            </Col>
          </Row>
        </BiographyFormPersonalInfo>

        <p>
          <b>
            <u>ខ. ពត៌មានគ្រួសារ</u>
          </b>
        </p>
        <BiographyFormPersonalInfo>
          <Row>
            <RowColLabel md={4}>
              <p>- ឪពុកឈ្មោះ</p>
              <p>:</p>
            </RowColLabel>
            <Col md={8}>
              <Row>
                <Col md={4}>
                  <InputTextSpan></InputTextSpan>
                </Col>
                <RowCol md={4} style={{ justifyContent: 'space-around' }}>
                  <p>រស់</p>
                  <input type="checkbox" style={{ marginTop: '4px' }} />
                  <p>ឬស្លាប់</p>
                  <input type="checkbox" style={{ marginTop: '4px' }} />
                </RowCol>
                <RowCol md={4}>
                  <p>មុខរបរ</p>
                  <InputTextSpan></InputTextSpan>
                </RowCol>
              </Row>
            </Col>
          </Row>

          <Row>
            <RowColLabel md={4}>
              <p>- ម្តាយឈ្មោះ</p>
              <p>:</p>
            </RowColLabel>
            <Col md={8}>
              <Row>
                <Col md={4}>
                  <InputTextSpan></InputTextSpan>
                </Col>
                <RowCol md={4} style={{ justifyContent: 'space-around' }}>
                  <p>រស់</p>
                  <input type="checkbox" style={{ marginTop: '4px' }} />
                  <p>ឬស្លាប់</p>
                  <input type="checkbox" style={{ marginTop: '4px' }} />
                </RowCol>
                <RowCol md={4}>
                  <p>មុខរបរ</p>
                  <InputTextSpan></InputTextSpan>
                </RowCol>
              </Row>
            </Col>
          </Row>

          <Row>
            <RowColLabel md={4}>
              <p>- ប្រពន្ធ ឬប្តីឈ្មោះ</p>
              <p>:</p>
            </RowColLabel>
            <Col md={8}>
              <Row>
                <Col md={4}>
                  <InputTextSpan></InputTextSpan>
                </Col>
                <RowCol md={4} style={{ justifyContent: 'space-around' }}>
                  <p>រស់</p>
                  <input type="checkbox" style={{ marginTop: '4px' }} />
                  <p>ឬស្លាប់</p>
                  <input type="checkbox" style={{ marginTop: '4px' }} />
                </RowCol>
                <RowCol md={4}>
                  <p>មុខរបរ</p>
                  <InputTextSpan></InputTextSpan>
                </RowCol>
              </Row>
            </Col>
          </Row>

          <Row>
            <RowColLabel md={4}>
              <p>- ចំនួនកូន</p>
              <p>:</p>
            </RowColLabel>
            <Col md={8}>
              <Row>
                <RowCol md={4} style={{ justifyContent: 'space-between' }}>
                  <InputTextSpan></InputTextSpan>
                  <p>នាក់</p>
                </RowCol>
                <RowCol md={4} style={{ justifyContent: 'space-between' }}>
                  <p>ប្រុស</p>
                  <InputTextSpan></InputTextSpan>
                  <p>នាក់</p>
                </RowCol>
                <RowCol md={4} style={{ justifyContent: 'space-between' }}>
                  <p>ស្រី</p>
                  <InputTextSpan></InputTextSpan>
                  <p>នាក់</p>
                </RowCol>
              </Row>
            </Col>
          </Row>
        </BiographyFormPersonalInfo>

        <p>
          <b>
            <u>គ. ពត៌មានទំនាក់ទំនង</u>
          </b>
        </p>

        <BiographyFormPersonalInfo>
          <Row>
            <RowColLabel md={4}>
              <p>- ទីកន្លែងកំណើត</p>
              <p>:</p>
            </RowColLabel>
            <Col md={8}>
              <Row>
                <RowCol md={4}>
                  <p>ផ្ទះលេខ:</p>
                  <InputTextSpan></InputTextSpan>
                </RowCol>
                <RowCol md={4}>
                  <p>ផ្លូវលេខ:</p>
                  <InputTextSpan></InputTextSpan>
                </RowCol>
                <RowCol md={4}>
                  <p>ភូមិ:</p>
                  <InputTextSpan></InputTextSpan>
                </RowCol>
              </Row>
            </Col>
          </Row>

          <Row>
            <RowColLabel md={4}></RowColLabel>
            <Col md={8}>
              <Row>
                <RowCol md={6}>
                  <p>ឃុំ/សង្កាត់:</p>
                  <InputTextSpan></InputTextSpan>
                </RowCol>
                <RowCol md={6}>
                  <p>ស្រុក/ក្រុង/ខ័ណ្ឌ:</p>
                  <InputTextSpan></InputTextSpan>
                </RowCol>
              </Row>
            </Col>
          </Row>

          <Row>
            <RowColLabel md={4}></RowColLabel>
            <Col md={8}>
              <Row>
                <RowCol md={12}>
                  <p>រាជធានី/ខេត្ត:</p>
                  <InputTextSpan></InputTextSpan>
                </RowCol>
              </Row>
            </Col>
          </Row>

          <Row>
            <RowColLabel md={4}>
              <p>- លេខទូរស័ព្ទទំនាក់ទំនង</p>
              <p>:</p>
            </RowColLabel>
            <Col md={8}>
              <InputTextSpan></InputTextSpan>
            </Col>
          </Row>

          <Row>
            <RowColLabel md={4}>
              <p>- អុីម៉ែល(ប្រសិនបើមាន)</p>
              <p>:</p>
            </RowColLabel>
            <Col md={8}>
              <InputTextSpan></InputTextSpan>
            </Col>
          </Row>

          <Row>
            <RowColLabel md={4}>
              <p>- ចំនួនកូន</p>
              <p>:</p>
            </RowColLabel>
            <Col md={8}>
              <Row>
                <RowCol md={6}>
                  <p>ឃុំ/សង្កាត់:</p>
                  <InputTextSpan></InputTextSpan>
                </RowCol>
                <RowCol md={6}>
                  <p>ស្រុក/ក្រុង/ខ័ណ្ឌ:</p>
                  <InputTextSpan></InputTextSpan>
                </RowCol>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col md={12} style={{ paddingLeft: '23px' }}>
              <p>ខ្ញុំសូមធានាអះអាងចំពោះពត៌មានខាងលើ ពិតជាត្រឹមត្រូវ។</p>
            </Col>
          </Row>
        </BiographyFormPersonalInfo>
      </BiographyFormSectionOne>

      <BiographyFormFooter>
        <BiographyFormFooterContainer>
          <BiographyFormFooterRight>
            <p>
              ថ្ងៃ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ខែ{' '}
              <InputTextSpan>
                {/* {getYear(info.dob)} */}
                &nbsp;&nbsp;&nbsp;&nbsp;
              </InputTextSpan>{' '}
              ឆ្នាំឆ្លូវ ត្រីស័ក ព.ស.២៥៦៥
            </p>
            <p>
              រាជធានីភ្នំពេញ ថ្ងៃទី &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ខែ{' '}
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

export default CVForm;
