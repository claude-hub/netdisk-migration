// Modules
import React, { ReactNode } from 'react';
import CSSModules from 'react-css-modules';

// Components
import PageHeader from './components/page-header';
import PageFooter from './components/page-footer';

// Styles
import styles from './page.scss';

/**
 * Local typings
 */
interface PagePropsI {
  children: ReactNode;
  className?: string;
  styleName?: string;
}

/**
 * Page wrapper component. It setups the common
 * page markup and elements
 */
const Page = ({ children, className }: PagePropsI) => (
  <div styleName="common">
    <PageHeader />

    <div styleName="content" className={className}>
      {children}
    </div>

    <PageFooter />
  </div>
);

export default CSSModules(Page, styles, { allowMultiple: true });
