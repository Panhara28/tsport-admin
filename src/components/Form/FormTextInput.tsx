import React from 'react';
import styles from './form.module.scss';

interface Props extends React.PropsWithChildren<React.HTMLProps<HTMLInputElement>> {
  label?: string;
  caption?: string;
}

export default React.forwardRef(function FormTextInput(props: Props, ref: React.Ref<HTMLInputElement>) {
  if (props.label === undefined) {
    return <input type="text" {...props} ref={ref} className={styles.input} />;
  }

  return (
    <div className={styles.form_group}>
      <label className={styles.label}>{props.label}</label>
      <input type="text" {...props} ref={ref} className={styles.input} />
      {props.caption && <small>{props.caption}</small>}
    </div>
  );
});
