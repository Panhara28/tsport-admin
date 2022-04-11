import { gql, useMutation } from '@apollo/client';
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

export const UPLOAD = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      url
    }
  }
`;

export const CREATE_MEDIA = gql`
  mutation createMedia($websiteId: Int!, $input: MediaInput) {
    createMedia(websiteId: $websiteId, input: $input)
  }
`;

type Props = {
  setKey?: any;
  setImage?: any;
  image?: string;
  width?: string;
  height?: string;
  websiteId?: number;
  setFirstFeaturedImage?: any;
  setSelectImage?: any;
};
export function SignleImageUpload({
  websiteId,
  setKey,
  setImage,
  image,
  width,
  height,
  setFirstFeaturedImage,
  setSelectImage,
}: Props) {
  const [pic, setPic] = useState(image);
  const refUpload = React.useRef<HTMLInputElement | null>(null);
  const [createMedia] = useMutation(CREATE_MEDIA);

  const [uploadMutation] = useMutation(UPLOAD, {
    onCompleted: (data: any) => {
      setPic(data.singleUpload.url);
      setKey('media');
      setImage(data);
      setFirstFeaturedImage(data.singleUpload.url);
      setSelectImage(undefined);
      createMedia({
        variables: {
          websiteId,
          input: {
            image_url: data.singleUpload.url,
          },
        },
        refetchQueries: ['mediaList'],
      });
    },
  });

  const onChange = (e: any) => {
    uploadMutation({
      variables: {
        file: e.target.files[0],
      },
    });
  };

  return (
    <>
      <div
        style={{
          width: `${width}`,
          height: `${height}`,
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
        <input type="file" onChange={onChange} style={{ display: 'none' }} ref={refUpload} />
        <FontAwesomeIcon icon={faImage} style={{ fontSize: 32, color: '#4886ff' }} />
      </div>
      <p className="mt-3">Maximum upload file size: 15 MB.</p>
    </>
  );
}
