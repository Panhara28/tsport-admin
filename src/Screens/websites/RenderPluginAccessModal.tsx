import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Modal, Table } from 'react-bootstrap';
import Notiflix from 'notiflix';

const QUERY = gql`
  query adminPluginManageAccessForUserDetail($websiteId: Int!, $pluginId: Int!, $userId: Int!) {
    adminPluginManageAccessForUserDetail(websiteId: $websiteId, pluginId: $pluginId, userId: $userId) {
      read
      create
      edit
      remove
    }
  }
`;

const MUTATION = gql`
  mutation pluginManageAccessForUser(
    $websiteId: Int!
    $pluginId: Int!
    $userId: Int!
    $read: Boolean
    $write: Boolean
    $modified: Boolean
    $remove: Boolean
  ) {
    pluginManageAccessForUser(
      websiteId: $websiteId
      pluginId: $pluginId
      userId: $userId
      read: $read
      write: $write
      modified: $modified
      remove: $remove
    )
  }
`;

type ModalProps = {
  show: boolean;
  handleClose: () => void;
  pluginId: number;
  read: boolean;
  write: boolean;
  modified: boolean;
  remove: boolean;
  setRead: any;
  setWrite: any;
  setModified: any;
  setRemove: any;
  websiteId: number;
  userId: number;
};

export function RenderPluginAccessModal({
  show,
  handleClose,
  pluginId,
  read,
  write,
  modified,
  remove,
  setRead,
  setWrite,
  setModified,
  setRemove,
  websiteId,
  userId,
}: ModalProps) {
  const [pluginManageAccessForUser] = useMutation(MUTATION, {
    onCompleted: data => {
      Notiflix.Notify.success('Access has been granted');
    },
  });
  const { data, loading } = useQuery(QUERY, {
    variables: {
      websiteId,
      userId,
      pluginId,
    },
    onCompleted: data => {
      setRead(data.adminPluginManageAccessForUserDetail.read);
      setModified(data.adminPluginManageAccessForUserDetail.edit);
      setRemove(data.adminPluginManageAccessForUserDetail.remove);
      setWrite(data.adminPluginManageAccessForUserDetail.create);
    },
    fetchPolicy: 'no-cache',
  });
  if (loading || !data) return <div>Loading...</div>;

  const onSaveAccess = () => {
    pluginManageAccessForUser({
      variables: {
        websiteId,
        pluginId,
        userId,
        read,
        modified,
        write,
        remove,
      },
      refetchQueries: ['pluginManageAccessForUserDetail'],
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Plugin Access {pluginId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This is the decription for plugin access</p>
        <Table>
          <thead>
            <tr>
              <th>Read</th>
              <th>Write</th>
              <th>Modified</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" checked={read ? true : false} onChange={() => setRead(!read)} />
              </td>
              <td>
                <input type="checkbox" checked={write ? true : false} onChange={() => setWrite(!write)} />
              </td>
              <td>
                <input type="checkbox" checked={modified ? true : false} onChange={() => setModified(!modified)} />
              </td>
              <td>
                <input type="checkbox" checked={remove ? true : false} onChange={() => setRemove(!remove)} />
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSaveAccess}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
