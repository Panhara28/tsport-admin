import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Col } from 'reactstrap';
import { Row } from 'reactstrap';
import { Card } from 'reactstrap';
import { Label } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import XForm from '../../components/Form/XForm';
import { CreateUpdateForm } from '../../components/GraphQL/CreateUpdateForm';
import { SingleUpload } from '../../components/SingleUpload';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';

const CREATE_MUTATION = gql`
  mutation createHrEmployee($input: HrEmployeeInput) {
    createHrEmployee(input: $input)
  }
`;

const UPDATE_MUTATION = gql`
  mutation updateHrEmployee($id: Int!, $input: HrEmployeeInput) {
    updateHrEmployee(id: $id, input: $input)
  }
`;

const QUERY = gql`
  query hrEmployee($id: Int!) {
    hrEmployee(id: $id) {
      id
      username
      fullname
      fullname_en
      profile
      phoneNumber
      status
      email
      gender
      nationality
      dob
      district
      commune
      education_level
      passport_id
      national_id
      position_level
      position_description
      unit
      department_id
      general_department_id
      contact_city_or_province
      province
      homeNo
      streetNo
      village_or_group
      contact_district
      contact_village
      contact_commune
      officer_id
      office_id
    }
  }
`;

const FormBodyCreate = ({ update, defaultValues }: any) => {
  const [fullname, setFullName] = useState(defaultValues?.fullname || '');
  const [fullnameEn, setFullNameEn] = useState(defaultValues?.fullname_en || '');
  const [username, setUsername] = useState(defaultValues?.username || '');
  const [password, setPassword] = useState(defaultValues?.password || '');
  const [email, setEmail] = useState(defaultValues?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(defaultValues?.phoneNumber || '');
  const [image, setImage] = useState(defaultValues?.image || '');
  const [gender, setGender] = useState(defaultValues?.gender || '');
  const [nationality, setNationality] = useState(defaultValues?.nationality || '');
  const [dob, setDob] = useState(defaultValues?.dob || '');
  const [district, setDistrict] = useState(defaultValues?.district || '');
  const [commune, setCommune] = useState(defaultValues?.commune || '');
  const [educationLevel, setEducationLevel] = useState(defaultValues?.education_level || '');
  const [passportId, setPassportId] = useState(defaultValues?.passport_id || '');
  const [nationalId, setNationalId] = useState(defaultValues?.national_id || '');
  const [positionLevel, setPositionLevel] = useState(defaultValues?.position_level || '');
  const [positionDescription, setPositionDescription] = useState(defaultValues?.position_description || '');
  const [unit, setUnit] = useState(defaultValues?.unit || '');
  const [departmentId, setDepartmentId] = useState(defaultValues?.department_id || '');
  const [generalDepartmentId, setGeneralDepartmentId] = useState(defaultValues?.general_department_id || '');
  const [contactCityOrProvince, setContactCityOrProvince] = useState(defaultValues?.contact_city_or_province || '');
  const [province, setProvince] = useState(defaultValues?.province || '');
  const [homeNo, setHomeNo] = useState(defaultValues?.homeNo || '');
  const [streetNo, setStreetNo] = useState(defaultValues?.streetNo || '');
  const [villageOrGroup, setVillageOrGroup] = useState(defaultValues?.village_or_group || '');
  const [contactDistrict, setContactDistrict] = useState(defaultValues?.contact_district || '');
  const [contactVillage, setContactVillage] = useState(defaultValues?.contact_village || '');
  const [contactCommune, setContactCommune] = useState(defaultValues?.contact_commune || '');
  const [officerId, setOfficerId] = useState(defaultValues?.officer_id || '');
  const [officeId, setOfficeId] = useState(defaultValues?.office_id || '');

  const onHandleSubmit = (e: any) => {
    e.preventDefault();

    const input = {
      username: username,
      password: password,
      fullname: fullname,
      email: email,
      phoneNumber: phoneNumber,
      profile: image,
      fullname_en: fullnameEn,
      gender: gender,
      nationality: nationality,
      // dob: dob,
      district: district,
      commune: commune,
      education_level: educationLevel,
      passport_id: passportId,
      national_id: nationalId,
      position_level: Number(positionLevel),
      position_description: positionDescription,
      unit: unit,
      department_id: Number(departmentId),
      general_department_id: Number(generalDepartmentId),
      contact_city_or_province: contactCityOrProvince,
      province: province,
      homeNo: homeNo,
      streetNo: streetNo,
      village_or_group: villageOrGroup,
      contact_district: contactDistrict,
      contact_village: contactVillage,
      contact_commune: contactCommune,
      officer_id: officerId,
      office_id: Number(officeId),
    };

    update({
      ...input,
    });

    setFullName('');
    setUsername('');
    setPassword('');
    setEmail('');
    setPhoneNumber('');
    setImage('');
    setFullNameEn('');
    setGender('');
    setNationality('');
    setDob('');
    setDistrict('');
    setCommune('');
    setEducationLevel('');
    setPassportId('');
    setNationalId('');
    setPositionLevel('');
    setPositionDescription('');
    setUnit('');
    setDepartmentId('');
    setGeneralDepartmentId('');
    setContactCityOrProvince('');
    setProvince('');
    setHomeNo('');
    setStreetNo('');
    setVillageOrGroup('');
    setContactDistrict('');
    setContactVillage('');
    setContactCommune('');
    setOfficerId('');
    setOfficeId('');
  };

  return (
    <Form onSubmit={onHandleSubmit}>
      <Row>
        <Col md={3} className="mb-3">
          <Label>Profile Picture</Label>
          <SingleUpload image={image} setImage={setImage} width="150" height="150" />
        </Col>
      </Row>
      <Row>
        <h4>Security</h4>
        <hr />
        <Col md={6}>
          <XForm.Text
            label="Username"
            value={username}
            name="username"
            onChange={e => setUsername(e.currentTarget.value)}
          />
        </Col>
        <Col md={6}>
          <XForm.Text
            label="Password"
            value={password}
            name="password"
            type="password"
            onChange={e => setPassword(e.currentTarget.value)}
          />
        </Col>
      </Row>
      <Row>
        <h4>Information</h4>
        <hr />
        <Col md={6}>
          <XForm.Text
            label="Fullname"
            value={fullname}
            name="fullname"
            onChange={e => setFullName(e.currentTarget.value)}
          />
        </Col>
        <Col md={6}>
          <XForm.Text
            label="Fullname in english"
            value={fullnameEn}
            name="fullnameEn"
            onChange={e => setFullNameEn(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Select
            label="Gender"
            value={gender}
            name="gender"
            items={[
              { text: 'Male', value: 'ប្រុស' },
              { text: 'Female', value: 'ស្រី' },
            ]}
            onChange={e => setGender(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Officer Id"
            value={officerId}
            name="officerId"
            onChange={e => setOfficerId(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Province"
            value={province}
            name="province"
            onChange={e => setProvince(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="District"
            value={district}
            name="district"
            onChange={e => setDistrict(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Commune"
            value={commune}
            name="commune"
            onChange={e => setCommune(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Village or Group"
            value={villageOrGroup}
            name="villageOrGroup"
            onChange={e => setVillageOrGroup(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Education Level"
            value={educationLevel}
            name="educationLevel"
            onChange={e => setEducationLevel(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text label="Unit" value={unit} name="unit" onChange={e => setUnit(e.currentTarget.value)} />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Nationality"
            value={unit}
            name="nationality"
            onChange={e => setNationality(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="National Id"
            value={nationalId}
            name="nationalId"
            onChange={e => setNationalId(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Passport Id"
            value={passportId}
            name="passportId"
            onChange={e => setPassportId(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Position Level"
            value={positionLevel}
            name="positionLevel"
            onChange={e => setPositionLevel(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Position Description"
            value={positionDescription}
            name="positionDescription"
            onChange={e => setPositionDescription(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="General Department"
            value={generalDepartmentId}
            name="generalDepartmentId"
            onChange={e => setGeneralDepartmentId(e.currentTarget.value)}
          />
        </Col>
        <Col md={6}>
          <XForm.Text
            label="Department"
            value={departmentId}
            name="departmentId"
            onChange={e => setDepartmentId(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Office"
            value={officeId}
            name="officeId"
            onChange={e => setOfficeId(e.currentTarget.value)}
          />
        </Col>
      </Row>
      <Row>
        <h4>Contact Information</h4>
        <hr />

        <Col md={6}>
          <XForm.Text
            label="Contact City or Province"
            value={contactCityOrProvince}
            name="contactCityOrProvince"
            onChange={e => setContactCityOrProvince(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Contact District"
            value={contactDistrict}
            name="contactDistrict"
            onChange={e => setContactDistrict(e.currentTarget.value)}
          />
        </Col>
        <Col md={6}>
          <XForm.Text
            label="Contact Village"
            value={contactVillage}
            name="contactVillage"
            onChange={e => setContactVillage(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Contact Commune"
            value={contactCommune}
            name="contactCommune"
            onChange={e => setContactCommune(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text label="Home No" value={homeNo} name="homeNo" onChange={e => setHomeNo(e.currentTarget.value)} />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Street No"
            value={streetNo}
            name="streetNo"
            onChange={e => setStreetNo(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Phone number"
            value={phoneNumber}
            name="phoneNumber"
            onChange={e => setPhoneNumber(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text label="Email" value={email} name="email" onChange={e => setEmail(e.currentTarget.value)} />
        </Col>
      </Row>

      <Row>
        <Col></Col>
        <Col md={6}>
          <XForm.Footer>
            <XForm.Button type="submit">Save</XForm.Button>
          </XForm.Footer>
        </Col>
      </Row>
    </Form>
  );
};

const FormBodyEdit = ({ update, defaultValues }: any) => {
  const [fullname, setFullName] = useState(defaultValues?.fullname || '');
  const [fullnameEn, setFullNameEn] = useState(defaultValues?.fullname_en || '');
  const [email, setEmail] = useState(defaultValues?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(defaultValues?.phoneNumber || '');
  const [image, setImage] = useState(defaultValues?.profile_picture || '');
  const [gender, setGender] = useState(defaultValues?.gender || '');
  const [nationality, setNationality] = useState(defaultValues?.nationality || '');
  const [dob, setDob] = useState(defaultValues?.dob || '');
  const [district, setDistrict] = useState(defaultValues?.district || '');
  const [commune, setCommune] = useState(defaultValues?.commune || '');
  const [educationLevel, setEducationLevel] = useState(defaultValues?.education_level || '');
  const [passportId, setPassportId] = useState(defaultValues?.passport_id || '');
  const [nationalId, setNationalId] = useState(defaultValues?.national_id || '');
  const [positionLevel, setPositionLevel] = useState(defaultValues?.position_level || '');
  const [positionDescription, setPositionDescription] = useState(defaultValues?.position_description || '');
  const [unit, setUnit] = useState(defaultValues?.unit || '');
  const [departmentId, setDepartmentId] = useState(defaultValues?.department_id || '');
  const [generalDepartmentId, setGeneralDepartmentId] = useState(defaultValues?.general_department_id || '');
  const [contactCityOrProvince, setContactCityOrProvince] = useState(defaultValues?.contact_city_or_province || '');
  const [province, setProvince] = useState(defaultValues?.province || '');
  const [homeNo, setHomeNo] = useState(defaultValues?.homeNo || '');
  const [streetNo, setStreetNo] = useState(defaultValues?.streetNo || '');
  const [villageOrGroup, setVillageOrGroup] = useState(defaultValues?.village_or_group || '');
  const [contactDistrict, setContactDistrict] = useState(defaultValues?.contact_district || '');
  const [contactVillage, setContactVillage] = useState(defaultValues?.contact_village || '');
  const [contactCommune, setContactCommune] = useState(defaultValues?.contact_commune || '');
  const [officerId, setOfficerId] = useState(defaultValues?.officer_id || '');
  const [officeId, setOfficeId] = useState(defaultValues?.office_id || '');

  const onHandleSubmit = (e: any) => {
    e.preventDefault();

    const x: any = e.target;

    const input = {
      fullname: fullname,
      email: email,
      phoneNumber: phoneNumber,
      profile: image,
      fullname_en: fullnameEn,
      gender: gender,
      nationality: nationality,
      dob: dob,
      district: district,
      commune: commune,
      education_level: educationLevel,
      passport_id: passportId,
      national_id: nationalId,
      position_level: positionLevel,
      position_description: positionDescription,
      unit: unit,
      department_id: departmentId,
      general_department_id: generalDepartmentId,
      contact_city_or_province: contactCityOrProvince,
      province: province,
      homeNo: homeNo,
      streetNo: streetNo,
      village_or_group: villageOrGroup,
      contact_district: contactDistrict,
      contact_village: contactVillage,
      contactCommune: contactCommune,
      officer_id: officerId,
      office_id: officeId,
    };

    update({
      ...input,
    });
  };
  return (
    <Form onSubmit={onHandleSubmit}>
      <Row>
        <Col md={3} className="mb-3">
          <Label>Profile Picture</Label>
          <SingleUpload image={image} setImage={setImage} width="150" height="150" />
        </Col>
      </Row>
      <Row>
        <h4>Information</h4>
        <hr />
        <Col md={6}>
          <XForm.Text
            label="Fullname"
            value={fullname}
            name="fullname"
            onChange={e => setFullName(e.currentTarget.value)}
          />
        </Col>
        <Col md={6}>
          <XForm.Text
            label="Fullname in english"
            value={fullnameEn}
            name="fullnameEn"
            onChange={e => setFullNameEn(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Select
            label="Gender"
            value={gender}
            name="gender"
            items={[
              { text: 'Male', value: 'ប្រុស' },
              { text: 'Female', value: 'ស្រី' },
            ]}
            onChange={e => setGender(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Officer Id"
            value={officerId}
            name="officerId"
            onChange={e => setOfficerId(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Province"
            value={province}
            name="province"
            onChange={e => setProvince(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="District"
            value={district}
            name="district"
            onChange={e => setDistrict(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Commune"
            value={commune}
            name="commune"
            onChange={e => setCommune(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Village or Group"
            value={villageOrGroup}
            name="villageOrGroup"
            onChange={e => setVillageOrGroup(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Education Level"
            value={educationLevel}
            name="educationLevel"
            onChange={e => setEducationLevel(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text label="Unit" value={unit} name="unit" onChange={e => setUnit(e.currentTarget.value)} />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Nationality"
            value={unit}
            name="nationality"
            onChange={e => setNationality(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="National Id"
            value={nationalId}
            name="nationalId"
            onChange={e => setNationalId(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Passport Id"
            value={passportId}
            name="passportId"
            onChange={e => setPassportId(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Position Level"
            value={positionLevel}
            name="positionLevel"
            onChange={e => setPositionLevel(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Position Description"
            value={positionDescription}
            name="positionDescription"
            onChange={e => setPositionDescription(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="General Department"
            value={generalDepartmentId}
            name="generalDepartmentId"
            onChange={e => setGeneralDepartmentId(e.currentTarget.value)}
          />
        </Col>
        <Col md={6}>
          <XForm.Text
            label="Department"
            value={departmentId}
            name="departmentId"
            onChange={e => setDepartmentId(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Office"
            value={officeId}
            name="officeId"
            onChange={e => setOfficeId(e.currentTarget.value)}
          />
        </Col>
      </Row>
      <Row>
        <h4>Contact Information</h4>
        <hr />

        <Col md={6}>
          <XForm.Text
            label="Contact City or Province"
            value={contactCityOrProvince}
            name="contactCityOrProvince"
            onChange={e => setContactCityOrProvince(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Contact District"
            value={contactDistrict}
            name="contactDistrict"
            onChange={e => setContactDistrict(e.currentTarget.value)}
          />
        </Col>
        <Col md={6}>
          <XForm.Text
            label="Contact Village"
            value={contactVillage}
            name="contactVillage"
            onChange={e => setContactVillage(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Contact Commune"
            value={contactCommune}
            name="contactCommune"
            onChange={e => setContactCommune(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text label="Home No" value={homeNo} name="homeNo" onChange={e => setHomeNo(e.currentTarget.value)} />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Street No"
            value={streetNo}
            name="streetNo"
            onChange={e => setStreetNo(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Phone number"
            value={phoneNumber}
            name="phoneNumber"
            onChange={e => setPhoneNumber(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text label="Email" value={email} name="email" onChange={e => setEmail(e.currentTarget.value)} />
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col md={6}>
          <XForm.Footer>
            <XForm.Button type="submit">Save</XForm.Button>
          </XForm.Footer>
        </Col>
      </Row>
    </Form>
  );
};

type Props = {
  userEditId?: number;
};

export function CreateHrEmployeeScreen({ userEditId }: Props) {
  const router = useRouter();

  console.log(userEditId);
  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb breadcrumbItem="Create Hr Employee" title={setting.title} />
          <hr />
          <Row>
            <Col md={9}>
              <Card>
                <CardBody>
                  <CreateUpdateForm
                    body={!userEditId ? FormBodyCreate : FormBodyEdit}
                    update={UPDATE_MUTATION}
                    create={CREATE_MUTATION}
                    query={QUERY}
                    id={Number(userEditId)}
                    refectQuery="hrEmployee"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
