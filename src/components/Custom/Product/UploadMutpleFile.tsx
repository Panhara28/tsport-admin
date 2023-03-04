/* eslint-disable @next/next/no-img-element */
import { useMutation } from '@apollo/client';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { parseImageUrl } from '../../../hook/parseImageUrl';
import { UPLOAD } from '../../SingleUpload';
import { restapiupload } from '../../../libs/restapiupload';

export function MultipleFiles({ images, setImages }: { images: any; setImages: any }) {
  const refUpload = useRef<HTMLInputElement | null>(null);
  const [singleUpload] = useMutation(UPLOAD);

  const onChange = async (e: any) => {
    if (e.target.validity.valid && e.target.files) {
      const x = images ? [...images] : [];
      for (const file of e.target.files) {
        await singleUpload({
          variables: {
            file,
          },
        })
          .then(async ({ data }) => {
            x.push(data.singleUpload.url);
          })
          .catch(err => console.log(err));
        await setImages(x);
        // restapiupload(file).then(res => {
        //   if (res) {
        //     x.push(res.filename);
        //   }
        // });

        // await setImages(x);
      }
    }
  };

  return (
    <>
      <input type="file" onChange={onChange} multiple style={{ display: 'none' }} ref={refUpload} />
      <button type="button" className="btn btn-sm btn-info" onClick={() => refUpload?.current?.click()}>
        Choose Files
      </button>
      <hr />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {(images as any[]).length > 0 &&
          images.map((image: any, i: number) => {
            return (
              <div style={{ position: 'relative', marginRight: '0.5rem', marginBottom: '0.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    backgroundColor: 'unset',
                    flexDirection: 'row',
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 999,
                  }}
                  onClick={() => {
                    const x = [...images];
                    x.splice(i, 1);
                    setImages(x);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} className="text-danger mb-3" />
                </div>
                <div>
                  {image ? (
                    <img
                      src={parseImageUrl(image, 100 && 100 ? `${100}x${100}` : '280x280')}
                      alt=""
                      style={{ width: 100, height: 100 }}
                    />
                  ) : (
                    undefined
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
