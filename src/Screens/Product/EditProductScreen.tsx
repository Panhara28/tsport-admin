import { useMutation, useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import React, { useState } from 'react';
import { TsContent } from '../../components/Custom/TsContent';
import toastr from 'toastr';
import dynamic from 'next/dynamic';
// import DraftProduct from '../../components/Custom/Product/DraftProduct';
const DraftProduct: any = dynamic(() => import('../../components/Custom/Product/DraftProduct'), {
  ssr: false,
});

const QUERY = gql`
  query product($id: Int!) {
    product(id: $id)
  }
`;

const EDIT = gql`
  mutation updateProduct($id: Int!, $data: ProductInput) {
    updateProduct(id: $id, data: $data)
  }
`;

export function EditProductScreen({ id }: { id?: number }) {
  const { data } = useQuery(QUERY, {
    variables: {
      id,
    },
  });
  const [updateProduct] = useMutation(EDIT, {
    refetchQueries: ['productList', 'product'],
    onCompleted: res => {
      if (res.updateProduct) {
        toastr.success('Upload new product.');
      }
    },
    onError: err => {
      toastr.error(err.message);
    },
  });

  const onSave = (e: any) => {
    const x = window.confirm('Are you sure want to save product?');
    if (!!x) {
      updateProduct({
        variables: {
          id: Number(id),
          data: e,
        },
      });
    }
  };

  return (
    <TsContent title="Edit Product">
      {data && (
        <DraftProduct
          data={{
            title: data.product.title || '',
            code: data.product.code || '',
            description: data.product.description || '',
            price: data.product.price || '',
            discount: data.product.discount || '0',
            size: data.product.size || '',
            color: data.product.color || '',
            category: data.product.category ? data.product.category[0].id || 0 : 0,
            stock: data.product.stock || '',
            unit: data.product.unit || '',
            sku: (data.product.sku as any[]).map(x => {
              return {
                id: x.id,
                image: x.image,
                color: x.color,
                size: x.size,
                isMain: false,
                barcode: x.barcode,
                stock: x.stock,
                qty: x.qty,
              };
            }),
            image: data.product.picture || '',
            images: data.product.images || [],
            price_hold_sale: data.product.price_hold_sale || 0,
            price_premium: data.product.price_premium || 0,
            discount_hold_sale: data.product.discount_hold_sale || 0,
            discount_premium: data.product.discount_premium || 0,
          }}
          onSave={onSave}
        />
      )}
    </TsContent>
  );
}
