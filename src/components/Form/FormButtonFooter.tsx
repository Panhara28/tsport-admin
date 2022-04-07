import React from 'react';
import styles from './form.module.scss';

export default function FormButtonFooter(props: React.PropsWithChildren<unknown>) {
  return <div className={styles.action_list}>{props.children}</div>;
}
