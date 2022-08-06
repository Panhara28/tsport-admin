import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CardBody } from 'reactstrap';
import { Table } from 'reactstrap';
import { Card } from 'reactstrap';
import { TsContent } from '../../components/Custom/TsContent';

const QUERY = gql`
  query bannerList {
    bannerList
  }
`;

export function BannerListScreen() {
  const { data } = useQuery(QUERY);

  return (
    <TsContent title="Banner List">
      <div className="row">
        <div className="col-md-6">
          <Card>
            <CardBody>
              <Table className="table-centered table-nowrap mb-0" hover striped>
                <thead>
                  <tr>
                    <th className="text-left" style={{ width: 250 }}>
                      Image
                    </th>
                    <th>Name</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.bannerList.map((x: any) => {
                      return (
                        <tr key={x.id}>
                          <td className="text-left p-0" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Image
                              loader={() => {
                                return x.image;
                              }}
                              src={
                                'https://media.istockphoto.com/photos/long-horizontal-fabric-banner-hanging-from-a-rope-picture-id1345834426?b=1&k=20&m=1345834426&s=170667a&w=0&h=KrLLdnfQf9T2FC6tNdvWmd3H6X-MTzMfN3illwRum3g='
                              }
                              width={250}
                              height={110}
                              alt=""
                            />
                          </td>
                          <td>{x.name}</td>

                          <td className="text-right">
                            <Link href={'/banner/edit/' + x.id}>
                              <a className="btn btn-sm btn-primary">Edit</a>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      </div>
    </TsContent>
  );
}
