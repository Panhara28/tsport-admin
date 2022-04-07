import React from 'react';
import styles from './form.module.scss';

export default React.forwardRef(function FormCheckbox(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label: string },
  ref: React.Ref<HTMLInputElement>,
) {
  return (
    <label className={styles.checkbox}>
      <input ref={ref} type="radio" {...props} />
      <span>{props.label}</span>
    </label>
  );
});
