import React from 'react';
import styles from './form.module.scss';

export default React.forwardRef(function FormCheckbox(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label: string; inline?: boolean },
  ref: React.Ref<HTMLInputElement>,
) {
  return (
    <label className={props.inline ? `${styles.checkbox} ${styles.checkbox_inline}` : styles.checkbox}>
      <input ref={ref} type="checkbox" {...props} />
      <span>{props.label}</span>
    </label>
  );
});
