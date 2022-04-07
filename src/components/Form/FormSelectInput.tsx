import React from 'react';
import styles from './form.module.scss';

interface Props extends React.PropsWithChildren<React.HTMLProps<HTMLSelectElement>> {
  label?: string;
  items?: { text: string; value: string }[];
  autoSelectTheFirstItem?: boolean;
}

export default React.forwardRef(function FormSelectInput(props: Props, ref: React.Ref<HTMLSelectElement>) {
  if (!props.label) {
    return (
      <select {...props} ref={ref} className={styles.input}>
        {(props.items || []).map((item, idx) => (
          <option key={idx} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div className={styles.form_group}>
      {props.label && <label className={styles.label}>{props.label}</label>}
      <select {...props} ref={ref} className={styles.input}>
        {(props.items || []).map((item, idx) => (
          <option key={idx} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
});
