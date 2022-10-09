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
  const [data, setData] = useState({
    discount_hold_sale: 0,
    discount_premium: 0,
    discount: 0,
  });
  const [createProduct] = useMutation(CREATE, {
    refetchQueries: ['productList', 'product'],
    onCompleted: res => {
      if (res.createProduct) {
        toastr.success('Upload new product.');
        setTimeout(() => {
          process.browser && window.location.reload();
        }, 500);
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
