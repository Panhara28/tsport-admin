/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import XForm from '../../Form/XForm';
import { ImageUploadRowField } from './ImageUploadRowField';

function generateSku(color: string[], size: string[], sku: any[]): any[] {
  const items: any[] = [];

  for (const c of color) {
    for (const s of size) {
      if (sku.length > 0) {
        const index = sku.find(
          x =>
            String(x.color)
              .trim()
              .toLowerCase() === c.trim().toLowerCase() &&
            String(x.size)
              .trim()
              .toLowerCase() === s.trim().toLowerCase(),
        );
        if (index) {
          items.push({
            id: index.id,
            color: c.trim(),
            size: s.trim(),
            image: index.image,
            barcode: index.barcode,
            stock: index.stock,
          });
        } else {
          items.push({
            color: c.trim(),
            size: s.trim(),
            image: '',
            barcode: '',
            stock: 0,
          });
        }
      } else {
        items.push({
          color: c.trim(),
          size: s.trim(),
          image: '',
          barcode: '',
          stock: 0,
        });
      }
    }
  }

  return items;
}

export function StockItem({ color, size, onChange, sku }: { color: string; size: string; onChange: any; sku: any[] }) {
  const [items, setItems] = useState(generateSku(color.split(','), size.split(','), sku));

  useEffect(() => {
    setItems(generateSku(color.split(','), size.split(','), sku));
  }, [color, size]);

  return (
    <table className="table table-bordered" style={{ fontSize: 12 }}>
      <thead>
        <tr>
          <th className="text-center">Barcode</th>
          <th className="text-center">Color</th>
          <th className="text-center">Size</th>
          <th className="text-center">Stock</th>
          <th className="text-center">Image</th>
        </tr>
      </thead>
      <tbody>
        {items.map((x, i) => {
          return (
            <tr key={x}>
              <td className="text-center" style={{ width: 250 }}>
                <input
                  placeholder="Enter barcode"
                  type="text"
                  style={{ border: 'none' }}
                  className="form-control form-control-sm"
                  value={x.barcode}
                  onChange={e => {
                    const data = [...items];
                    data[i].barcode = e.target.value;
                    setItems(data);
                    onChange(data);
                  }}
                />
              </td>
              <td className="text-center">{x.color}</td>
              <td className="text-center">{x.size}</td>
              <td className="text-center" style={{ width: 100 }}>
                <input
                  type="text"
                  value={x.stock}
                  className="form-control form-control-sm"
                  style={{ border: 'none', textAlign: 'center' }}
                  onChange={e => {
                    const data = [...items];
                    data[i].stock = e.target.value;
                    setItems(data);
                    onChange(data);
                  }}
                />
              </td>
              <td className="text-center">
                {x.image && <img src={x.image} style={{ width: 50, height: 50 }} />}
                <ImageUploadRowField
                  onUpload={(e: any) => {
                    const data = [...items];
                    data[i].image = e;
                    setItems(data);
                    onChange(data);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
