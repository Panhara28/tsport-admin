import React from 'react';
import styles from './form.module.scss';

interface Props extends React.PropsWithChildren<unknown> {
  label?: string;
  caption?: string;
  dropdown?: boolean;
  loading?: boolean;
}

export default function FormInputLike(props: Props) {
  const body = (
    <div className={styles.input}>
      {props.loading && <i className="fas fa-spinner fa-spin mr-1"></i>}
      {props.children}
      {props.dropdown && (
        <div style={{ position: 'absolute', right: 10, top: 7 }}>
          <i className="fas fa-caret-down"></i>
        </div>
      )}
    </div>
  );

  if (props.label === undefined) {
    return body;
  }

  return (
    <div className={styles.form_group}>
      <label className={styles.label}>{props.label}</label>
      {body}
      {props.caption && <small>{props.caption}</small>}
    </div>
  );
}
