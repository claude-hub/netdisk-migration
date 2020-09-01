// Modules
import React, { ReactNode } from 'react';
import CSSModules from 'react-css-modules';

// Typings
import { MouseEventHandlerT } from 'typings/common.typings';

// Styles
import styles from './button.scss';

/**
 * Button props
 */
interface ButtonPropsI {
  onClick?: MouseEventHandlerT;
  children: ReactNode;
  className?: string;
  styleName?: string;
}

/**
 * Common button component
 */
const Button = ({ children, onClick, className }: ButtonPropsI) => (
  <button styleName="common" onClick={onClick} className={className}>
    {children}
  </button>
);

export default CSSModules(Button, styles);
