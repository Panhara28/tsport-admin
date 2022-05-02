import { useRouter } from 'next/router';
import { EditPeopleInfoScreen } from '../../../../../../src/Screens/websites/People/EditPeopleInfoScreen';

export default function EditPeopleInfo() {
  const router = useRouter();

  return <EditPeopleInfoScreen peopleEditId={Number(router.query.editPeopleId)} />;
}
