import { gql } from 'apollo-boost';
import React, { useState } from 'react';
import { Form } from 'reactstrap';
import { Label } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Card } from 'reactstrap';
import { TsContent } from '../../components/Custom/TsContent';
import XForm from '../../components/Form/XForm';
import { CreateUpdateForm, CreateUpdateProps } from '../../components/GraphQL/CreateUpdateForm';
import { SingleUpload } from '../../components/SingleUpload';

const CREATE = gql`
  mutation createCustomer($input: CustomerInput) {
    createCustomer(data: $input)
  }
`;

const UPDATE = gql`
  mutation updateCustomer($input: CustomerInput, $id: Int) {
    updateCustomer(data: $input, id: $id)
  }
`;

const QUERY = gql`
  query customerById($id: Int!) {
    customerById(id: $id) {
      id
      fullname
      phone
      address
      profile
      type
      username
      discount
    }
  }
`;

const FormBody = ({ isEditingMode, update, defaultValues }: CreateUpdateProps<any, any>) => {
  const [fullname, setFullname] = useState(defaultValues.fullname);
  const [phone, setPhone] = useState(defaultValues.phone);
  const [address, setAddress] = useState(defaultValues.address);
  const [username, setUsername] = useState(defaultValues.fullname);
  const [password, setPassword] = useState(defaultValues.password);
  const [type, setType] = useState(defaultValues.type || 'default');
  const [discount, setDiscount] = useState(defaultValues.discount || 0);
  const [profile, setProfile] = useState(defaultValues.profile);

  const onHandleSubmit = (e: any) => {
    e.preventDefault();

    if (isEditingMode) {
      update({
        input: {
          fullname,
          phone,
          address,
          type,
          discount: type === 'default' ? 0 : Number(discount),
          profile,
        },
      });
    } else {
      update({
        fullname,
        phone,
        address,
        username,
        password,
        type,
        discount: type === 'default' ? 0 : Number(discount),
        profile,
      });
    }
  };

  return (
    <Form onSubmit={onHandleSubmit}>
      <XForm.Group label="Information">
        <div>
          <Label>Profile Picture</Label>
          <SingleUpload image={profile} setImage={setProfile} width="175" height="175" />
        </div>
        <br />
        <div className="row">
          <div className="col-md-6">
            <XForm.Text
              label="Fullname"
              placeholder="Enter your name"
              value={fullname}
              onChange={e => setFullname(e.currentTarget.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <XForm.Text
              label="Phonenumber"
              placeholder="Enter your phonenumber"
              value={phone}
              onChange={e => setPhone(e.currentTarget.value)}
              required
            />
          </div>
          <XForm.TextArea
            label="Address"
            placeholder="Enter address"
            value={address}
            onChange={e => setAddress(e.currentTarget.value)}
          />
        </div>
      </XForm.Group>
      {!isEditingMode && (
        <XForm.Group label="Authentication">
          <XForm.Inline>
            <div className="row">
              <div className="col-md-6">
                <XForm.Text
                  required
                  label="Username (@)"
                  value={username}
                  onChange={e => setUsername(e.currentTarget.value)}
                />
                <small className="text-danger">Username required @ (Ex: sample@customer.com)</small>
              </div>
              <div className="col-md-6">
                <XForm.Text
                  label="Password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.currentTarget.value)}
                  required
                />
              </div>
            </div>
          </XForm.Inline>
        </XForm.Group>
      )}
      <XForm.Group label="">
        <div className="row">
          <div className="col-md-6">
            <XForm.Select
              label="Customer Type"
              value={type}
              onChange={e => setType(e.currentTarget.value)}
              items={[
                {
                  text: 'Default',
                  value: 'default',
                },
                {
                  text: 'Premium',
                  value: 'premium',
                },
              ]}
            />
          </div>
          <div className="col-md-6">
            {type === 'premium' && (
              <XForm.Text
                type="number"
                label="Discount (%)"
                placeholder="Enter discount"
                value={discount}
                onChange={e => setDiscount(e.currentTarget.value)}
                required={type !== 'default'}
              />
            )}
          </div>
        </div>
      </XForm.Group>
      <XForm.Button>Save</XForm.Button>
    </Form>
  );
};

export function FormCustomerScreen({ id }: { id?: number }) {
  return (
    <TsContent title={id ? 'Edit customer' : 'Register new customer'}>
      <div className="row">
        <div className="col-md-6">
          <Card>
            <CardBody>
              <CreateUpdateForm
                body={FormBody}
                query={QUERY}
                create={CREATE}
                update={UPDATE}
                id={id}
                refectQuery={'customerById, customerList'}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </TsContent>
  );
}
