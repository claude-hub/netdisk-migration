// Modules
import React, { ReactNode } from 'react';
import CSSModules from 'react-css-modules';

// Typings
import { MouseEventHandlerT } from 'typings/common.typings';

// Styles
import styles from './mask.scss';

/**
 * Local typings
 */
interface MaskPropsI {
  children: ReactNode;
  onClick?: MouseEventHandlerT;
}

/**
 * Local constants
 */
const defaultFuncPropValue = () => {};

/**
 * Mask component
 */
const Mask = ({ children, onClick = defaultFuncPropValue }: MaskPropsI) => (
  <div onClick={onClick} styleName="common">
    {children}
  </div>
);

export default CSSModules(Mask, styles, { allowMultiple: true });
