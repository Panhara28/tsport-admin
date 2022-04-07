import React from 'react';

interface Props {
  column?: number[];
}

export default function FormDivision(props: React.PropsWithChildren<Props>) {
  if (Array.isArray(props.children)) {
    const numberOfChildren = props.children.length;
    const columnSize: number[] = props.column
      ? props.column
      : new Array<number>(numberOfChildren).fill(12 / numberOfChildren);

    return (
      <div className="row">
        {props.children.map((child, idx) => (
          <div key={idx} className={`col-${columnSize[idx] || '1'}`}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  return <>{props.children}</>;
}
