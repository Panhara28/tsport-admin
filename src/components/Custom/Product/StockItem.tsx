/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { ImageUploadRowField } from './ImageUploadRowField';

function generateSku(color: string[], size: string[]): any[] {
  const items: any[] = [];

  for (const c of color) {
    for (const s of size) {
      items.push({
        color: c,
        size: s,
        image: '',
        barcode: '',
      });
    }
  }

  return items;
}

export function StockItem({ color, size }: { color: string; size: string }) {
  const [items, setItems] = useState(generateSku(color.split(','), size.split(',')));

  return (
    <table className="table table-bordered" style={{ fontSize: 12 }}>
      <thead>
        <tr>
          <th className="text-center">Barcode</th>
          <th className="text-center">Color</th>
          <th className="text-center">Size</th>
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
                  }}
                />
              </td>
              <td className="text-center">{x.color}</td>
              <td className="text-center">{x.size}</td>
              <td className="text-center">
                {x.image && <img src={x.image} style={{ width: 50, height: 50 }} />}
                <ImageUploadRowField
                  onUpload={(e: any) => {
                    const data = [...items];
                    data[i].image = e;
                    setItems(data);
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
