// Modules
import React, { ReactNode } from 'react';
import { shallow } from 'enzyme';

// Components
import Mask from './mask';

// Typings
import { MouseEventHandlerT } from 'typings/common.typings';

describe('#mask.tsx', () => {
  const createMask = ({ content, onClick }: { content: ReactNode; onClick?: MouseEventHandlerT }) =>
    shallow(<Mask onClick={onClick}>{content}</Mask>);

  test('Renders correctly', () => {
    const content = <div>this is content</div>;

    const mask = createMask({ content });

    expect(mask.find('.common').children().matchesElement(content)).toBe(true);
  });

  test('Passes `onClick` correctly', () => {
    const onClick = jest.fn();
    const content = <div>this is content</div>;

    const mask = createMask({ content, onClick });

    expect(mask.find('.common').prop('onClick')).toEqual(onClick);
  });
});
