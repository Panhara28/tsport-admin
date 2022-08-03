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
        generalDepartmentRead
        generalDepartmentWrite
        generalDepartmentModify
        generalDepartmentRemove
        departmentRead
        departmentWrite
        departmentModify
        departmentRemove
        officeRead
        officeWrite
        officeModify
        officeRemove
        officerRead
        officerWrite
        officerModify
        officerRemove
      }
    }
  }
`;

const MUTATION = gql`
  mutation roleManageAccess($roleId: Int!, $input: RoleAccessInput) {
    roleManageAccess(roleId: $roleId, input: $input)
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

  const [generalDepartmentRead, setGeneralDepartmentRead] = useState<boolean>(false);
  const [generalDepartmentWrite, setGeneralDepartmentWrite] = useState<boolean>(false);
  const [generalDepartmentModify, setGeneralDepartmentModify] = useState<boolean>(false);
  const [generalDepartmentRemove, setGeneralDepartmentRemove] = useState<boolean>(false);

  const [departmentRead, setDepartmentRead] = useState<boolean>(false);
  const [departmentWrite, setDepartmentWrite] = useState<boolean>(false);
  const [departmentModify, setDepartmentModify] = useState<boolean>(false);
  const [departmentRemove, setDepartmentRemove] = useState<boolean>(false);

  const [officeRead, setOfficeRead] = useState<boolean>(false);
  const [officeWrite, setOfficeWrite] = useState<boolean>(false);
  const [officeModify, setOfficeModify] = useState<boolean>(false);
  const [officeRemove, setOfficeRemove] = useState<boolean>(false);

  const [officerRead, setOfficerRead] = useState<boolean>(false);
  const [officerWrite, setOfficerWrite] = useState<boolean>(false);
  const [officerModify, setOfficerModify] = useState<boolean>(false);
  const [officerRemove, setOfficerRemove] = useState<boolean>(false);

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

      setGeneralDepartmentRead(data?.roleDetail?.access?.generalDepartmentRead);
      setGeneralDepartmentWrite(data?.roleDetail?.access?.generalDepartmentWrite);
      setGeneralDepartmentModify(data?.roleDetail?.access?.generalDepartmentModify);
      setGeneralDepartmentRemove(data?.roleDetail?.access?.generalDepartmentRemove);

      setDepartmentRead(data?.roleDetail?.access?.departmentRead);
      setDepartmentWrite(data?.roleDetail?.access?.departmentWrite);
      setDepartmentModify(data?.roleDetail?.access?.departmentModify);
      setDepartmentRemove(data?.roleDetail?.access?.departmentRemove);

      setOfficeRead(data?.roleDetail?.access?.officeRead);
      setOfficeWrite(data?.roleDetail?.access?.officeWrite);
      setOfficeModify(data?.roleDetail?.access?.officeModify);
      setOfficeRemove(data?.roleDetail?.access?.officeRemove);

      setOfficerRead(data?.roleDetail?.access?.officerRead);
      setOfficerWrite(data?.roleDetail?.access?.officerWrite);
      setOfficerModify(data?.roleDetail?.access?.officerModify);
      setOfficerRemove(data?.roleDetail?.access?.officerRemove);
    },
  });

  if (loading || !data) return <div>Loading...</div>;

  const onSaveAccess = () => {
    roleManageAccess({
      variables: {
        roleId,
        input: {
          read,
          write,
          modify,
          remove,
          generalDepartmentRead,
          generalDepartmentWrite,
          generalDepartmentModify,
          generalDepartmentRemove,
          departmentRead,
          departmentWrite,
          departmentModify,
          departmentRemove,
          officeRead,
          officeWrite,
          officeModify,
          officeRemove,
          officerRead,
          officerWrite,
          officerModify,
          officerRemove,
        },
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
        <p>Plugin Access</p>
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

        <p>General Department Interface</p>
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
                <input
                  type="checkbox"
                  checked={generalDepartmentRead ? true : false}
                  onChange={() => setGeneralDepartmentRead(!generalDepartmentRead)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={generalDepartmentWrite ? true : false}
                  onChange={() => setGeneralDepartmentWrite(!generalDepartmentWrite)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={generalDepartmentModify ? true : false}
                  onChange={() => setGeneralDepartmentModify(!generalDepartmentModify)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={generalDepartmentRemove ? true : false}
                  onChange={() => setGeneralDepartmentRemove(!generalDepartmentRemove)}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <p>Department Interface</p>
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
                <input
                  type="checkbox"
                  checked={departmentRead ? true : false}
                  onChange={() => setDepartmentRead(!departmentRead)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={departmentWrite ? true : false}
                  onChange={() => setDepartmentWrite(!departmentWrite)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={departmentModify ? true : false}
                  onChange={() => setDepartmentModify(!departmentModify)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={departmentRemove ? true : false}
                  onChange={() => setDepartmentRemove(!departmentRemove)}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <p>Office Interface</p>
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
                <input
                  type="checkbox"
                  checked={officeRead ? true : false}
                  onChange={() => setOfficeRead(!officeRead)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={officeWrite ? true : false}
                  onChange={() => setOfficeWrite(!officeWrite)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={officeModify ? true : false}
                  onChange={() => setOfficeModify(!officeModify)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={officeRemove ? true : false}
                  onChange={() => setOfficeRemove(!officeRemove)}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <p>Officer Interface</p>
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
                <input
                  type="checkbox"
                  checked={officerRead ? true : false}
                  onChange={() => setOfficerRead(!officerRead)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={officerWrite ? true : false}
                  onChange={() => setOfficerWrite(!officerWrite)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={officerModify ? true : false}
                  onChange={() => setOfficerModify(!officerModify)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={officerRemove ? true : false}
                  onChange={() => setOfficerRemove(!officerRemove)}
                />
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
