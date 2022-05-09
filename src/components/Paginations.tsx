import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';

type Props = {
  total: number;
  size: number;
  currentPage: number;
  limit?: 10;
  variableName?: string;
};

export function CustomPagination(props: Props) {
  const variableName: any = props.variableName ? props.variableName : 'page';
  // let pageCount = Math.ceil((props.total * props.currentPage) / props.size);
  // let start = props.currentPage < 4 ? 1 : props.currentPage - 1;
  // let end = 3 + start;
  // end = pageCount < end ? pageCount : end;
  // let diff = start - end + 4;
  // start -= start - diff > 0 ? diff : 0;
  let start: any;
  let pages: ReactNode[] = [];
  const router = useRouter();

  const search = new URLSearchParams(process?.browser ? window?.location?.search : []);
  search.delete(variableName);
  // const base: string = '?' + (search.toString() !== '' ? search.toString() + '&' : '');

  const current_url: string = router.asPath.split('?')[0];
  const base: string = current_url + '?' + (search.toString() !== '' ? search.toString() + '&' : '');

  console.log(base);

  let pagesPage = Math.ceil(props.total / props.limit!);

  let middle = pagesPage < 5 ? pagesPage : 5;

  start = 1;

  if (props.currentPage > 3) {
    start = props.currentPage - 2;

    if (props.currentPage + 2 > pagesPage) {
      middle = 5 - (props.currentPage + 2 - pagesPage);
    }
  }

  //Construct Previous Page
  pages.push(
    <li key="_previous" className={'paginate_button page-item ' + (props.currentPage === 1 ? 'disabled' : '')}>
      <Link href={base + variableName + '=' + (props.currentPage - 1)}>
        <a className={`page-link`}>
          <FontAwesomeIcon icon={faAngleLeft} style={{ fontSize: 15 }} />
        </a>
      </Link>
    </li>,
  );

  // if (start > 1) {
  //   pages.push(
  //     <li
  //       key="_first"
  //       className={
  //         "paginate_button page-item " +
  //         (props.currentPage === 1 ? "" : "d-none d-sm-block")
  //       }
  //     >
  //       <Link href={base + variableName + "=" + 1}>
  //         <a className={`page-link ${props.currentPage === 1 ? "active" : ""}`}>
  //           1
  //         </a>
  //       </Link>
  //     </li>
  //   );

  //   pages.push(
  //     <li
  //       key="_first-dot"
  //       className={"paginate_button page-item disabled d-none d-sm-block"}
  //     >
  //       <Link href="#">
  //         <a className="page-link">• • •</a>
  //       </Link>
  //     </li>
  //   );
  // }

  if (props.currentPage > 5) {
    pages.push(
      <li key="_first-dot" className={'paginate_button page-item disabled d-none d-sm-block'}>
        <Link href="#">
          <a className="page-link">• • •</a>
        </Link>
      </li>,
    );
  }

  //Construct Center Page
  for (let i = 0; i < middle; i++) {
    pages.push(
      <li
        key={i + start}
        className={
          'paginate_button page-item ' +
          (props.currentPage === i + start ? '' : 'd-none d-sm-block') +
          (i + start === props.currentPage ? 'disabled' : '')
        }
      >
        <Link href={base + variableName + '=' + (i + start)}>
          <a className={`page-link`}>{i + start}</a>
        </Link>
      </li>,
    );
  }

  //Construct Next Page
  // if (end < pageCount) {
  // pages.push(
  //   <li
  //     key="_last-dot"
  //     className={"paginate_button page-item disabled d-none d-sm-block"}
  //   >
  //     <Link href="#">
  //       <a className="page-link">• • •</a>
  //     </Link>
  //   </li>
  // );

  //   pages.push(
  //     <li
  //       key="_last"
  //       className={
  //         "paginate_button page-item " +
  //         (props.currentPage === pageCount ? "active" : "d-none d-sm-block")
  //       }
  //     >
  //       <Link href={base + variableName + "=" + pageCount}>
  //         <a className="page-link">{pageCount}</a>
  //       </Link>
  //     </li>
  //   );
  // }

  pages.push(
    <li
      key="next"
      className={'paginate_button page-item ' + (props.currentPage * props.limit! >= props.total ? 'disabled' : '')}
    >
      <Link href={base + variableName + '=' + (props.currentPage + 1)}>
        <a className="page-link">
          <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: 15 }} />
        </a>
      </Link>
    </li>,
  );

  return (
    <div className="row mb-5">
      <div className="col-12">
        {/* <div className="text-center">
          Showing{" "}
          {(props.currentPage - 1) * props.size + (props.total > 0 ? 1 : 0)} to{" "}
          {props.currentPage * props.size > props.total
            ? (props.currentPage - 1) * props.size + props.total
            : props.currentPage * props.size}{" "}
          of {props.total} entries
        </div> */}
        <div className="text-center">
          Showing {props.limit ? (props.currentPage - 1) * props.limit + 1 : (props.currentPage - 1) * 10 + 1} to{' '}
          {(props.currentPage - 1) * props.limit! + props.size} of {props.total} entries
        </div>
      </div>

      <div className="col-12 mt-2">
        <ul className="pagination justify-content-center mb-0">{pages}</ul>
      </div>
    </div>
  );
}
