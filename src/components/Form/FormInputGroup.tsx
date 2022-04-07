import React from 'react';
import Button from './Button';
import styles from './form.module.scss';
import FormSelectInput from './FormSelectInput';
import FormTextInput from './FormTextInput';

interface Props {
  label: string;
}

export default function FormInputGroup(props: React.PropsWithChildren<Props>) {
  if (Array.isArray(props.children)) {
    let previousIsInput = false;

    return (
      <div className={styles.form_group}>
        <label className={styles.label}>{props.label}</label>

        <div className={styles.form_input_group}>
          {props.children.map((child, idx) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const childType: React.FC = (child as any).type;

            const full = childType !== Button;
            const marginLeft = previousIsInput ? 5 : undefined;

            previousIsInput = childType === FormTextInput || childType === FormSelectInput;

            return (
              <div key={idx} style={{ flexGrow: full ? 1 : 0, marginLeft }}>
                {child}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return <>{props.children}</>;
}
