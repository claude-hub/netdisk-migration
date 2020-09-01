// Modules
import React from 'react';
import CSSModules from 'react-css-modules';

// Components
import Button from 'components/button';
import LabelValue from '../label-value';

// Styles
import styles from './users-grid-item.scss';

/**
 * Users grid item props
 */
interface UsersGridItemPropsI {
  thumbnailURL: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  onShowMoreDetailsClick: () => void;
}

/**
 * Users grid item component to be rendered
 * in a users grid. It shows the general info about the user.
 */
const UsersGridItem = ({
  thumbnailURL,
  firstName,
  lastName,
  username,
  email,
  onShowMoreDetailsClick,
}: UsersGridItemPropsI) => (
  <div styleName="common">
    <div styleName="main-content">
      <img styleName="thumbnail" alt="user's avatar" src={thumbnailURL} />

      <div styleName="info-block">
        <LabelValue label="Name: " value={`${firstName} ${lastName}`} />

        <LabelValue label="Username: " value={username} />

        <LabelValue label="Email: " value={<a href={`mailto: ${email}`}>{email}</a>} />
      </div>
    </div>

    <Button onClick={onShowMoreDetailsClick}>Show more details</Button>
  </div>
);

export default CSSModules(UsersGridItem, styles);
