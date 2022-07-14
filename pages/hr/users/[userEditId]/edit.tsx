import { useRouter } from 'next/router';
import { CreateUserScreen } from '../../../../src/Screens/Users/CreateUserScreen';

export default function UserEditPage() {
  const router = useRouter();
  return <CreateUserScreen userEditId={Number(router.query.userEditId)} />;
}
