/* eslint-disable @next/next/no-img-element */
import { useMutation } from '@apollo/client';
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gql } from 'apollo-boost';
import React, { useState } from 'react';
import { Label } from 'reactstrap';
import { parseImageUrl } from '../../../hook/parseImageUrl';
import XForm from '../../Form/XForm';
// import toastr from 'toastr';
import { UPLOAD } from '../../SingleUpload';

type Props = {
  setImage?: any;
  image?: string;
  width?: string;
  height?: string;
};

export function UploadImage({ setImage, image, width, height }: Props) {
  const [pic, setPic] = useState(image);
  const refUpload = React.useRef<HTMLInputElement | null>(null);

  const [singleUpload] = useMutation(UPLOAD, {
    onCompleted: (data: any) => {
      setPic(data.singleUpload.url);
      setImage(data.singleUpload.url);
    },
    onError: error => {
      console.log(error.message);
    },
  });

  const onChange = (e: any) => {
    if (e.target.validity.valid && e.target.files) {
      singleUpload({
        variables: {
          file: e.target.files[0],
        },
      });
    }
  };

  if (image) {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            backgroundColor: 'unset',
            flexDirection: 'row',
            position: 'absolute',
            top: 45,
            left: width ? Number(width) - 15 : 280,
            zIndex: 999,
          }}
          onClick={() => {
            setImage(undefined);
          }}
        >
          <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} className="text-danger mb-3" />
        </div>
        <div>
          {image ? (
            <img
              src={parseImageUrl(image, width && height ? `${width}x${height}` : '280x280')}
              alt=""
              style={{ width: width ? width : 280, height: height ? height : 280 }}
            />
          ) : (
            undefined
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-3">
        <label>Product Image</label>
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            borderStyle: 'dotted',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#4886ff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => refUpload?.current?.click()}
        >
          <FontAwesomeIcon icon={faImage} style={{ fontSize: 32, color: '#4886ff' }} />
          <XForm.Text type="file" onChange={onChange} style={{ display: 'none' }} ref={refUpload} />
        </div>
      </div>
    </div>
  );
}
