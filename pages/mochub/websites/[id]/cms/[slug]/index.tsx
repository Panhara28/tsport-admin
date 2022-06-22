import { StatisticsScreen } from '../../../../../../src/Screens/websites/Cms/Statistics';
import { NewsListScreen } from '../../../../../../src/Screens/websites/Cms/News';
import { OfficialDocumentScreen } from '../../../../../../src/Screens/websites/Cms/OfficialDocuments';

export default function Cms({ slug }: { slug: string }) {
  let plugin;
  if (slug === 'news') {
    plugin = <NewsListScreen />;
  } else if (slug === 'official-documents') {
    plugin = <OfficialDocumentScreen />;
  } else if (slug === 'statistics') {
    plugin = <StatisticsScreen />;
  }
  return plugin;
}

export async function getServerSideProps({ params }: any) {
  const { slug } = params;
  return {
    props: {
      slug,
    },
  };
}
