import React from 'react';
import styles from './form.module.scss';

interface Props extends React.PropsWithChildren<unknown> {
  label: string;
}

export default function FormGroup(props: Props) {
  return (
    <div className={styles.form_legend}>
      <legend>{props.label}</legend>
      <div>{props.children}</div>
    </div>
  );
}
