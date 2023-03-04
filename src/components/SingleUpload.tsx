/* eslint-disable @next/next/no-img-element */
import { gql, useMutation } from '@apollo/client';
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useState } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { parseImageUrl } from '../hook/parseImageUrl';
import { UploadFileToFirebase } from '../libs/firebase';
import { getDownloadURL } from 'firebase/storage';

export const UPLOAD = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      url
      fileSize
      mimetype
      width
      height
    }
  }
`;

type Props = {
  setImage?: any;
  image?: string;
  width?: string;
  height?: string;
};

export function SingleUpload({ setImage, image, width, height }: Props) {
  const [pic, setPic] = useState(image);
  const refUpload = React.useRef<HTMLInputElement | null>(null);

  const [singleUpload] = useMutation(UPLOAD, {
    onCompleted: (data: any) => {
      setPic(data.singleUpload.url);
      setImage(data.singleUpload.url);
    },
    onError: error => {
      toastr.error(error.message);
    },
  });

  const onUpload = async (file: File) => {
    const upload = await UploadFileToFirebase(file);

    const downloadURL = await getDownloadURL(upload.ref);

    console.log(downloadURL);

    await setPic(downloadURL);
    await setImage(downloadURL);
  };

  const onChange = (e: any) => {
    if (e.target.validity.valid && e.target.files) {
      // singleUpload({
      //   variables: {
      //     file: e.target.files[0],
      //   },
      // });
      onUpload(e.target.files[0]);
    }
  };

  // if (image) {
  //   return (
  //     <div>
  //       <div
  //         style={{
  //           display: 'flex',
  //           justifyContent: 'end',
  //           backgroundColor: 'unset',
  //           flexDirection: 'row',
  //           position: 'absolute',
  //           top: 25,
  //           right: 20,
  //           zIndex: 999,
  //         }}
  //         onClick={() => {
  //           setImage(undefined);
  //         }}
  //       >
  //         <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} className="text-danger mb-3" />
  //       </div>
  //       <div>
  //         {image ? (
  //           <img
  //             src={image}
  //             alt=""
  //             style={{ width: width ? width : 280, height: height ? height : 280 }} />
  //         ) : (
  //           undefined
  //         )}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
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
          overflow: 'hidden',
          position: 'relative',
        }}
        onClick={() => refUpload?.current?.click()}
      >
        <input type="file" onChange={onChange} style={{ display: 'none' }} ref={refUpload} />
        {image ? (
          <img src={image} alt="" style={{ width, height: 'auto', objectFit: 'contain' }} />
        ) : (
          <FontAwesomeIcon icon={faImage} style={{ fontSize: 32, color: '#4886ff' }} />
        )}
      </div>
    </>
  );
}
