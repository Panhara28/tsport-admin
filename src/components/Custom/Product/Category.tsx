import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import React, { useEffect, useRef, useState } from 'react';
import XForm from '../../Form/XForm';

const QUERY = gql`
  query categoryList {
    categoryList(active: true) {
      id
      name
      parents
      active
    }
  }
`;

function CategoryTreeItem({ data, depth, onChange }: any) {
  const children = data.parents.map((x: any) => (
    <CategoryTreeItem key={x.id} data={x} depth={depth + 1} onChange={onChange} />
  ));

  let heading;

  const border = depth > 0 ? { borderLeft: '1px solid #eee', paddingLeft: 15, marginLeft: 0 } : {};

  if (depth > 0) {
    heading = (
      <div
        className={'category_form'}
        style={{
          padding: '5px 10px',
          // marginLeft: depth * -25,
          paddingLeft: 10 + depth * 25,
          cursor: 'pointer',
        }}
        onClick={() => {
          if (onChange) onChange(data);
        }}
      >
        {data.name}
      </div>
    );
  }

  return (
    <div>
      {heading}
      {data.parents.length > 0 && <div style={border}>{children}</div>}
    </div>
  );
}

function readCategory(id: number, data: any[]): any {
  let x = null;
  for (const d of data) {
    if (d.id === id) {
      x = d;
      break;
    }
    if (d.parents.length > 0) {
      x = readCategory(id, d.parents);
      if (x) {
        break;
      }
    }
  }

  return x;
}

export function CategoryForm({
  categoryId,
  onChange,
  require,
}: {
  categoryId: number;
  onChange: any;
  require: boolean;
}) {
  const wrappedRef = useRef<HTMLDivElement | null>(null);
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState<any>(categoryId || 0);
  const { data } = useQuery(QUERY);

  useEffect(() => {
    const onDocumentClicked = (e: MouseEvent) => {
      if (wrappedRef.current && !wrappedRef.current.contains(e.target as Node)) {
        setFocus(false);
      }
    };

    document.addEventListener('click', onDocumentClicked);
    return () => document.removeEventListener('click', onDocumentClicked);
  });

  return (
    <div ref={wrappedRef}>
      {data && (
        <XForm.Text
          label={`Category ${require ? '*' : ''}`}
          onClick={() => setFocus(true)}
          readOnly
          value={value > 0 ? readCategory(value, data.categoryList).name : null}
          required={!!require}
        />
      )}
      {!!focus && data && (
        <div
          style={{
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: '#f3f3f3',
            width: '100%',
            boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.5);',
            padding: 10,
            // top: '100%',
            fontSize: 12,
            fontWeight: 500,
            overflow: 'hidden',
            height: 250,
            overflowY: 'auto',
          }}
          onClick={() => setFocus(true)}
        >
          {data.categoryList.map((cate: any) => {
            return (
              <CategoryTreeItem
                data={cate}
                depth={1}
                onChange={(x: any) => {
                  setValue(x.id);
                  onChange(x.id);
                  setFocus(false);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
