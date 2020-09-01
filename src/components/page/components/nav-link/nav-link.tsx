// Modules
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

// Styles
import styles from './nav-link.scss';

/**
 * Local typings
 */
interface NavLinkPropsI {
  children: ReactNode;
  url: string;
  active?: boolean;
  className?: string;
  styleName?: string;
}

/**
 * Page navigation link component.
 */
const NavLink = ({ children, url, active, className }: NavLinkPropsI) => (
  <Link styleName={classNames('common', { active })} className={className} to={url}>
    {children}
  </Link>
);

export default CSSModules(NavLink, styles, { allowMultiple: true });
