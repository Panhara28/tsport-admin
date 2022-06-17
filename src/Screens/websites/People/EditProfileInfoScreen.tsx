import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { Button, Form, Modal, Tab, Tabs } from 'react-bootstrap';
import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../../components/Common/Breadcrumb';
import XForm from '../../../components/Form/XForm';
import { CreateUpdateForm } from '../../../components/GraphQL/CreateUpdateForm';
import Layout from '../../../components/VerticalLayout';
import { WebsiteSettingSidebar } from '../WebsiteSettingSidebar';
import style from './people.module.scss';
import Select from 'react-select';
import { getCommune, getDistrict, getProvince, getVillage } from '../../../hook/provinces';
import CreatableSelect from 'react-select/creatable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parseImageUrl } from '../../../hook/parseImageUrl';
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { SignleImageUpload } from '../../../components/SignleImageUpload';
import { MediaListByWebsite } from '../../../components/Media/MediaListByWebsite';
import AuthContext from '../../../components/Authentication/AuthContext';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { ProfileUpload } from '../../../components/ProfileUpload';
import { setting } from '../../../libs/settings';

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-bottom-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '2000',
  hideDuration: '2000',
  timeOut: '2000',
  extendedTimeOut: '2000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

const UPDATE_MUTATION = gql`
  mutation adminUpdateUser($id: Int!, $input: UserInput) {
    adminUpdateUser(id: $id, input: $input)
  }
`;

const QUERY = gql`
  query adminUserDetail($id: Int!) {
    adminUserDetail(id: $id) {
      id
      fullname
      username
      nationality
      fullname_en
      dob
      homeNo
      streetNo
      contact_village
      contact_district
      contact_commune
      contact_city_or_province
      phoneNumber
      email
      profile_picture
    }
  }
`;

type Props = {
  peopleEditId?: number;
};

