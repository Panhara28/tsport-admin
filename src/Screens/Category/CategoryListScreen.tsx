import { useQuery } from '@apollo/client';
import { faEdit, faFolder, faFolderOpen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gql } from 'apollo-boost';
import Link from 'next/link';
import React, { useState } from 'react';
import { CardBody } from 'reactstrap';
import { Card } from 'reactstrap';
import { TsContent } from '../../components/Custom/TsContent';

const QUERY = gql`
  query categoryList {
    categoryList {
      id
      name
      parents
    }
  }
`;

function TreeItem({ data, depth }: { data: any; depth: number }) {
  const [open, isOpen] = useState(false);
  const children = data.parents.map((x: any) => <TreeItem key={x.id} data={x} depth={depth + 1} />);

  let heading;

  const border = depth > 0 ? { borderLeft: 'none', paddingLeft: 15, marginLeft: 0 } : {};

  if (depth > 0) {
    heading = (
      <div
        className={'category_form'}
        style={{
          padding: '5px 10px',
          // marginLeft: depth * -25,
          paddingLeft: 10 + depth * 25,
          cursor: 'pointer',
        }}
      >
        <div className="p-2">
          <div style={{ justifyContent: 'space-between', display: 'flex' }}>
            <div
              onClick={() => {
                isOpen(!open);
              }}
            >
              <FontAwesomeIcon icon={open ? faFolderOpen : faFolder} />{' '}
              <span>
                {data.name} ({data.parents.length})
              </span>
            </div>
            <div>
              <Link href={`/category/edit/${data.id}`}>
                <a>
                  <FontAwesomeIcon icon={faEdit} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {heading}
      {!!open && data.parents.length > 0 && <div style={border}>{children}</div>}
    </div>
  );
}

export default function CategoryListScreen() {
  const { data } = useQuery(QUERY);
  return (
    <TsContent title="Category">
      <div className="row">
        <div className="col-md-6">
          <Link href={'/category/create'}>
            <a className="btn btn-sm btn-primary">Crate new category</a>
          </Link>
          <br />
          <br />
          <Card>
            <CardBody>
              {data &&
                data.categoryList.map((x: any) => {
                  return <TreeItem data={x} depth={1} />;
                })}
            </CardBody>
          </Card>
        </div>
      </div>
    </TsContent>
  );
}
