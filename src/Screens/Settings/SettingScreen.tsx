
import { Col } from 'reactstrap';
import { Container } from 'reactstrap';
import { Row } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';
import { Form } from 'react-bootstrap';
import XForm from '../../components/Form/XForm';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

const QUERY = gql`
query settings{
  settings{
    id
    options{
      khrvalue
    }
  }
}
`
const UPDATE = gql`
mutation updateKhrCurrencyValue($currency: Float){
  updateKhrCurrencyValue(currency: $currency)
}`

export function SettingScreen() {
  const [value, setValue] = useState('0')
  const { data, loading } = useQuery(QUERY, {
    fetchPolicy: 'no-cache',
    onCompleted: r => {
      if (r.settings) {
        setValue(r.settings.options.khrvalue)
      }
    }
  });
  const [updateKhrCurrencyValue] = useMutation(UPDATE, {
    refetchQueries: ['settings']
  });

  const onHandleSubmit = (e: any) => {
    e.preventDefault();
    updateKhrCurrencyValue({
      variables: {
        currency: Number(value)
      }
    }).then(r => {
      if (r.data.updateKhrCurrencyValue) {
        alert('Update exchange rate');
      }
    })
  }

  return (
    <Layout>
      <div className="page-content">
        <Breadcrumb breadcrumbItem="Settings" title={setting.title} />
        <hr />
        <Container fluid>
          <Row>
            <Col md={3}>
              {
                !loading && data && <Form onSubmit={onHandleSubmit}>
                  <XForm.Text
                    label={`Exchange rate 1 USD = ${data.settings.options.khrvalue} KHR (+)`}
                    placeholder=""
                    value={value}
                    onChange={e => setValue(e.currentTarget.value)}
                  />
                  <div className="form-group">
                  </div>
                  <XForm.Button>Save</XForm.Button>
                </Form>
              }
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
