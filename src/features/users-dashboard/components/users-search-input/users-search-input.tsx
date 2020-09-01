// Modules
import React from 'react';
import CSSModules from 'react-css-modules';

// Components
import Input from 'components/input';

// Typings
import { InputChangeEventHandlerT } from 'typings/common.typings';

// Styles
import styles from './users-search-input.scss';

/**
 * Users search input
 */
export interface UsersSearchInputPropsI {
  value: string;
  onChange: InputChangeEventHandlerT;
  metaMessage: string | null;
}

/**
 * Users search input container. It is used for
 * searching for a user
 */
const UsersSearchInput = ({ value, onChange, metaMessage }: UsersSearchInputPropsI) => (
  <div styleName="common">
    <Input styleName="input" value={value} onChange={onChange} placeholder="Search for the users..." />

    <div styleName="meta-msg">{metaMessage || null}</div>
  </div>
);

export default CSSModules(UsersSearchInput, styles);
