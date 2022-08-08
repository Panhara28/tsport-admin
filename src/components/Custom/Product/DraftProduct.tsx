/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
//@ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
//@ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import XForm from '../../Form/XForm';
import Select from 'react-select';
import { CategoryForm } from './Category';
import { TagListComponent } from '../Tags/TagListComponent';
import { StockItem } from './StockItem';

interface sku {
  id: number | 0;
  image: string;
  color: string;
  size: string;
  isMain: boolean | false;
  barcode: string;
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
}

const optionColor = ['Red', 'Blue', 'White', 'Black', 'Green', 'Yellow'];

const optionSize = ['XS', 'S', 'M', 'L', 'XL'];

export function DraftProduct() {
  const [product, setProduct] = useState<Product>();

  console.log(product);

  return (
    <div className="card">
      <div className="card-body">
        <XForm.Text
          label="Title"
          placeholder="Enter title product..."
          value={product?.title}
          onChange={e => setProduct({ ...product, title: e.currentTarget.value })}
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
          />
        </div>
      </div>
    </div>
  );
}
