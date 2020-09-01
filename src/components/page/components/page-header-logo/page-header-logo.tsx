// Modules
import React from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './page-header-logo.scss';

/**
 * Page header logo component.
 */
const PageHeaderLogo = () => <img styleName="common" alt="logo" src="/images/logo.jpg" />;

export default CSSModules(PageHeaderLogo, styles, { allowMultiple: true });
