// Modules
import React, { ComponentType, LegacyRef, useCallback, useMemo } from 'react';
import { FixedSizeGrid, FixedSizeGridProps, GridChildComponentProps } from 'react-window';

/**
 * Grid child component props
 */
export interface GridChildPropsI<T extends object> {
  columnIndex: number;
  rowIndex: number;
  isScrolling?: boolean;
  data: T;
}

/**
 * Grid footer component props
 */
export interface GridFooterPropsI {
  columnIndex: number;
  rowIndex: number;
  isScrolling?: boolean;
}

/**
 * Grid footer component type
 */
type GridFooterT = ComponentType<GridFooterPropsI>;

/**
 * Grid props interface
 */
export interface GridPropsI<T extends object>
  extends Omit<FixedSizeGridProps, 'columnCount' | 'rowCount' | 'children'> {
  data: T[];
  minColumnCount: number;
  maxColumnCount: number;
  forwardRef?: LegacyRef<FixedSizeGrid>;
  footerComponent?: GridFooterT;
  children: ({ columnIndex, rowIndex, isScrolling, data }: GridChildPropsI<T>) => JSX.Element | null;
}

/**
 * Helper for calculating the number of columns
 */
const calcColumnCount = ({
  minColumnCount,
  maxColumnCount,
  width,
  columnWidth,
}: {
  minColumnCount: number;
  maxColumnCount: number;
  width: number;
  columnWidth: number;
}) => {
  const availableColumnCount = Math.floor(width / columnWidth);

  if (availableColumnCount > maxColumnCount) {
    return maxColumnCount;
  } else if (availableColumnCount < minColumnCount) {
    return minColumnCount;
  }

  return availableColumnCount;
};

/**
 * Helper for calculating row count
 */
const calcRowCount = ({
  dataLength,
  columnCount,
  hasFooter,
}: {
  dataLength: number;
  columnCount: number;
  hasFooter: boolean;
}) => {
  const rowCount = Math.ceil(dataLength / columnCount);

  return hasFooter ? rowCount + 1 : rowCount;
};

/**
 * Type guard for indicating if the grid has a footer component
 */
const hasFooter = (FooterComponent?: GridFooterT): FooterComponent is GridFooterT => !!FooterComponent;

/**
 * Wrapper for a Grid component from `react-window`.
 * It automatically calculates the amount of columns and rows needed.
 */
const Grid = <T extends object>({
  forwardRef,
  width,
  height,
  data,
  columnWidth,
  rowHeight,
  minColumnCount,
  maxColumnCount,
  children,
  footerComponent: FooterComponent,
  ...rest
}: GridPropsI<T>) => {
  /**
   * Memoized column count
   */
  const columnCount = useMemo(() => calcColumnCount({ maxColumnCount, minColumnCount, width, columnWidth }), [
    columnWidth,
    minColumnCount,
    maxColumnCount,
    width,
  ]);

  /**
   * Memoized row count
   */
  const rowCount = useMemo(
    () => calcRowCount({ dataLength: data.length, columnCount, hasFooter: hasFooter(FooterComponent) }),
    [data.length, columnCount, FooterComponent]
  );

  /**
   * Data item getter by column and row indexes
   */
  const getDataItem = useCallback((columnIndex, rowIndex) => data[rowIndex * columnCount + columnIndex], [
    data,
    columnCount,
  ]);

  /**
   * Memoized grid item renderer
   */
  const renderGridItem = useCallback(
    ({ rowIndex, columnIndex, style, isScrolling }: GridChildComponentProps) => {
      /**
       * If the user has passed a footer component and it's the
       * last row, then we should use this row for rendering the user
       * footer.
       */
      if (hasFooter(FooterComponent) && rowIndex === rowCount - 1) {
        if (columnIndex === 0) {
          return (
            <div style={{ ...style, width }}>
              <FooterComponent rowIndex={rowIndex} columnIndex={columnIndex} isScrolling={isScrolling} />
            </div>
          );
        }

        return null;
      }

      const data = getDataItem(columnIndex, rowIndex);

      return data ? <div style={style}>{children({ rowIndex, columnIndex, isScrolling, data })}</div> : null;
    },
    [children, width, FooterComponent, rowCount, getDataItem]
  );

  return (
    <FixedSizeGrid
      ref={forwardRef}
      width={width}
      height={height}
      columnWidth={columnWidth}
      rowHeight={rowHeight}
      columnCount={columnCount}
      rowCount={rowCount}
      {...rest}
    >
      {renderGridItem}
    </FixedSizeGrid>
  );
};

export default Grid;
