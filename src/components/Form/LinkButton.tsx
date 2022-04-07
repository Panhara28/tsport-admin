import Link from 'next/link';
import React from 'react';
import styles from './form.module.scss';

interface Props {
  to: string | { pathname: string };
  theme?: 'primary' | 'secondary' | 'white' | 'danger';
  disabled?: boolean;
  target?: string;
}

export function LinkButton(props: React.PropsWithChildren<Props>) {
  const classNameList = [styles.btn];

  if (props.theme) {
    if (props.theme === 'primary') classNameList.push(styles.btn_primary);
    if (props.theme === 'secondary') classNameList.push(styles.btn_secondary);
  } else {
    classNameList.push(styles.btn_primary);
  }

  if (props.disabled) {
    return <span className={styles.btn}>{props.children}</span>;
  }

  return (
    <Link href={props.to}>
      <a className={classNameList.join(' ')} target={props.target}>
        {props.children}
      </a>
    </Link>
  );
}
