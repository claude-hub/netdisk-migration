// Modules
import React, { useCallback } from 'react';
import InfiniteLoader from 'react-window-infinite-loader';
import { GridOnItemsRenderedProps, ListOnItemsRenderedProps } from 'react-window';

// Components
import Grid, { GridPropsI } from 'components/grid';

/**
 * Local typings
 */
interface InfiniteGridPropsI<T extends object> extends GridPropsI<T> {
  loadMoreItems:
    | ((startIndex: number, stopIndex: number) => Promise<any> | null | void)
    | (() => Promise<any> | null | void);
  itemCount: number;
  threshold?: number;
  minimumBatchSize?: number;
  useOverscanForLoading?: boolean;
}

/**
 * Wrapper for `react-window-infinite-loader` library
 * to use it with a grid
 */
const InfiniteGrid = <T extends object>({
  loadMoreItems,
  itemCount,
  threshold = 50,
  minimumBatchSize,
  children,
  data,
  useOverscanForLoading = false,
  ...rest
}: InfiniteGridPropsI<T>) => {
  /**
   * Returns `true` if item was loaded (depends on `data`)
   * InfiniteLoader property
   */
  const isItemLoaded = useCallback((idx: number) => !!data && !!data.length && idx < data.length, [data]);

  /**
   * Parser for calling list `onItemsRendered` with
   * grid's arguments.
   */
  const parseListInItemsRenderedToGrid = useCallback(
    (onItemsRendered: (props: ListOnItemsRenderedProps) => void) => ({
      visibleRowStartIndex,
      visibleRowStopIndex,
      visibleColumnStopIndex,
      overscanRowStartIndex,
      overscanRowStopIndex,
      overscanColumnStopIndex,
    }: GridOnItemsRenderedProps) => {
      const endCol = (useOverscanForLoading ? overscanColumnStopIndex : visibleColumnStopIndex) + 1;

      const startRow = useOverscanForLoading ? overscanRowStartIndex : visibleRowStartIndex;
      const endRow = useOverscanForLoading ? overscanRowStopIndex : visibleRowStopIndex;

      const visibleStartIndex = startRow * endCol;
      const visibleStopIndex = endRow * endCol;

      // @ts-ignore
      onItemsRendered({
        // call onItemsRendered from InfiniteLoader so it can load more if needed
        visibleStartIndex,
        visibleStopIndex,
      });
    },
    [useOverscanForLoading]
  );

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      // @ts-ignore
      loadMoreItems={loadMoreItems}
      itemCount={itemCount}
      threshold={threshold}
      minimumBatchSize={minimumBatchSize}
    >
      {({ onItemsRendered, ref }) => (
        <Grid {...rest} onItemsRendered={parseListInItemsRenderedToGrid(onItemsRendered)} forwardRef={ref} data={data}>
          {children}
        </Grid>
      )}
    </InfiniteLoader>
  );
};

export default InfiniteGrid;
