// Modules
import React, { ReactNode } from 'react';
import { shallow } from 'enzyme';

// Typings
import { MouseEventHandlerT } from 'typings/common.typings';

// Components
import Button from './button';

describe('#button.tsx', () => {
  const createButton = ({
    content = '',
    className,
    onClick,
  }: {
    content?: ReactNode;
    className?: string;
    onClick?: MouseEventHandlerT;
  } = {}) =>
    shallow(
      <Button className={className} onClick={onClick}>
        {content}
      </Button>
    );

  test('Renders correctly', () => {
    const content = <div>this is button</div>;
    const button = createButton({ content });

    expect(button.find('.common').children().matchesElement(content)).toBe(true);
  });

  test('Passes `onClick` correctly', () => {
    const onClick = jest.fn();
    const button = createButton({ onClick });

    expect(button.find('.common').prop('onClick')).toEqual(onClick);
  });

  test('Passes `className` correctly', () => {
    const className = 'some-class';
    const button = createButton({ className });

    expect(button.find('.common').hasClass(className)).toBe(true);
  });
});
