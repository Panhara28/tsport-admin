import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Modal, Table } from 'react-bootstrap';
import Notiflix from 'notiflix';
import { useState } from 'react';

const QUERY = gql`
  query roleDetail($roleId: Int!) {
    roleDetail(roleId: $roleId) {
      id
      name
      access {
        read
        write
        modify
        delete
      }
    }
  }
`;

const MUTATION = gql`
  mutation roleManageAccess($roleId: Int!, $read: Boolean, $write: Boolean, $modify: Boolean, $remove: Boolean) {
    roleManageAccess(roleId: $roleId, read: $read, write: $write, modify: $modify, remove: $remove)
  }
`;

type ModalProps = {
  show: number;
  handleClose: () => void;
  roleId: number;
};

export function RenderRoleModal({ show, handleClose, roleId }: ModalProps) {
  const [roleManageAccess] = useMutation(MUTATION, {
    onCompleted: data => {
      if (data.roleManageAccess) {
        Notiflix.Notify.success('Access has been granted');
      }
    },
  });

  const [read, setRead] = useState<boolean>(false);
  const [write, setWrite] = useState<boolean>(false);
  const [modify, setModify] = useState<boolean>(false);
  const [remove, setRemove] = useState<boolean>(false);

  const { data, loading } = useQuery(QUERY, {
    variables: {
      roleId,
    },
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      setWrite(data?.roleDetail?.access?.write);
      setRead(data?.roleDetail?.access?.read);
      setModify(data?.roleDetail?.access?.modify);
      setRemove(data?.roleDetail?.access?.delete);
    },
  });

  if (loading || !data) return <div>Loading...</div>;

  const onSaveAccess = () => {
    roleManageAccess({
      variables: {
        roleId,
        read,
        write,
        modify,
        remove,
      },
    });
    handleClose();
  };
  return (
    <Modal show={show === roleId} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{data?.roleDetail?.name} Role Access</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This is the decription for plugin access</p>
        <Table responsive hover striped>
          <thead>
            <tr>
              <th>Read</th>
              <th>Write</th>
              <th>Modify</th>
              <th>Remove</th>
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
                <input type="checkbox" checked={modify ? true : false} onChange={() => setModify(!modify)} />
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
