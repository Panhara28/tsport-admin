import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
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

const CREATE_MUTATION = gql`
  mutation adminCreateUser($input: UserInput) {
    adminCreateUser(input: $input)
  }
`;

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
    }
  }
`;

type Props = {
  peopleEditId?: number;
};

function FormBodyCreate({ update, defaultValues }: any) {
  const [fullname, setFullName] = useState(defaultValues?.fullname || '');
  const [username, setUsername] = useState(defaultValues?.username || '');
  const [password, setPassword] = useState(defaultValues?.password || '');

  const onSave = () => {
    update({
      fullname,
      username,
      password,
    });
  };

  return (
    <>
      <Row>
        <h4>Security Info</h4>
        <hr />
        <Col md={6}>
          <XForm.Text label="Username" value={username} onChange={e => setUsername(e.currentTarget.value)} />
        </Col>
        <Col md={6}>
          <XForm.Text
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          />
        </Col>
      </Row>
      <Row>
        <h4>User Info</h4>
        <hr />
        <Col md={6}>
          <XForm.Text label="Fullname" value={fullname} onChange={e => setFullName(e.currentTarget.value)} />
        </Col>
      </Row>
      <Row>
        <Col>
          <XForm.Footer>
            <XForm.Button onClick={onSave}>Save</XForm.Button>
          </XForm.Footer>
        </Col>
      </Row>
    </>
  );
}

const FormBodyEdit = ({ update, defaultValues }: any) => {
  const [fullname, setFullName] = useState(defaultValues?.fullname || '');
  const [username, setUsername] = useState(defaultValues?.username || '');
  const [password, setPassword] = useState(defaultValues?.password || '');

  const onSave = () => {
    update({
      fullname,
      username,
      password,
    });
  };

  const router = useRouter();

  const [profile, setProfile] = useState(undefined);

  const [selectContactProvince, setSelectContactProvince] = useState<any>(undefined);
  const [selectContactDistrict, setSelectContactDistrict] = useState<any>(undefined);
  const [selectContactCommune, setSelectContactCommune] = useState<any>(undefined);
  const [selectContactVillage, setSelectContactVillage] = useState<any>(undefined);

  return (
    <>
      <Row>
        <h4>Security Info</h4>
        <Col md={6}>
          <XForm.Text label="Username" value={username} onChange={e => setUsername(e.currentTarget.value)} />
        </Col>
        <Col md={6}>
          <XForm.Text
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          />
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
          <Form.Select aria-label="Default select example" className={`${style.select_theme}`}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Select>
        </Col>

        <Col md={6}>
          <XForm.Text
            label="National"
            name="nationality"
            // value=""
            // onChange={e => setFullName(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Fullname Latin"
            name="namelatin"
            // value=""
            // onChange={e => setFullName(e.currentTarget.value)}
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
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <h4>Contact Info</h4>
        <Col md={6}>
          <XForm.Text
            label="Current Address"
            // value={currentaddress}
            // onChange={e => setCurrentAddress(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="HomeNo"
            type="text"
            name="homeNo"
            className="form-control"
            // value=""
            // onChange={e => setPassword(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="StreetNo"
            type="text"
            name="streetNo"
            // value=""
            // onChange={e => setPassword(e.currentTarget.value)}
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
            />
          </Form.Group>
        </Col>

        {selectContactProvince ? (
          <Col md={6}>
            <Form.Group>
              <Form.Label className={`${style.label_theme}`}>District/City/Khan</Form.Label>
              <CreatableSelect
                options={getDistrict(selectContactProvince.value)}
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
                options={getCommune(selectContactDistrict.value)}
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
                options={getVillage(selectContactCommune.value)}
                onChange={e => setSelectContactVillage(e)}
                value={selectContactVillage}
                className={`${style.select_theme}`}
                name="village"
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
            // value=""
            // onChange={e => setPassword(e.currentTarget.value)}
          />
        </Col>

        <Col md={6}>
          <XForm.Text
            label="Email (If any)"
            type="text"
            name="email"
            // value=""
            // onChange={e => setPassword(e.currentTarget.value)}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <XForm.Footer>
            <XForm.Button onClick={onSave}>Save</XForm.Button>
          </XForm.Footer>
        </Col>
      </Row>
    </>
  );
};

export function EditPeopleInfoScreen({ peopleEditId }: Props) {
  const router = useRouter();
  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="Edit Info" />
          <hr />
          <Row>
            <Col md={3} style={{ borderRight: '1px solid #ccc', height: '100vh' }}>
              <WebsiteSettingSidebar />
            </Col>
            <Col md={9}>
              <Card>
                <CardBody>
                  <CreateUpdateForm
                    body={!peopleEditId ? FormBodyCreate : FormBodyEdit}
                    update={UPDATE_MUTATION}
                    create={CREATE_MUTATION}
                    query={QUERY}
                    id={Number(peopleEditId)}
                    createReturned={`/mochub/websites/${router.query.id}/add-people`}
                    refectQuery="userList"
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
