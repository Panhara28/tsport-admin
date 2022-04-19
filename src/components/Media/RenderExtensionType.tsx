import { faFilePdf, faFileWord } from '@fortawesome/free-regular-svg-icons';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

export function RenderFileExtensionType({ item }: any) {
  const fileWord = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  let convertFileWord;
  if (item?.mimetype === fileWord) {
    convertFileWord = 'application/word';
  }
  if (item?.mimetype === 'application/pdf') {
    return (
      <>
        <div className="text-center">
          <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: 60 }} />
          <p className="text-center mt-2" style={{ margin: 0 }}>
            {item?.mimetype}
          </p>
        </div>
      </>
    );
  } else if (convertFileWord === 'application/word') {
    return (
      <>
        <div className="text-center">
          <FontAwesomeIcon icon={faFileWord} style={{ fontSize: 60 }} />
          <p className="text-center mt-2" style={{ margin: 0 }}>
            {convertFileWord}
          </p>
        </div>
      </>
    );
  } else if (item?.mimetype === 'text/csv') {
    return (
      <>
        <div className="text-center">
          <FontAwesomeIcon icon={faFileCsv} style={{ fontSize: 60 }} />
          <p className="text-center mt-2" style={{ margin: 0 }}>
            {item?.mimetype}
          </p>
        </div>
      </>
    );
  }
  return <Image src={item?.image_url} alt="" layout="responsive" width={160} height={160} />;
}
