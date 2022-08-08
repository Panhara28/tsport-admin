import { useMutation } from '@apollo/client';
import React, { useRef } from 'react';
import { UPLOAD } from '../../SingleUpload';
import toastr from 'toastr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

export function ImageUploadRowField({ onUpload }: { onUpload: any }) {
  const refInput = useRef(null);
  const [uploadMutation] = useMutation(UPLOAD, {
    onCompleted: (data: any) => {
      // setPic(data.singleUpload.url);
      // setImage(data.singleUpload.url);
      onUpload(data.singleUpload.url);
    },
    onError: error => {
      toastr.error(error.message);
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
    <div>
      <input type="file" style={{ display: 'none' }} ref={refInput} onChange={onChange} />
      <button
        type="button"
        className="btn btn-sm btn-primary"
        onClick={() => refInput.current && (refInput.current as any).click()}
      >
        <FontAwesomeIcon icon={faPaperclip} />
      </button>
    </div>
  );
}
