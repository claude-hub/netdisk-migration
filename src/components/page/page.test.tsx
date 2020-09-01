// Modules
import React, { ReactNode } from 'react';
import { shallow } from 'enzyme';

// Components
import Page from './page';

/**
 * Local typings
 */
interface CreatePageArgsI {
  content?: ReactNode;
  className?: string;
}

describe('#page.jsx', () => {
  const createPage = ({ content = '', className }: CreatePageArgsI = {}) =>
    shallow(<Page className={className}>{content}</Page>);

  test('Renders content correctly', () => {
    const content = 'This is page content';
    const page = createPage({ content });

    expect(page.find('.content').text()).toEqual(content);
  });

  test('Passes `className` correctly', () => {
    const className = 'some-classname';
    const page = createPage({ className });

    expect(page.find('.content').hasClass(className)).toBe(true);
  });
});
