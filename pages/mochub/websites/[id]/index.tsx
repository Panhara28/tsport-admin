import { ContentManagementScreen } from '../../../../src/Screens/websites/ContentManagementScreen';

export default function WebsiteDetail() {
  return <ContentManagementScreen />;
}

export async function getServerSideProps({ params }: any) {
  return {
    props: {
      success: true,
    },
  };
}
