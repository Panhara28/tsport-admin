import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type Props = {
  total: number;
  size: number;
  currentPage: number;
  limit: number;
  variableName?: string;
};

export function CustomPagination({ currentPage, size, total, limit, variableName }: Props) {
  const variableN = variableName ? variableName : 'page';
  let start;
  let pages: ReactNode[] = [];

  const search = new URLSearchParams(process.browser ? window.location.search : '');

  search.delete(variableN);
  const base: string = window.location.pathname + '?' + (search.toString() !== '' ? search.toString() + '&' : '');

  let pagesPage = Math.ceil(total / limit);

  let middle = pagesPage < 5 ? pagesPage : 5;

  start = 1;

  if (currentPage > 3) {
    start = currentPage - 2;

    if (currentPage + 2 > pagesPage) {
      middle = 5 - (currentPage + 2 - pagesPage);
    }
  }

  //Construct Previous Page
  pages.push(
    <li key="_previous" className={'paginate_button page-item ' + (currentPage === 1 ? 'disabled' : '')}>
      <Link href={base + variableN + '=' + (currentPage - 1)}>
        <a className={`page-link`}>
          <FontAwesomeIcon icon={faAngleLeft} style={{ fontSize: 15 }} />
        </a>
      </Link>
    </li>,
  );

  if (currentPage > 5) {
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
          (currentPage === i + start ? '' : 'd-none d-sm-block') +
          (i + start === currentPage ? 'disabled' : '')
        }
      >
        <Link href={base + variableN + '=' + (i + start)}>
          <a className={`page-link`}>{i + start}</a>
        </Link>
      </li>,
    );
  }

  console.log(window.location.pathname);

  pages.push(
    <li key="next" className={'paginate_button page-item ' + (currentPage * limit >= total ? 'disabled' : '')}>
      <Link href={base + variableN + '=' + (currentPage + 1)}>
        <a className="page-link">
          <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: 15 }} />
        </a>
      </Link>
    </li>,
  );

  return (
    <div className="row mb-5">
      <div className="col-12">
        <div className="text-center">
          showing {limit ? (currentPage - 1) * limit + 1 : (currentPage - 1) * 10 + 1} to{' '}
          {(currentPage - 1) * limit + size} of {total} entries
        </div>
      </div>

      <div className="col-12 mt-2">
        <ul className="pagination justify-content-center mb-0">{pages}</ul>
      </div>
    </div>
  );
}
