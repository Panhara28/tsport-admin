import { gql, useMutation } from '@apollo/client';
import { faAngleLeft, faAngleRight, faPlug } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Title } from '../../components/Title';
import UploadSingleFile from '../../components/Upload/UploadSingleFile';
import style from './create-websites.module.scss';

const MUTATION = gql`
  mutation createWebsite($input: WebsiteInput) {
    createWebsite(input: $input)
  }
`;

export const CreateWebsiteScreen = () => {
  const router = useRouter();
  const [src, setSrc] = useState('');
  const [open, setOpen] = useState(false);
  const [createWebsite] = useMutation(MUTATION, {
    onCompleted: data => {
      router.push('/');
    },
  });
  let websiteNameInput: any;
  let websiteDescriptionInput: any;

  const onCreateWebsite = () => {
    createWebsite({
      variables: {
        input: {
          name: websiteNameInput.value,
          description: websiteDescriptionInput.value,
        },
      },
      refetchQueries: ['websiteList'],
    });
  };

  return (
    <div className={style.mocWebsiteCreatePage}>
      <div className={style.mocBackButtonContainer}>
        <div className={style.mocBackButtonWrapper}>
          <div className={style.mocBackButtonContent}>
            <div className={style.mocBackButton}>
              <Link href="/">
                <a style={{ color: '#6b778c' }}>
                  <FontAwesomeIcon icon={faAngleLeft} size="2x" title="Go Back" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={style.mocCreateWebsiteWrapper}>
        <div className={style.mocCreateWebsiteContent}>
          <div className={style.mocCreateWebsiteContainer}>
            <Title title="Create a new websites" />
            <div className={style.formContainer}>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="4" style={{ fontWeight: 'bold', color: '#6b778c', fontSize: 14, width: '20%' }}>
                  Website name
                </Form.Label>
                <Col sm="8">
                  <input className="form-control moc-form" ref={node => (websiteNameInput = node)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="4" style={{ fontWeight: 'bold', color: '#6b778c', fontSize: 14, width: '20%' }}>
                  Description
                </Form.Label>
                <Col sm="8">
                  <textarea className="form-control moc-form" rows={5} ref={node => (websiteDescriptionInput = node)} />
                </Col>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <a
                    style={{ fontSize: 14, color: 'rgb(7, 71, 166)', cursor: 'pointer' }}
                    onClick={() => setOpen(!open)}
                  >
                    <FontAwesomeIcon icon={faAngleRight} /> Advance Setting
                  </a>
                </Form.Label>
              </Form.Group>
              <div style={{ display: `${!open ? 'none' : 'block'}` }}>
                <Form.Group as={Row} className="mb-3 mt-4" controlId="formPlaintextEmail">
                  <Form.Label
                    column
                    sm="4"
                    style={{ fontWeight: 'bold', color: '#6b778c', fontSize: 14, width: '20%' }}
                  >
                    Upload Logo
                  </Form.Label>
                  <Col sm="8">
                    <UploadSingleFile value={src} onChange={setSrc} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 mt-4" controlId="formPlaintextEmail">
                  <Form.Label
                    column
                    sm="4"
                    style={{ fontWeight: 'bold', color: '#6b778c', fontSize: 14, width: '20%' }}
                  >
                    Add Plugin
                  </Form.Label>
                  <Col sm="8">
                    <ul className="row">
                      <li className={'col-md-6 ' + style.listPlugin}>
                        <FontAwesomeIcon icon={faPlug} />
                        <span style={{ marginLeft: 15 }}>News</span>
                        <span style={{ float: 'right' }}>
                          <a href="#">Install</a>
                        </span>
                      </li>
                      <li className={'col-md-6 ' + style.listPlugin}>
                        <FontAwesomeIcon icon={faPlug} />
                        <span style={{ marginLeft: 15 }}>Official Document</span>
                        <span style={{ float: 'right' }}>
                          <a href="#">Install</a>
                        </span>
                      </li>
                      <li className={'col-md-6 ' + style.listPlugin}>
                        <FontAwesomeIcon icon={faPlug} />
                        <span style={{ marginLeft: 15 }}>Commodity Values</span>
                        <span style={{ float: 'right' }}>
                          <a href="#">Install</a>
                        </span>
                      </li>
                      <li className={'col-md-6 ' + style.listPlugin}>
                        <FontAwesomeIcon icon={faPlug} />
                        <span style={{ marginLeft: 15 }}>Page</span>
                        <span style={{ float: 'right' }}>
                          <a href="#">Install</a>
                        </span>
                      </li>
                    </ul>
                  </Col>
                </Form.Group>
              </div>

              <div className={style.buttonsContainer}>
                <div className={style.button}>
                  <button onClick={onCreateWebsite}>Create website</button>
                  <Link href="/">
                    <a className={style.cancelButton}>Cancel</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
