import { DocumentNode, useQuery } from '@apollo/client';
import React from 'react';
// import { Graph } from 'src/generated/graph';
import styles from 'src/components/Form/form.module.scss';
import FormSelectInput from '../Form/FormSelectInput';

interface Props extends React.PropsWithChildren<React.HTMLProps<HTMLSelectElement>> {
  label: string;
  query: DocumentNode;
  transform: (data: any) => { text: string; value: string }[];
}

export default React.forwardRef(function FormSelectInputFromQuery(props: Props, ref: React.Ref<HTMLSelectElement>) {
  const { data, loading } = useQuery(props.query, { fetchPolicy: 'cache-and-network' });

  if (loading || !data) {
    return props.label ? (
      <div className={styles.form_group}>
        <label className={styles.label}>{props.label}</label>
        <div className={styles.input}>
          <i className="fas fa-spinner fa-spin"></i>&nbsp;Loading
        </div>
      </div>
    ) : (
      <div className={styles.input}>
        <i className="fas fa-spinner fa-spin"></i>&nbsp;Loading
      </div>
    );
  }

  const newProps = { ...props, transform: undefined };
  return <FormSelectInput {...newProps} ref={ref} items={props.transform(data)} />;
});
