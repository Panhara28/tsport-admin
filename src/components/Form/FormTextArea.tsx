import React from 'react';
import styles from './form.module.scss';

interface Props extends React.PropsWithChildren<React.HTMLProps<HTMLTextAreaElement>> {
  label?: string;
}

export default React.forwardRef(function FormTextAreaInput(props: Props, ref: React.Ref<HTMLTextAreaElement>) {
  if (props.label === undefined) {
    return <textarea {...props} ref={ref} className={styles.input} />;
  }

  return (
    <div className={styles.form_group}>
      <label className={styles.label}>{props.label}</label>
      <textarea {...props} ref={ref} className={styles.input} />
    </div>
  );
});
