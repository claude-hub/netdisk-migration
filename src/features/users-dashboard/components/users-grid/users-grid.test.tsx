// Modules
import React, { ComponentType, ReactElement } from 'react';
import { mount } from 'enzyme';

// Components
import { GridFooterPropsI } from 'components/grid';
import InfiniteGrid from 'components/infinite-grid';
import UsersGridItem from '../users-grid-item';
import UsersGrid from './users-grid';

// Typings
import { UserI } from '../../typings/user.typings';

/**
 * We need to mock `AutoSizer` component in order
 * to be able to render the `UsersGrid` component
 * in test env
 */
jest.mock(
  'react-virtualized-auto-sizer',
  () => ({ children }: { children: (props: { width: number; height: number }) => ReactElement }) =>
    children({ width: 500, height: 500 })
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('#users-grid.tsx', () => {
  const defaultShowUserDetailsModal = jest.fn();
  const defaultLoadMoreItems = jest.fn();

  const defaultItemsLimit = 1000;
  const defaultThreshold = 50;
  const defaultUsersList = ([
    {
      picture: {
        thumbnail: 'some-picture',
      },
      name: {
        first: 'Albert',
        last: 'Einstain',
        title: 'Mr',
      },
      email: 'albert@comporationofgood.com',
    },
  ] as unknown) as UserI[];

  const defaultColumnWidth = 200;
  const defaultRowHeight = 100;
  const defaultMinColumnCount = 2;
  const defaultMaxColumnCount = 4;
  const defaultFooterComponent = () => <div>this is footer</div>;

  const createUsersGrid = ({
    usersList = defaultUsersList,
    loadMoreItems = defaultLoadMoreItems,
    showUserDetailsModal = defaultShowUserDetailsModal,
    itemsLimit = defaultItemsLimit,
    threshold = defaultThreshold,
    columnWidth = defaultColumnWidth,
    rowHeight = defaultRowHeight,
    minColumnCount = defaultMinColumnCount,
    maxColumnCount = defaultMaxColumnCount,
    footerComponent = defaultFooterComponent,
  }: {
    usersList?: UserI[];
    loadMoreItems?: () => void;
    showUserDetailsModal?: (user: UserI) => void;
    itemsLimit?: number;
    threshold?: number;
    columnWidth?: number;
    rowHeight?: number;
    minColumnCount?: number;
    maxColumnCount?: number;
    footerComponent?: ComponentType<GridFooterPropsI>;
  } = {}) =>
    mount(
      <UsersGrid
        usersList={usersList}
        loadMoreItems={loadMoreItems}
        showUserDetailsModal={showUserDetailsModal}
        itemsLimit={itemsLimit}
        threshold={threshold}
        columnWidth={columnWidth}
        rowHeight={rowHeight}
        minColumnCount={minColumnCount}
        maxColumnCount={maxColumnCount}
        footerComponent={footerComponent}
      />
    );

  test('Passes correct props to the `InfiniteGrid` and `UsersGridItem` components', () => {
    const usersGrid = createUsersGrid();

    const usersInfiniteGrid = usersGrid.find(InfiniteGrid);

    expect(usersInfiniteGrid.prop('loadMoreItems')).toEqual(defaultLoadMoreItems);
    expect(usersInfiniteGrid.prop('itemCount')).toEqual(defaultItemsLimit);
    expect(usersInfiniteGrid.prop('threshold')).toEqual(defaultThreshold);
    expect(usersInfiniteGrid.prop('columnWidth')).toEqual(defaultColumnWidth);
    expect(usersInfiniteGrid.prop('rowHeight')).toEqual(defaultRowHeight);
    expect(usersInfiniteGrid.prop('data')).toEqual(defaultUsersList);
    expect(usersInfiniteGrid.prop('minColumnCount')).toEqual(defaultMinColumnCount);
    expect(usersInfiniteGrid.prop('maxColumnCount')).toEqual(defaultMaxColumnCount);
    expect(usersInfiniteGrid.prop('footerComponent')).toEqual(defaultFooterComponent);

    const usersGridItem = usersGrid.find(UsersGridItem);

    expect(usersGridItem.length).toEqual(1);

    expect(usersGridItem.at(0).prop('onShowMoreDetailsClick')).toBeInstanceOf(Function);

    expect(usersGridItem.at(0).prop('thumbnailURL')).toEqual(defaultUsersList[0].picture.thumbnail);
    expect(usersGridItem.at(0).prop('firstName')).toEqual(defaultUsersList[0].name.first);
    expect(usersGridItem.at(0).prop('lastName')).toEqual(defaultUsersList[0].name.last);
    expect(usersGridItem.at(0).prop('username')).toEqual('albert');
    expect(usersGridItem.at(0).prop('email')).toEqual(defaultUsersList[0].email);
  });

  test('Calls `showUserDetailsModal` with correct argument', () => {
    const usersGrid = createUsersGrid();

    const usersGridItem = usersGrid.find(UsersGridItem);

    usersGridItem.prop('onShowMoreDetailsClick')();

    expect(defaultShowUserDetailsModal).toBeCalledWith(defaultUsersList[0]);
  });
});
