// Modules
import React from 'react';
import CSSModules from 'react-css-modules';

// Components
import PageHeaderLogo from '../page-header-logo';
import NavBar from '../nav-bar';

// Styles
import styles from './page-header.scss';

/**
 * Page header component
 */
const PageHeader = () => (
  <div styleName="common">
    <div styleName="logo">
      <PageHeaderLogo />
    </div>

    <div styleName="nav-bar">
      <NavBar />
    </div>
  </div>
);

export default CSSModules(PageHeader, styles, { allowMultiple: true });
