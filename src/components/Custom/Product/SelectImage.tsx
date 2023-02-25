/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState, useEffect } from 'react';

interface Props {
  images: any[];
  image: any;
  onClick: any;
  width?: any;
  height?: any;
}

export function SelectImage({ images, image, onClick, width, height }: Props) {
  const wrappedRef = useRef<HTMLDivElement | null>(null);
  const [focus, setFocus] = useState(false);

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
      <div onClick={() => setFocus(true)} style={{ cursor: 'pointer' }}>
        {image ? (
          <img src={image} alt="choose image" style={{ width: width ? width : 50, height: height ? height : 50 }} />
        ) : (
          <button type="button" className="btn btn-sm btn-info">
            Choose image
          </button>
        )}
      </div>
      {!!focus && images.length > 0 && (
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
            height: 300,
            maxWidth: 120,
            overflowY: 'auto',
          }}
          onClick={() => setFocus(true)}
        >
          {images.map(image => {
            return (
              <div
                className="category_form"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  onClick(image);
                  setFocus(false);
                }}
              >
                <img src={image} style={{ width: 50, height: 50 }} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
