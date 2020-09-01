// Modules
import React from 'react';
import { shallow } from 'enzyme';
import Loader from 'react-loader';

// Components
import UsersGridFooter from './users-grid-footer';

describe('#users-grid-footer.tsx', () => {
  const createUsersGridFooter = ({
    isLoading = false,
    isEndReached = false,
  }: {
    isLoading?: boolean;
    isEndReached?: boolean;
  } = {}) => shallow(<UsersGridFooter isLoading={isLoading} isEndReached={isEndReached} />);

  test('Renders correctly when loading', () => {
    const usersGridFooter = createUsersGridFooter({ isLoading: true });

    expect(usersGridFooter.find(Loader).exists()).toBe(true);
    expect(usersGridFooter.find('.common').children().at(1).text()).toContain('loading');
  });

  test('Renders correctly when the end is reached', () => {
    const usersGridFooter = createUsersGridFooter({ isEndReached: true });

    expect(usersGridFooter.find(Loader).exists()).toBe(false);
    expect(usersGridFooter.find('.common').children().text()).toContain('End of users catalog');
  });

  test('Renders correctly when not loading and the end is not reached', () => {
    const usersGridFooter = createUsersGridFooter();

    expect(usersGridFooter.find('.common').children().isEmptyRender()).toBe(true);
  });
});
