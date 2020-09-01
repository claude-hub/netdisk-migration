// Modules
import React, { ReactNode } from 'react';
import { mount } from 'enzyme';

// Components
import Mask from 'components/mask';
import Modal, { ModalPositionE } from './modal';

// Constants
import { KEYBOARD_ESCAPE } from 'constants/access-keys.constants';

// Typings
import { MouseEventHandlerT, KeyboardEventHandlerT } from 'typings/common.typings';

/**
 * We need to mock `createPortal` in order
 * to be able to test `modal` component correctly
 */
jest.mock('react-dom', () => ({
  createPortal: jest.fn(i => i),
}));

describe('#modal.tsx', () => {
  const createModal = ({
    content = '',
    isShown = true,
    onMaskClick,
    onEscClick,
    position,
  }: {
    content?: ReactNode;
    isShown?: boolean;
    onMaskClick?: MouseEventHandlerT;
    onEscClick?: KeyboardEventHandlerT;
    position?: ModalPositionE;
  } = {}) =>
    mount(
      <Modal isShown={isShown} onMaskClick={onMaskClick} onEscClick={onEscClick} position={position}>
        {content}
      </Modal>
    );

  test('Renders correctly', () => {
    const content = <div>this is content</div>;
    const modal = createModal({ content });

    expect(modal.find('.mask-inner').children().matchesElement(content)).toBe(true);
  });

  test('Does not render the modal if `isShown=false`', () => {
    const modal = createModal({ isShown: false });

    expect(modal.html()).toEqual('');
  });

  test('Fires `onMaskClick` when clicking on the mask', () => {
    const onMaskClick = jest.fn();
    const modal = createModal({ content: 'some content', onMaskClick });

    modal.find(Mask).simulate('click');

    expect(onMaskClick).toBeCalled();
  });

  test('Fires `onEscClick` when clicking on the `escape` button', () => {
    const onEscClick = jest.fn();
    const modal = createModal({ content: 'some content', onEscClick });

    modal.find('.mask-inner').simulate('keydown', { key: KEYBOARD_ESCAPE });

    expect(onEscClick).toBeCalled();
  });

  test('Does not fire `onEscClick` when clicking on the any keyboard button except `escape`', () => {
    const onEscClick = jest.fn();
    const modal = createModal({ content: 'some content', onEscClick });

    modal.find('.mask-inner').simulate('keydown', { key: 'ENTER' });

    expect(onEscClick).not.toBeCalled();
  });

  test('Adds the correct className to the content based on the `position` prop', () => {
    const position = ModalPositionE.BOTTOM_RIGHT;
    const modal = createModal({ content: 'some content', position });

    expect(modal.find('.mask-inner').hasClass(position)).toBe(true);
  });

  test('Does not add the className to the content if the modal position is custom', () => {
    const position = ModalPositionE.CUSTOM;
    const modal = createModal({ content: 'some content', position });

    expect(modal.find('.mask-inner').hasClass(position)).not.toBe(true);
  });
});
