import { Breadcrumb } from '../../components/Common/Breadcrumb';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';

export function DashboardScreen() {
  return (
    <Layout>
      <div className="page-content">
        <Breadcrumb breadcrumbItem="Dashboard" title={setting.title} />
        <hr />
      </div>
    </Layout>
  );
}
