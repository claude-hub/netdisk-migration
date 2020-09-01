// Modules
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';

// Components
import NavLink from './nav-link';

/**
 * Local typings
 */
interface CreateNavLinkArgsI {
  content?: ReactNode;
  url?: string;
  active?: boolean;
  className?: string;
}

describe('#nav-link.tsx', () => {
  const createNavLink = ({ content = '', url = '', active = false, className = '' }: CreateNavLinkArgsI = {}) =>
    shallow(
      <NavLink url={url} active={active} className={className}>
        {content}
      </NavLink>
    );

  test('Renders content correctly', () => {
    const content = 'This is nav link';
    const navLink = createNavLink({ content });

    expect(navLink.find('.common').text()).toEqual(content);
  });

  test('Passes `url` prop correctly', () => {
    const url = '/some-url';
    const navLink = createNavLink({ url });

    expect(navLink.find(Link).prop('to')).toEqual(url);
  });

  test('Passes `className` prop correctly', () => {
    const className = 'some-class-name';
    const navLink = createNavLink({ className });

    expect(navLink.find(Link).hasClass(className)).toBe(true);
  });

  test('Sets `active` className if we pass `active={true}` prop', () => {
    const navLink = createNavLink({ active: true });

    expect(navLink.find('.common').hasClass('active')).toBe(true);
  });
});
