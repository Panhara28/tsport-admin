import { PropsWithChildren } from 'react';
import { setting } from '../../libs/settings';
import { Breadcrumb } from '../Common/Breadcrumb';
import Layout from '../VerticalLayout';

export function TsContent(props: PropsWithChildren<{ title: string }>) {
  return (
    <Layout>
      <div className="page-content">
        <Breadcrumb breadcrumbItem={props.title} title={setting.title} />
        <hr />
        {props.children}
      </div>
    </Layout>
  );
}
