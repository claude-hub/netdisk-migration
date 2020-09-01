// Modules
import React, { ReactNode } from 'react';
import CSSModules from 'react-css-modules';

// Styles
import styles from './label-value.scss';

/**
 * Users list item props
 */
interface LabelValuePropsI {
  label: string;
  value: ReactNode;
  className?: string;
  styleName?: string;
}

/**
 * Label value component for rendering pairs
 * of `label` and `value`
 */
const LabelValue = ({ label, value, className }: LabelValuePropsI) => (
  <div styleName="common" className={className}>
    <div styleName="label">{label}</div> <div styleName="value">{value}</div>
  </div>
);

export default CSSModules(LabelValue, styles);
