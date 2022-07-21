import { gql, useQuery } from '@apollo/client';
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
import { getCommune, getDistrict, getProvince, getVillage } from '../../hook/provinces';
import { setting } from '../../libs/settings';
import CreatableSelect from 'react-select/creatable';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

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

const HR_DEPARTMENT = gql`
  query hrDepartmentList($branch_level: Int, $parent_id: Int) {
    hrDepartmentList(branch_level: $branch_level, parent_id: $parent_id)
  }
`;

const GeneralDepartmentSelect = ({ generalDepartmentId, setGeneralDepartmentId }: any) => {
  const { data, loading } = useQuery(HR_DEPARTMENT, {
    variables: {
      branch_level: 0,
    },
  });

  if (!data || loading) return <></>;

  return (
    <XForm.Select
      label="Select General Department"
      value={generalDepartmentId}
      items={[
        {
          text: 'Choose one of the following',
          value: undefined,
        },
        ...data?.hrDepartmentList?.map((x: any) => {
          return {
            text: x?.name,
            value: x?.id,
          };
        }),
      ]}
      onChange={(e: any) => setGeneralDepartmentId(e.target.value)}
    />
  );
};

const DepartmentSelect = ({ generalDepartmentId, departmentId, setDepartmentId }: any) => {
  const { data, loading } = useQuery(HR_DEPARTMENT, {
    variables: {
      branch_level: 1,
      parent_id: Number(generalDepartmentId),
    },
  });

  if (!data || loading) return <></>;

  return (
    <XForm.Select
      label="Select Department"
      value={departmentId}
      onChange={(e: any) => setDepartmentId(e?.target?.value)}
      items={[
        {
          text: 'Choose one of the following',
          value: undefined,
        },
        ...data?.hrDepartmentList?.map((x: any) => {
          return {
            text: x?.name,
            value: x?.id,
          };
        }),
      ]}
    />
  );
};

const OfficeSelect = ({ departmentId, officeId, setOfficeId }: any) => {
  const { data, loading } = useQuery(HR_DEPARTMENT, {
    variables: {
      branch_level: 2,
      parent_id: Number(departmentId),
    },
  });

  if (!data || loading) return <></>;

  return (
    <XForm.Select
      label="Select Office"
      value={officeId}
      onChange={(e: any) => setOfficeId(e.target.value)}
      items={[
        {
          text: 'Choose one of the following',
          value: undefined,
        },
        ...data?.hrDepartmentList?.map((x: any) => {
          return {
            text: x?.name,
            value: x?.id,
          };
        }),
      ]}
    />
  );
};

