import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

export const CustomModal = styled(Modal)`
  .modal-90w {
    max-width: none !important;
    width: 70%;
  }
`;

export const CustomTableContainer = styled.div`
  .table-responsive {
    overflow: visible;
  }

  .profile_picture {
    max-width: 100%;
    width: 3.2em;
    height: 3.2em;

    img {
      border-radius: 50%;
    }

    &:hover {
      cursor: pointer;
    }
  }
`;
