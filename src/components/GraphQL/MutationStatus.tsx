import styles from './loading.module.scss';
import { ApolloError } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'react-bootstrap';

interface Props {
  error?: ApolloError;
  loading?: boolean;
  data?: unknown;
  processText?: string;
  successText?: string;
}

export default function MutationStatus(props: Props) {
  const [show, setShow] = useState<boolean>(false);
  const [hasShowBefore, setHasShowBefore] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!ref.current || ref.current.getBoundingClientRect().y < 0) {
  //     setShow(true);
  //     setHasShowBefore(true);
  //   }
  // }, [props]);

  if (show) {
    if (props.data) {
      return (
        <div className={`${styles.containermid} ${styles.success}`}>
          <i className="fas fa-check-circle"></i>
          <span>{props.successText || 'Save is successful'}</span>
        </div>
      );
    }

    if (props.loading) {
      return (
        <div className={styles.containermid}>
          <i className="fas fa-spinner fa-spin"></i>
          <span>{props.processText || 'Processing...'}</span>
        </div>
      );
    }

    if (props.error) {
      const errorMessages = props.error.message.split(',');
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <ul>
            {errorMessages.map(item => {
              return <li>{item}</li>;
            })}
          </ul>
        </Alert>
      );
    }
  }

  if (!hasShowBefore) {
    if (props.data) {
      return (
        <div ref={ref} className={`${styles.container} ${styles.success}`}>
          <FontAwesomeIcon icon={faCheckCircle} /> <span>{props.successText || 'Save is successful'}</span>
        </div>
      );
    }

    if (props.loading) {
      return (
        <div ref={ref} className={styles.container}>
          <i className="fas fa-spinner fa-spin"></i>
          <span>{props.processText || 'Processing...'}</span>
        </div>
      );
    }

    if (props.error) {
      return (
        <div ref={ref} className={`${styles.container} ${styles.error}`}>
          <i className="fas fa-exclamation-triangle"></i>
          <span>Error: {props.error.message}</span>
        </div>
      );
    }
  }

  return <div ref={ref}></div>;
}
