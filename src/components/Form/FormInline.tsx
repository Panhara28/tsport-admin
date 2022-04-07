import React from 'react';
import styles from './form.module.scss';

export default function FormInline(props: React.PropsWithChildren<unknown>) {
  return <div className={styles.form_inline}>{props.children}</div>;
}
