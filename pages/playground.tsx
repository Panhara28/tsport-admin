import { gql, useMutation, useQuery } from '@apollo/client';

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
  const { data, loading } = useQuery(QUERY);
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
    });
    titleInput.value = '';
  };
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