const FormBodyCreate = ({ update, defaultValues }: any) => {
  const [fullname, setFullName] = useState(defaultValues?.fullname || '');
  const [fullnameEn, setFullNameEn] = useState(defaultValues?.fullname_en || '');
  const [username, setUsername] = useState(defaultValues?.username || '');
  const [password, setPassword] = useState(defaultValues?.password || '');
  const [email, setEmail] = useState(defaultValues?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(defaultValues?.phoneNumber || '');
  const [image, setImage] = useState(defaultValues?.profile || '');
  const [gender, setGender] = useState(defaultValues?.gender || '');
  const [nationality, setNationality] = useState(defaultValues?.nationality || '');
  const [dob, setDob] = useState<any>(defaultValues?.dob ? new Date(defaultValues?.dob) : new Date());
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
      dob: dob ? moment(dob).format('YYYY-MM-DD') : '',
      district: district?.label,
      commune: commune?.label,
      education_level: educationLevel,
      passport_id: passportId,
      national_id: nationalId,
      position_level: positionLevel,
      position_description: positionDescription,
      unit: unit,
      department_id: Number(departmentId),
      general_department_id: Number(generalDepartmentId),
      province: province?.label,
      homeNo: homeNo,
      streetNo: streetNo,
      contact_city_or_province: contactCityOrProvince?.label,
      village_or_group: villageOrGroup?.label,
      contact_district: contactDistrict?.label,
      contact_village: contactVillage?.label,
      contact_commune: contactCommune?.label,
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
          <Form.Label>Date of Birth</Form.Label>
          <DatePicker
            selected={dob}
            onChange={(date: Date) => {
              setDob(date);
            }}
            className="form-control"
            dateFormat="dd/MM/yyyy"
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
          <Form.Group>
            <Form.Label>Province</Form.Label>
            <CreatableSelect
              options={getProvince()}
              onChange={(e: any) => setProvince(e)}
              value={province}
              name="province"
            />
          </Form.Group>
        </Col>

        {province ? (
          <Col md={6}>
            <Form.Group>
              <Form.Label>District</Form.Label>
              <CreatableSelect
                options={getDistrict(province.value)}
                onChange={(e: any) => setDistrict(e)}
                value={district}
                name="district"
              />
            </Form.Group>
          </Col>
        ) : (
          undefined
        )}

        {district ? (
          <Col md={6} className="mt-2">
            <Form.Group>
              <Form.Label>Commune</Form.Label>
              <CreatableSelect
                options={getCommune(district.value)}
                onChange={(e: any) => setCommune(e)}
                value={commune}
                name="commune"
              />
            </Form.Group>
          </Col>
        ) : (
          undefined
        )}

        {commune ? (
          <Col md={6} className="mt-2">
            <Form.Group>
              <Form.Label>Village</Form.Label>
              <CreatableSelect
                options={getVillage(commune.value)}
                onChange={(e: any) => setVillageOrGroup(e)}
                value={villageOrGroup}
                name="village"
              />
            </Form.Group>
          </Col>
        ) : (
          undefined
        )}

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
            value={nationality}
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
          <GeneralDepartmentSelect
            generalDepartmentId={generalDepartmentId}
            setGeneralDepartmentId={setGeneralDepartmentId}
          />
        </Col>
        <Col md={6}>
          <DepartmentSelect
            departmentId={departmentId}
            setDepartmentId={setDepartmentId}
            generalDepartmentId={generalDepartmentId}
          />
        </Col>

        <Col md={6}>
          <OfficeSelect officeId={officeId} setOfficeId={setOfficeId} departmentId={departmentId} />
        </Col>
      </Row>
      <Row>
        <h4>Contact Information</h4>
        <hr />

        <Col md={6}>
          <Form.Group>
            <Form.Label>Contact City or Province</Form.Label>
            <CreatableSelect
              options={getProvince()}
              onChange={(e: any) => setContactCityOrProvince(e)}
              value={contactCityOrProvince}
              name="contactCityOrProvince"
            />
          </Form.Group>
        </Col>

        {contactCityOrProvince ? (
          <Col md={6}>
            <Form.Group>
              <Form.Label>Contact District</Form.Label>
              <CreatableSelect
                options={getDistrict(contactCityOrProvince.value)}
                onChange={(e: any) => setContactDistrict(e)}
                value={contactDistrict}
                name="contactDistrict"
              />
            </Form.Group>
          </Col>
        ) : (
          undefined
        )}

        {contactDistrict ? (
          <Col md={6} className="mt-2">
            <Form.Group>
              <Form.Label>Contact Commune</Form.Label>
              <CreatableSelect
                options={getCommune(contactDistrict.value)}
                onChange={(e: any) => setContactCommune(e)}
                value={contactCommune}
                name="contactCommune"
              />
            </Form.Group>
          </Col>
        ) : (
          undefined
        )}

        {contactCommune ? (
          <Col md={6} className="mt-2">
            <Form.Group>
              <Form.Label>Contact Village</Form.Label>
              <CreatableSelect
                options={getVillage(contactCommune.value)}
                onChange={(e: any) => setContactVillage(e)}
                value={contactVillage}
                name="contactVillage"
              />
            </Form.Group>
          </Col>
        ) : (
          undefined
        )}

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
  const [image, setImage] = useState(defaultValues?.profile || '');
  const [gender, setGender] = useState(defaultValues?.gender || '');
  const [nationality, setNationality] = useState(defaultValues?.nationality || '');
  const [dob, setDob] = useState<any>(defaultValues?.dob ? new Date(defaultValues?.dob) : new Date());
  const [district, setDistrict] = useState({ label: defaultValues?.district, value: '' } || '');
  const [commune, setCommune] = useState({ label: defaultValues?.commune, value: '' } || '');
  const [educationLevel, setEducationLevel] = useState(defaultValues?.education_level || '');
  const [passportId, setPassportId] = useState(defaultValues?.passport_id || '');
  const [nationalId, setNationalId] = useState(defaultValues?.national_id || '');
  const [positionLevel, setPositionLevel] = useState(defaultValues?.position_level || '');
  const [positionDescription, setPositionDescription] = useState(defaultValues?.position_description || '');
  const [unit, setUnit] = useState(defaultValues?.unit || '');
  const [departmentId, setDepartmentId] = useState(defaultValues?.department_id || '');
  const [generalDepartmentId, setGeneralDepartmentId] = useState(defaultValues?.general_department_id || '');
  const [contactCityOrProvince, setContactCityOrProvince] = useState(
    { label: defaultValues?.contact_city_or_province, value: '' } || '',
  );
  const [province, setProvince] = useState({ label: defaultValues?.province, value: '' } || '');
  const [homeNo, setHomeNo] = useState(defaultValues?.homeNo || '');
  const [streetNo, setStreetNo] = useState(defaultValues?.streetNo || '');
  const [villageOrGroup, setVillageOrGroup] = useState({ label: defaultValues?.village_or_group, value: '' } || '');
  const [contactDistrict, setContactDistrict] = useState({ label: defaultValues?.contact_district, value: '' } || '');
  const [contactVillage, setContactVillage] = useState({ label: defaultValues?.contact_village, value: '' } || '');
  const [contactCommune, setContactCommune] = useState({ label: defaultValues?.contact_commune, value: '' } || '');
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
      dob: dob ? moment(dob).format('YYYY-MM-DD') : '',
      district: district?.label,
      commune: commune?.label,
      education_level: educationLevel,
      passport_id: passportId,
      national_id: nationalId,
      position_level: positionLevel,
      position_description: positionDescription,
      unit: unit,
      department_id: Number(departmentId),
      general_department_id: Number(generalDepartmentId),
      province: province?.label,
      homeNo: homeNo,
      streetNo: streetNo,
      contact_city_or_province: contactCityOrProvince?.label,
      village_or_group: villageOrGroup?.label,
      contact_district: contactDistrict?.label,
      contact_village: contactVillage?.label,
      contact_commune: contactCommune?.label,
      officer_id: officerId,
      office_id: Number(officeId),
    };

    update({
      input: input,
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
          <Form.Label>Date of Birth</Form.Label>
          <DatePicker
            selected={dob}
            onChange={(date: Date) => {
              setDob(date);
            }}
            className="form-control"
            dateFormat="dd/MM/yyyy"
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
          <Form.Group>
            <Form.Label>Province</Form.Label>
            <CreatableSelect
              options={getProvince()}
              onChange={(e: any) => setProvince(e)}
              value={province}
              name="province"
            />
          </Form.Group>
        </Col>

        {province ? (
          <Col md={6}>
            <Form.Group>
              <Form.Label>District</Form.Label>
              <CreatableSelect
                options={getDistrict(province.value)}
                onChange={(e: any) => setDistrict(e)}
                value={district}
                name="district"
              />
            </Form.Group>
          </Col>
        ) : (
          undefined
        )}

        {district ? (
          <Col md={6} className="mt-2">
            <Form.Group>
              <Form.Label>Commune</Form.Label>
              <CreatableSelect
                options={getCommune(district.value)}
                onChange={(e: any) => setCommune(e)}
                value={commune}
                name="commune"
              />
            </Form.Group>
          </Col>
        ) : (
          undefined
        )}

        {commune ? (
          <Col md={6} className="mt-2">
            <Form.Group>
              <Form.Label>Village</Form.Label>
              <CreatableSelect
                options={getVillage(commune.value)}
                onChange={(e: any) => setVillageOrGroup(e)}
                value={villageOrGroup}
                name="village"
              />
            </Form.Group>
          </Col>
        ) : (
          undefined
        )}

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
            value={nationality}
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
          <GeneralDepartmentSelect
            generalDepartmentId={generalDepartmentId}
            setGeneralDepartmentId={setGeneralDepartmentId}
          />
        </Col>
        <Col md={6}>
          <DepartmentSelect
            departmentId={departmentId}
            setDepartmentId={setDepartmentId}
            generalDepartmentId={generalDepartmentId}
          />
        </Col>

        <Col md={6}>
          <OfficeSelect officeId={officeId} setOfficeId={setOfficeId} departmentId={departmentId} />
        </Col>
      </Row>
      <Row>
        <h4>Contact Information</h4>
        <hr />

        <Col md={6}>
          <Form.Group>
            <Form.Label>Contact City or Province</Form.Label>
            <CreatableSelect
              options={getProvince()}
              onChange={(e: any) => setContactCityOrProvince(e)}
              value={contactCityOrProvince}
              name="contactCityOrProvince"
            />
          </Form.Group>
        </Col>

        {contactCityOrProvince ? (
          <Col md={6}>
            <Form.Group>
              <Form.Label>Contact District</Form.Label>
              <CreatableSelect
                options={getDistrict(contactCityOrProvince.value)}
                onChange={(e: any) => setContactDistrict(e)}
                value={contactDistrict}
                name="contactDistrict"
              />
            </Form.Group>
          </Col>
        ) : (
          undefined
        )}

        {contactDistrict ? (
          <Col md={6} className="mt-2">
            <Form.Group>
              <Form.Label>Contact Commune</Form.Label>
              <CreatableSelect
                options={getCommune(contactDistrict.value)}
                onChange={(e: any) => setContactCommune(e)}
                value={contactCommune}
                name="contactCommune"
              />
            </Form.Group>
          </Col>
        ) : (
          undefined
        )}

        {contactCommune ? (
          <Col md={6} className="mt-2">
            <Form.Group>
              <Form.Label>Contact Village</Form.Label>
              <CreatableSelect
                options={getVillage(contactCommune.value)}
                onChange={(e: any) => setContactVillage(e)}
                value={contactVillage}
                name="contactVillage"
              />
            </Form.Group>
          </Col>
        ) : (
          undefined
        )}

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

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb breadcrumbItem={`Officer ${userEditId ? 'Edit' : 'Create'}`} title={setting.title} />
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
                    refectQuery="adminUserList"
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
