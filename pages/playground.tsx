import { gql, useMutation, useQuery } from '@apollo/client';
import SignIn from '../src/components/SignIn';
import { useAuth } from '../src/hook/auth';

const QUERY = gql`
  query playgroundList {
    playgroundList {
      data {
        id
        title
      }
    }
  }
`;

const MUTATION = gql`
  mutation createPlayground($input: PlaygroundInput) {
    createPlayground(input: $input)
  }
`;

export default function PlaygroundPage() {
  let titleInput: any;
  const { isSignedIn } = useAuth();

  const { data, loading } = useQuery(QUERY, { fetchPolicy: 'no-cache' });
  const [createPlayground] = useMutation(MUTATION);
  if (loading || !data) return <div>Loading..</div>;
  const onSave = () => {
    createPlayground({
      variables: {
        input: {
          title: titleInput.value,
        },
      },
      refetchQueries: ['playgroundList'],
      fetchPolicy: 'network-only',
    });
    titleInput.value = '';
  };

  if (!isSignedIn()) {
    return <SignIn />;
  }

  return (
    <>
      <ul>
        {data.playgroundList.data.map((item: any) => {
          return <li>{item.title}</li>;
        })}
      </ul>

      <input type="text" ref={node => (titleInput = node)} placeholder="title" />
      <br />
      <br />
      <button type="button" onClick={onSave}>
        Save
      </button>
    </>
  );
}
