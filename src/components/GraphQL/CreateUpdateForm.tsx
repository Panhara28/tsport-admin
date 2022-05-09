/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ReactElement, ComponentType } from 'react';
import { DocumentNode } from 'graphql';
import { useQuery, useMutation } from '@apollo/client';
import { BlockLoading } from '../BlockLoading';
import MutationStatus from './MutationStatus';
import { useRouter } from 'next/router';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-bottom-center',
  preventDuplicates: false,
  onclick: null,
  showDuration: '2000',
  hideDuration: '2000',
  timeOut: '2000',
  extendedTimeOut: '2000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};
export interface CreateUpdateProps<T, K = T> {
  update: (data: T) => void;
  defaultValues: K;
  isEditingMode: boolean;
}

export function CreateUpdateForm<T, K>(props: {
  update: DocumentNode;
  create: DocumentNode;
  query: DocumentNode;
  updateReturned?: string;
  createReturned?: string | ((data: any) => string);
  refectQuery?: string;
  transform?: (data: any) => T;
  id?: number | string;
  body: any;
}): ReactElement {
  const id = props.id ? Number(props.id) : undefined;

  const { data } = useQuery<any>(props.query, {
    variables: { id },
    skip: id ? false : true,
    fetchPolicy: 'network-only',
  });

  const history = useRouter();

  const onUpdatedCompleted = (): void => {
    if (props.updateReturned) {
      toastr.success('Record has already update');

      history.push(props.updateReturned);
    }
  };

  const onCreatedCompleted = (data: any): void => {
    if (props.createReturned) {
      if (typeof props.createReturned === 'string') {
        history.push(props.createReturned);
      } else {
        history.push(props.createReturned(data));
      }
    }
  };

  const [mutate, mutationProps] = useMutation(id ? props.update : props.create, {
    onCompleted: id ? onUpdatedCompleted : onCreatedCompleted,
  });

  const updateFunc = (input: T): void => {
    if (id) {
      mutate({ variables: { id, input }, refetchQueries: [props.refectQuery?.toString() || ''] })
        .then()
        .catch(console.error);
    } else {
      mutate({ variables: { input } })
        .then()
        .catch(console.error);
    }
  };

  const header = <MutationStatus {...mutationProps} />;
  let body = <BlockLoading />;

  if (!id) {
    body = <props.body defaultValues={{} as K} update={updateFunc} isEditingMode={false} />;
  } else if (data) {
    const dataSelection = (data as any)[Object.keys(data)[0]];
    const dataAfterTransform = { ...dataSelection, ...(props.transform ? props.transform(dataSelection) : {}) };
    body = <props.body defaultValues={dataAfterTransform} update={updateFunc} isEditingMode={true} />;
  }

  return (
    <div>
      {header}
      {body}
    </div>
  );
}
