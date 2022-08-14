/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
//@ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
//@ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import XForm from '../../Form/XForm';
import { CategoryForm } from './Category';
import { TagListComponent } from '../Tags/TagListComponent';
import { StockItem } from './StockItem';
import { UploadImage } from './UploadImage';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { MultipleFiles } from './UploadMutpleFile';
import { SelectImage } from './SelectImage';

interface sku {
  id: number | 0;
  image: string;
  color: string;
  size: string;
  isMain: boolean | false;
  barcode: string;
  stock: number;
}

interface Product {
  title?: string;
  code?: string;
  description?: string;
  price?: string;
  discount?: string;
  size?: string;
  color?: string;
  category?: number;
  stock?: number;
  unit?: string;
  sku?: sku[];
  image?: string;
  images?: string[];
}

const optionColor = ['Red', 'Blue', 'White', 'Black', 'Green', 'Yellow'];

const optionSize = ['XS', 'S', 'M', 'L', 'XL'];

export default function DraftProduct({ data, onSave }: { data: any; onSave: any }) {
  const [product, setProduct] = useState<Product>(data);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const pictures = (product?.sku as any[]).map(x => {
      return {
        id: x.id,
        name: x.image,
        color: x.color,
        size: x.size,
        isMain: false,
        stock: Number(x.stock),
        barcode: x.barcode ? x.barcode : undefined,
      };
    });

    pictures.push({
      id: 0,
      name: product?.image,
      color: '',
      size: '',
      isMain: true,
      stock: 0,
      barcode: '',
    });

    const data = {
      title: product?.title,
      description: product?.description,
      price: product?.price,
      size: product?.size,
      color: product?.color,
      category: product?.category,
      unit: '',
      discount: product?.discount,
      picture: pictures,
      images: (product.images || []).map(x => x).join(','),
    };

    onSave(data);
  };

  return (
    <XForm onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              {/* <UploadImage
                image={product.image || ''}
                width="175"
                height="175"
                setImage={(e: any) => {
                  setProduct({
                    ...product,
                    image: e,
                  });
                }}
              /> */}
              <SelectImage
                width={175}
                height={175}
                onClick={(e: any) => {
                  setProduct({
                    ...product,
                    image: e,
                  });
                }}
                image={product.image || ''}
                images={product.images || []}
              />
              <br />
              <XForm.Text
                label="Title"
                placeholder="Enter title product..."
                value={product?.title}
                onChange={e => setProduct({ ...product, title: e.currentTarget.value })}
                required
              />
              <div className="mb-3">
                <style
                  type="text/css"
                  dangerouslySetInnerHTML={{
                    __html: `
                .ck-toolbar {
                  border: solid #dde2ec !important;
                  border-width: 2px 2px 0 2px !important;
                }
                .ck-content {
                  border: 2px solid #dde2ec !important;
                 }
              `,
                  }}
                />
                <label style={{ color: 'rgb(107, 119, 140)', fontSize: 12, fontWeight: 600 }}>Description</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={product?.description || ''}
                  config={{
                    toolbar: ['heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList'],
                  }}
                  onReady={(editor: any) => {
                    // You can store the "editor" and use when it is needed.
                    // console.log('Editor is ready to use!', editor);
                  }}
                  onChange={(event: any, editor: any) => {
                    const data = editor.getData();
                    // console.log({ event, editor, data });
                    setProduct({ ...product, description: data });
                  }}
                  onBlur={(event: any, editor: any) => {
                    // console.log('Blur.', editor);
                  }}
                  onFocus={(event: any, editor: any) => {
                    // console.log('Focus.', editor);
                  }}
                />
              </div>
              <div className="row">
                <div className="col-md-4">
                  <CategoryForm
                    categoryId={product?.category || 0}
                    onChange={(e: any) => setProduct({ ...product, category: e })}
                  />
                </div>
                <div className="col-md-4">
                  <XForm.Text
                    label="Sale Price"
                    placeholder="Enter sale price"
                    type="number"
                    value={product?.price}
                    onChange={e => setProduct({ ...product, price: e.currentTarget.value })}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <XForm.Text
                    label="Discount"
                    placeholder="Enter discount"
                    type="number"
                    value={product?.discount}
                    onChange={e => setProduct({ ...product, discount: e.currentTarget.value })}
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label style={{ color: 'rgb(107, 119, 140)', fontSize: 12, fontWeight: 600 }}>Color</label>
                <TagListComponent
                  name="color"
                  value={product?.color ? product.color.split(',') : []}
                  suggestion={optionColor}
                  onChange={e => {
                    setProduct({
                      ...product,
                      color: e.join(','),
                    });
                  }}
                />
              </div>
              <div className="form-group mb-3">
                <label style={{ color: 'rgb(107, 119, 140)', fontSize: 12, fontWeight: 600 }}>Size</label>
                <TagListComponent
                  name="size"
                  value={product?.size ? product.size.split(',') : []}
                  suggestion={optionSize}
                  onChange={e => {
                    setProduct({
                      ...product,
                      size: e.join(','),
                    });
                  }}
                />
              </div>
              <div>
                <StockItem
                  color={product?.color || ''}
                  size={product?.size || ''}
                  sku={product?.sku || []}
                  onChange={(e: any) => setProduct({ ...product, sku: e })}
                  images={product.images || []}
                />
              </div>
              <XForm.Button type="submit">Save</XForm.Button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <Card>
            <CardBody>
              <MultipleFiles
                images={product.images || []}
                setImages={(val: any) => setProduct({ ...product, images: val })}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </XForm>
  );
}
