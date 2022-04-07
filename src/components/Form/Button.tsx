import React from 'react';
import styles from './form.module.scss';

interface Props
  extends React.PropsWithChildren<
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
  > {
  theme?: 'primary' | 'secondary' | 'white' | 'danger';
  loading?: boolean;
}

export default function Button(props: Props) {
  const classNameList = [styles.btn];
  const { loading, theme, ...btnProps } = props;

  if (theme) {
    if (theme === 'primary') classNameList.push(styles.btn_primary);
    if (theme === 'secondary') classNameList.push(styles.btn_secondary);
    if (theme === 'danger') classNameList.push(styles.btn_danger);
  } else {
    classNameList.push(styles.btn_primary);
  }

  return (
    <button {...btnProps} className={classNameList.join(' ')}>
      {loading && <i className="fas fa-spinner fa-spin mr-1"></i>}
      {props.children}
    </button>
  );
}
