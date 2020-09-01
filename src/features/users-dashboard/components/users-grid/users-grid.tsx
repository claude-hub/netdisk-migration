// Modules
import React, { ComponentType } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

// Components
import { GridFooterPropsI } from 'components/grid';
import InfiniteGrid from 'components/infinite-grid';
import UsersGridItem from '../users-grid-item';

// Utils
import * as userGetters from '../../utils/user-getters.utils';

// Typings
import { UserI } from '../../typings/user.typings';

/**
 * Users grid props
 */
export interface UsersGridPropsI {
  usersList: UserI[];
  loadMoreItems: () => void;
  showUserDetailsModal: (user: UserI) => void;
  itemsLimit: number;
  threshold?: number;
  columnWidth?: number;
  rowHeight?: number;
  minColumnCount?: number;
  maxColumnCount?: number;
  footerComponent?: ComponentType<GridFooterPropsI>;
}

/**
 * Users grid component. It renders an infinite
 * grid of users
 */
const UsersGrid = ({
  usersList,
  loadMoreItems,
  showUserDetailsModal,
  itemsLimit = 1000,
  threshold = 50,
  columnWidth = 400,
  rowHeight = 150,
  minColumnCount = 1,
  maxColumnCount = 5,
  footerComponent,
}: UsersGridPropsI) => {
  return (
    <AutoSizer>
      {({ width, height }: { width: number; height: number }) => (
        <InfiniteGrid
          width={width}
          height={height}
          data={usersList}
          loadMoreItems={loadMoreItems}
          itemCount={itemsLimit}
          threshold={threshold}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          maxColumnCount={maxColumnCount}
          minColumnCount={minColumnCount}
          footerComponent={footerComponent}
        >
          {({ data: user }) => (
            <UsersGridItem
              onShowMoreDetailsClick={() => showUserDetailsModal(user)}
              thumbnailURL={userGetters.getUserPictureThumbnail(user)}
              firstName={userGetters.getUserNameFirst(user)}
              lastName={userGetters.getUserNameLast(user)}
              username={userGetters.getUserUsername(user)}
              email={userGetters.getUserEmail(user)}
            />
          )}
        </InfiniteGrid>
      )}
    </AutoSizer>
  );
};

export default UsersGrid;
