// Modules
import React, { Fragment } from 'react';
import CSSModules from 'react-css-modules';
import Loader from 'react-loader';

// Styles
import styles from './users-grid-footer.scss';

/**
 * Users grid footer props
 */
interface UsersGridFooterPropsI {
  isLoading: boolean;
  isEndReached: boolean;
}

/**
 * Users grid footer component. It renders a spinner
 * when loading more users and text indicating that
 * all users have been downloaded when reaching the end.
 * Also, it renders nothing if there's no loading and the end
 * is not reached
 */
const UsersGridFooter = ({ isLoading, isEndReached }: UsersGridFooterPropsI) => {
  let content = null;

  if (isLoading) {
    content = (
      <Fragment>
        <div styleName="loader">
          <Loader loaded={false} />
        </div>
        loading
      </Fragment>
    );
  } else if (isEndReached) {
    content = <div>End of users catalog</div>;
  }

  return <div styleName="common">{content}</div>;
};

export default CSSModules(UsersGridFooter, styles);
