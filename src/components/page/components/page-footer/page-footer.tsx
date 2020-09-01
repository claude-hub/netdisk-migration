// Modules
import React from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './page-footer.scss';

/**
 * Page footer component.
 */
const PageFooter = () => <div styleName="common">Address book app.</div>;

export default CSSModules(PageFooter, styles, { allowMultiple: true });
