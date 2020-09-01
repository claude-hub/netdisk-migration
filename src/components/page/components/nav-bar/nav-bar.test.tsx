// Modules
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

// Constants
import { USERS_DASHBOARD_PAGE_URL } from 'constants/routing-urls.constants';

// Components
import NavBar from './nav-bar';
import NavLink from '../nav-link';

/**
 * Local typings
 */
interface CreateNavBarArgsI {
  initialEntries: any[];
}

describe('#nav-bar.tsx', () => {
  const createNavBar = ({ initialEntries = [] }: CreateNavBarArgsI = {} as CreateNavBarArgsI) =>
    mount(
      <MemoryRouter initialEntries={initialEntries}>
        <NavBar />
      </MemoryRouter>
    );

  test('Makes a `NavLink` active if the location pathname and the `NavLink` `url` prop are equal', () => {
    const navBar = createNavBar({ initialEntries: [{ pathname: USERS_DASHBOARD_PAGE_URL }] });
    const navLink = navBar.find(NavLink).find({ url: USERS_DASHBOARD_PAGE_URL });

    expect(navLink.prop('active')).toBe(true);
  });

  test('Makes a `NavLink` non-active if the location pathname and the `NavLink` `url` prop are not equal', () => {
    const navBar = createNavBar({ initialEntries: [{ pathname: `${USERS_DASHBOARD_PAGE_URL} some-url` }] });
    const navLink = navBar.find(NavLink).find({ url: USERS_DASHBOARD_PAGE_URL });

    expect(navLink.prop('active')).toBe(false);
  });
});
