// Modules
import React from 'react';
import CSSModules from 'react-css-modules';

// Components
import Button from 'components/button';
import Modal from 'components/modal';
import LabelValue from '../label-value';

// Styles
import styles from './user-details-modal.scss';

/**
 * User details modal props
 */
interface UserDetailsModalPropsI {
  isShown: boolean;
  firstName: string;
  lastName: string;
  thumbnailURL: string;
  username: string;
  email: string;
  locationStreetName: string;
  locationStreetNumber: number;
  locationCity: string;
  locationState: string;
  locationPostcode: number;
  phone: string;
  cell: string;
  closeModal: () => void;
}

/**
 * User details modal component. It shows more
 * detailed user info
 */
const UserDetailsModal = ({
  isShown,
  firstName,
  lastName,
  thumbnailURL,
  username,
  email,
  locationStreetName,
  locationStreetNumber,
  locationCity,
  locationState,
  locationPostcode,
  phone,
  cell,
  closeModal,
}: UserDetailsModalPropsI) => (
  <Modal isShown={isShown} onEscClick={closeModal}>
    <div styleName="common">
      <header styleName="header">
        <h2 styleName="full-name">
          {firstName} {lastName}
        </h2>
      </header>

      <div styleName="content">
        <img styleName="thumbnail" alt="user's avatar" src={thumbnailURL} />

        <div>
          <LabelValue label="Username: " value={username} />
          <LabelValue label="Email: " value={<a href={`mailto: ${email}`}>{email}</a>} />
          <LabelValue label="Street: " value={`${locationStreetName} st. ${locationStreetNumber}`} />
          <LabelValue label="City: " value={locationCity} />
          <LabelValue label="State: " value={locationState} />
          <LabelValue label="Postcode: " value={locationPostcode} />
          <LabelValue label="Phone: " value={phone} />
          <LabelValue label="Cell: " value={cell} />
        </div>
      </div>

      <footer styleName="footer">
        <Button onClick={closeModal}>Close modal</Button>
      </footer>
    </div>
  </Modal>
);

export default CSSModules(UserDetailsModal, styles);
