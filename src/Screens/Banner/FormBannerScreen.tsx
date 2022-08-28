import { useMutation, useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import React, { useState } from 'react';
import { Label } from 'reactstrap';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Form } from 'reactstrap';
import { TsContent } from '../../components/Custom/TsContent';
import XForm from '../../components/Form/XForm';
import { SingleUpload } from '../../components/SingleUpload';
import toastr from 'toastr';

const QUERY = gql`
  query banner($id: Int!) {
    banner(id: $id)
  }
`;

const UPDATE = gql`
  mutation updateBanner($id: Int!, $data: BannerInput) {
    updateBanner(id: $id, data: $data)
  }
`;

export function FormBannerScreen({ id }: { id?: number }) {
  const [image, setImage] = useState('');
  const [updateBanner] = useMutation(UPDATE, {
    onCompleted: res => {
      if (res.updateBanner) {
        toastr.success('Banner was save');
      } else {
        toastr.error('Banner was cannnot save');
      }
    },
    onError: err => {
      toastr.error(err.message);
    },
    refetchQueries: ['banner', 'bannerList'],
  });
  const { data } = useQuery(QUERY, {
    variables: {
      id: Number(id),
    },
    skip: !id,
    onCompleted: res => {
      if (res) {
        setImage(res.banner.image);
      }
    },
  });

  const onHandleSubmit = (e: any) => {
    e.preventDefault();
    const x = e.target;

    const data = {
      name: x.name.value,
      image,
    };

    updateBanner({
      variables: {
        id: Number(id),
        data,
      },
    });
  };

  return (
    <TsContent title={id ? 'Edit Banner' : 'Create Banner'}>
      <div className="row">
        <div className="col-md-4">
          <Card>
            <CardBody>
              {data && (
                <Form onSubmit={onHandleSubmit}>
                  <div>
                    <Label>Banner Image</Label>
                    <SingleUpload image={image} setImage={setImage} width="100%" height="250px" />
                  </div>
                  <br />
                  <XForm.Text label="Name" defaultValue={data.banner.name} name="name" />
                  <XForm.Button>Save</XForm.Button>
                </Form>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </TsContent>
  );
}
