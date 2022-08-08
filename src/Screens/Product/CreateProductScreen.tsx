import { useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';
import { useEffect, useState } from 'react';
import { DraftProduct } from '../../components/Custom/Product/DraftProduct';
import { TsContent } from '../../components/Custom/TsContent';
import toastr from 'toastr';

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
      <div className="row">
        <div className="col-8">
          <DraftProduct data={data} onSave={onSave} />
        </div>
      </div>
    </TsContent>
  );
}
