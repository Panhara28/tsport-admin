import { useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';
import { useState } from 'react';
import { TsContent } from '../../components/Custom/TsContent';
import toastr from 'toastr';
import dynamic from 'next/dynamic';
// import DraftProduct from '../../components/Custom/Product/DraftProduct';

const DraftProduct = dynamic(() => import('../../components/Custom/Product/DraftProduct'), {
  ssr: false,
});

const CREATE = gql`
  mutation createProduct($data: ProductInput) {
    createProduct(data: $data)
  }
`;

export function CreateProductScreen() {
  const [data, setData] = useState({});
  const [createProduct] = useMutation(CREATE, {
    refetchQueries: ['productList', 'product'],
    onCompleted: res => {
      if (res.createProduct) {
        toastr.success('Upload new product.');
      }
    },
    onError: err => {
      toastr.danger(err.message);
    },
  });

  const onSave = (e: any) => {
    createProduct({
      variables: {
        data: e,
      },
    });
  };

  return (
    <TsContent title="Upload Product">
      <DraftProduct data={data} onSave={onSave} />
    </TsContent>
  );
}