const FormBodyEdit = ({ update, defaultValues }: any) => {
  const [fullname, setFullName] = useState(defaultValues?.fullname || '');
  const [username, setUsername] = useState(defaultValues?.username || '');
  const [nationality, setNationality] = useState(defaultValues?.nationality || '');
  const [fullname_en, setFullNameEn] = useState(defaultValues?.fullname_en || '');
  const [dob, setDob] = useState(defaultValues?.dob || '');
  const [home_no, setHomeNo] = useState(defaultValues?.homeNo || '');
  const [street_no, setStreetNo] = useState(defaultValues?.streetNo || '');

  const [selectImage, setSelectImage] = useState(undefined);
  const [firstFeaturedImage, setFirstFeaturedImage]: any = useState(undefined);
  const [key, setKey] = useState('media');
  const [finaleSelected, setFinaleSelected]: any = useState(defaultValues?.profile_picture || undefined);
  const [lgShow, setLgShow] = useState(false);
  const [thumbnail, setThumbnail]: any = useState(undefined);
  const [selectedImage, setSelectedImage]: any = useState(defaultValues?.profile_picture || undefined);
  const router = useRouter();

  const [profile, setProfile] = useState(undefined);

  const [selectContactProvince, setSelectContactProvince] = useState<any>(
    defaultValues?.contact_city_or_province
      ? {
          label: defaultValues?.contact_city_or_province,
          value: defaultValues?.contact_city_or_province,
        }
      : undefined,
  );
  const [selectContactDistrict, setSelectContactDistrict] = useState<any>(
    defaultValues?.contact_district
      ? { label: defaultValues?.contact_district, value: defaultValues?.contact_district }
      : undefined,
  );
  const [selectContactCommune, setSelectContactCommune] = useState<any>(
    defaultValues?.contact_commune
      ? { label: defaultValues?.contact_commune, value: defaultValues?.contact_commune }
      : undefined,
  );
  const [selectContactVillage, setSelectContactVillage] = useState<any>(
    defaultValues?.contact_village
      ? { label: defaultValues?.contact_village, value: defaultValues?.contact_village }
      : undefined,
  );

  // if (loading || !data) return <div>Loading...</div>;
  const onSave = (e: any) => {
    e.preventDefault();

    const x: any = e.target;

    const input = {
      username: username,
      fullname: fullname,
      fullname_en: fullname_en,
      gender: x.gender?.value,
      nationality: x.nationality?.value,
      dob: x.dob?.value,
      email: x.email?.value,
      phoneNumber: x.phoneNumber?.value,
      homeNo: x.homeNo?.value,
      streetNo: x.streetNo?.value,
      contact_city_or_province: selectContactProvince
        ? selectContactProvince.label
        : defaultValues?.contact_city_or_province,
      contact_district: selectContactDistrict ? selectContactDistrict.label : defaultValues?.contact_district,
      contact_commune: selectContactCommune ? selectContactCommune.label : defaultValues?.contact_commune,
      contact_village: selectContactVillage ? selectContactVillage.label : defaultValues?.contact_village,
      profile_picture: finaleSelected,
    };

    update({
      ...input,
    });
  };

  const renderFeaturedImage = finaleSelected ? (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          backgroundColor: 'unset',
          flexDirection: 'row',
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 999,
        }}
        onClick={() => {
          setFinaleSelected(undefined);
        }}
      >
        <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} className="text-danger mb-3" />
      </div>
      <div>
        {finaleSelected?.featureImage ? (
          <Image
            src={parseImageUrl(finaleSelected?.featureImage, '500x500')}
            alt=""
            layout="responsive"
            width={130}
            height={130}
          />
        ) : finaleSelected ? (
          <Image src={parseImageUrl(finaleSelected, '500x500')} alt="" layout="responsive" width={100} height={100} />
        ) : (
          undefined
        )}
      </div>
    </div>
  ) : (
    <div className={style.newsFeatureImageContainer} style={{ height: '90%' }} onClick={() => setLgShow(true)}>
      {/* <div className={style.newsFeatureImageIcon}> */}
      {/* <FontAwesomeIcon icon={faImage} /> */}
      <ProfileUpload
        setImage={setFinaleSelected}
        setKey={setKey}
        height="100%"
        width="100%"
        setFirstFeaturedImage={setFirstFeaturedImage}
        setSelectImage={setSelectedImage}
      />
      {/* </div> */}
    </div>
  );

  return (
    <Form onSubmit={onSave}>
      <Row>
        <h4>Profile</h4>
        <div style={{ width: 140, height: 140 }}>{renderFeaturedImage}</div>
      </Row>

      <Row className="mt-4">
        <h4>Security Info</h4>
        <Col md={6}>
          <XForm.Text label="Username" value={username} onChange={e => setUsername(e.currentTarget.value)} />
        </Col>
      </Row>
      <Row>
        <h4>User Info</h4>
        <hr />
        <Col md={6}>
          <XForm.Text label="Fullname" value={fullname} onChange={e => setFullName(e.currentTarget.value)} />
        </Col>

        <Col md={6}>
          <Form.Label className={`${style.label_theme}`}>Gender</Form.Label>
          <Form.Select aria-label="Default select example" name="gender" className={`${style.select_theme}`}>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </Form.Select>
        </Col>

        <Col md={6}>
          <XForm.Text
            label="National"
            name="nationality"
            value={nationality}
            onChange={e => setNationality(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Fullname Latin"
            name="namelatin"
            value={fullname_en}
            onChange={e => setFullNameEn(e.currentTarget.value)}
          />
        </Col>

        <Col md={6} className="mb-4">
          <Form.Group>
            <Form.Label className={`${style.label_theme}`}>Date of Birth</Form.Label>
            <input
              type="date"
              name="dob"
              min="1000-01-01"
              max="3000-01-01"
              className={`form-control ${style.select_theme}`}
              value={dob}
              onChange={e => setDob(e.currentTarget.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <h4>Contact Info</h4>

        <Col md={6}>
          <XForm.Text
            label="HomeNo"
            type="text"
            name="homeNo"
            className="form-control"
            value={home_no}
            onChange={e => setHomeNo(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="StreetNo"
            type="text"
            name="streetNo"
            value={street_no}
            onChange={e => setStreetNo(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <Form.Label className={`${style.label_theme}`}>Capital City/Province</Form.Label>
          <Form.Group>
            <Select
              options={getProvince()}
              name="province"
              className={`${style.select_theme}`}
              onChange={e => setSelectContactProvince(e)}
              value={selectContactProvince}
              // defaultValue={{
              //   value: data.provinceList.filter((item: any) => item.id === data.user.province_id)[0]?.id,
              //   label: data.provinceList.filter((item: any) => item.id === data.user.province_id)[0]?.name,
              // }}
            />
          </Form.Group>
        </Col>

        {selectContactProvince ? (
          <Col md={6}>
            <Form.Group>
              <Form.Label className={`${style.label_theme}`}>District/City/Khan</Form.Label>
              <CreatableSelect
                options={getDistrict(
                  selectContactProvince.value ? selectContactProvince.value : defaultValues?.contact_city_or_province,
                )}
                onChange={e => setSelectContactDistrict(e)}
                value={selectContactDistrict}
                className={`${style.select_theme}`}
                name="district"
              />
            </Form.Group>
          </Col>
        ) : (
          ''
        )}

        {selectContactDistrict ? (
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label className={`${style.label_theme}`}>Commune/Sangkat</Form.Label>
              <CreatableSelect
                options={getCommune(
                  selectContactDistrict.value ? selectContactDistrict.value : defaultValues.contact_district,
                )}
                onChange={e => setSelectContactCommune(e)}
                value={selectContactCommune}
                className={`${style.select_theme}`}
                name="commune"
              />
            </Form.Group>
          </Col>
        ) : (
          ''
        )}

        {selectContactCommune ? (
          <Col md={6}>
            <Form.Group>
              <Form.Label className={`${style.label_theme}`}>Village/Group</Form.Label>
              <CreatableSelect
                options={getVillage(
                  selectContactCommune.value ? selectContactCommune.value : defaultValues?.contact_commune,
                )}
                onChange={e => setSelectContactVillage(e)}
                value={selectContactVillage}
                className={`${style.select_theme}`}
                name="contact_village"
              />
            </Form.Group>
          </Col>
        ) : (
          ''
        )}

        <Col md={6}>
          <XForm.Text
            label="Phone Number"
            type="text"
            name="phoneNumber"
            placeholder="Example: 095477325"
            defaultValue={defaultValues?.phoneNumber}
          />
        </Col>

        <Col md={6}>
          <XForm.Text label="Email (If any)" type="text" name="email" defaultValue={defaultValues?.email} />
        </Col>
      </Row>

      <Row>
        <Col>
          <XForm.Footer>
            <XForm.Button type="submit">Save</XForm.Button>
          </XForm.Footer>
        </Col>
      </Row>
    </Form>
  );
};

export default function EditProfileInfoScreen({ peopleEditId }: Props) {
  const router = useRouter();
  const { me } = useContext(AuthContext);

  const [updateProfile] = useMutation(UPDATE_MUTATION, {
    onCompleted: data => {
      if (data) {
        toastr.success('Profile Updated!');
      }
    },
  });

  const update = (input: any) => {
    updateProfile({
      variables: {
        input,
        id: me?.id,
      },
    });
  };

  const { data, loading } = useQuery(QUERY, {
    variables: {
      id: me?.id,
    },
  });

  if (!data || loading) return <></>;

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title={setting.title} breadcrumbItem="Edit Info" />
          <hr />
          <Row>
            <Col md={9}>
              <Card>
                <CardBody>
                  <FormBodyEdit defaultValues={data?.adminUserDetail} update={update} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
