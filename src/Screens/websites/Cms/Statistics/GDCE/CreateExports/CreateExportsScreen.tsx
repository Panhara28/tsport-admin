import { gql, useMutation, useQuery } from '@apollo/client';
import { faAngleLeft, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Col, Container, Row, Table, Modal, Alert, Spinner, ProgressBar } from 'react-bootstrap';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Layout from '../../../../../../components/VerticalLayout';
import { Breadcrumb } from '../../../../../../components/Common/Breadcrumb';
import { Card, CardBody, CardTitle, Label } from 'reactstrap';
import AuthContext from '../../../../../../components/Authentication/AuthContext';
import { ReadFileExcel } from '../../../../../../hook/readExcelFile';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export const CREATE_EXPORTS = gql`
  mutation createExports($input: ExportsInput) {
    createExports(input: $input)
  }
`;

export const DELETE_EXPORTS = gql`
  mutation deleteExports($exportId: Int!) {
    deleteExports(exportId: $exportId)
  }
`;

const RenderProgressBar = ({ size }: any) => {
  const [now, setNow] = useState(0);

  useEffect(() => {
    let num: number = 6000 / size;
    let newNow: number = 0;

    const interval = setInterval(() => {
      setNow(Math.floor(newNow + num));

      newNow += num;

      if (newNow >= 100) {
        setNow(100);
        clearInterval(interval);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (now === 100) {
    return (
      <ProgressBar
        variant="success"
        animated
        now={now}
        label={`processing`}
        style={{ height: '15px', fontSize: '14px' }}
      />
    );
  }

  return <ProgressBar now={now} label={`${now}%`} style={{ height: '15px', fontSize: '14px' }} />;
};

export function CreateExportsScreen() {
  const { me } = useContext(AuthContext);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [deleteExports] = useMutation(DELETE_EXPORTS);

  const [createExports, { loading }] = useMutation(CREATE_EXPORTS, {
    onCompleted: data => {
      if (data) {
        setIsSuccess(true);
      }
    },
    onError: err => {
      if (err?.message) {
        const error = JSON?.parse(err?.message);

        toastr.error(error?.message);

        setUploadFile(undefined);

        deleteExports({
          variables: {
            exportId: Number(error?.exportId),
          },
        });
      }
    },
  });

  const fileInputRef = useRef<any>();

  const [uploadFile, setUploadFile] = useState<any>(undefined);
  const [isPreview, setIsPreview] = useState<any>(undefined);
  const [isSuccess, setIsSuccess] = useState<any>(undefined);

  const onHandleInputChange = async (e: any) => {
    setIsLoading(true);

    const res = new Promise(r => {
      ReadFileExcel(e.target.files[0], (callback: any) => {
        r(callback);
      });
    });
    const data: any = await res;

    const input = [];
    for (const x of data) {
      input.push({
        year: x?.year + '',
        month: x?.month + '',
        destination_country: x?.destination_country + '',
        hs_code: x?.hs_code + '',
        net_weight_kgm: x?.net_weight_kgm + '',
        supplementary_unit: x?.supplementary_unit + '',
        quantity: x?.quantity + '',
        custom_value_khr: x?.custom_value_khr,
        custom_value_usd: x?.custom_value_usd,
      });
    }

    setUploadFile(input);

    setIsLoading(false);

    createExports({
      variables: {
        input: {
          name: e?.target?.files[0]?.name,
          websiteId: Number(router?.query?.id),
          data: input,
        },
      },
    });
  };

  let renderFetching = (
    <ProgressBar now={100} animated variant="info" label={`fetching`} style={{ height: '15px', fontSize: '14px' }} />
  );

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="GDCE Statistics" />
          <hr />
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">Upload Exports</CardTitle>
                  {isSuccess && <Alert variant="success">Uploaded Successfully!</Alert>}
                  <input
                    type="file"
                    style={{ visibility: 'hidden', position: 'absolute' }}
                    ref={fileInputRef}
                    onChange={e => onHandleInputChange(e)}
                  />
                  {!isSuccess ? (
                    isLoading ? (
                      renderFetching
                    ) : loading && uploadFile ? (
                      <RenderProgressBar size={uploadFile?.length} />
                    ) : (
                      <Button variant="success" onClick={() => fileInputRef.current.click()}>
                        Upload
                      </Button>
                    )
                  ) : (
                    <Button variant="primary" onClick={() => setIsPreview(true)}>
                      Preview
                    </Button>
                  )}
                </CardBody>
              </Card>
            </Col>

            <Modal show={isPreview} onHide={() => setIsPreview(false)} size="xl">
              <Modal.Header closeButton>Upload Exports</Modal.Header>

              <Modal.Body>
                <Table>
                  <thead>
                    <tr>
                      <th>year</th>
                      <th>month</th>
                      <th>destination_country</th>
                      <th>hs_code</th>
                      <th>net_weight_kgm</th>
                      <th>supplementary_unit</th>
                      <th>quantity</th>
                      <th>custom_value_khr</th>
                      <th>custom_value_usd</th>
                      <th>type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadFile
                      ? uploadFile?.map((x: any, idx: number) => {
                          return (
                            <tr key={idx}>
                              <td>{x['year']}</td>
                              <td>{x['month']}</td>
                              <td>{x['destination_country']}</td>
                              <td>{x['hs_code']}</td>
                              <td>{x['net_weight_kgm']}</td>
                              <td>{x['supplementary_unit']}</td>
                              <td>{x['quantity']}</td>
                              <td>{x['custom_value_khr']}</td>
                              <td>{x['custom_value_usd']}</td>
                              <td>export</td>
                            </tr>
                          );
                        })
                      : undefined}
                  </tbody>
                </Table>
              </Modal.Body>
            </Modal>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
