// Modules
import React, { ReactNode, useCallback, KeyboardEvent } from 'react';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';

// Components
import Mask from 'components/mask';

// Constants
import { KEYBOARD_ESCAPE } from 'constants/access-keys.constants';

// HOCs
import PortalHoc from 'hoc/portal-hoc';

// Typings
import { MouseEventHandlerT, KeyboardEventHandlerT } from 'typings/common.typings';

// Styles
import styles from './modal.scss';

/**
 * Local typings
 */
interface ModalPropsI {
  isShown: boolean;
  children: ReactNode;
  onMaskClick?: MouseEventHandlerT;
  onEscClick?: KeyboardEventHandlerT;
  position?: ModalPositionE;
}

/**
 * Local constants
 */
export enum ModalPositionE {
  TOP_LEFT = 'top-left',
  TOP_CENTER = 'top-center',
  TOP_RIGHT = 'top-right',

  MIDDLE_LEFT = 'middle-left',
  MIDDLE = 'middle-center',
  MIDDLE_RIGHT = 'middle-right',

  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_CENTER = 'bottom-center',
  BOTTOM_RIGHT = 'bottom-right',

  CUSTOM = 'custom',
}

const defaultFuncPropValue = () => {};

/**
 * Modal window component
 */
const Modal = ({
  isShown,
  onMaskClick = defaultFuncPropValue,
  onEscClick = defaultFuncPropValue,
  children,
  position = ModalPositionE.MIDDLE,
}: ModalPropsI) => {
  /**
   * Fire `onEscClick` if the user pressed the
   * `escape` button
   */
  const onKeyDown = useCallback(
    (evt: KeyboardEvent<HTMLElement>) => {
      if (evt.key === KEYBOARD_ESCAPE && onEscClick) {
        onEscClick(evt);
      }
    },
    [onEscClick]
  );

  if (!isShown) {
    return null;
  }

  return (
    <Mask onClick={onMaskClick}>
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        styleName={classNames('mask-inner', {
          [position as string]: position !== ModalPositionE.CUSTOM,
        })}
      >
        {children}
      </div>
    </Mask>
  );
};

export default PortalHoc(CSSModules(Modal, styles, { allowMultiple: true }));
