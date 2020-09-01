// Modules
import React, { HTMLProps } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './input.scss';

/**
 * Input props
 */
export interface InputPropsI extends HTMLProps<HTMLInputElement> {
  styleName?: string;
}

/**
 * Common input component. It's just a styles wrapper
 * for the default input component
 */
const Input = (props: InputPropsI) => <input styleName="common" {...props} />;

export default CSSModules(Input, styles);
