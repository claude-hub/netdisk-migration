// Modules
import React, { ComponentType } from 'react';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';

// Components
import Grid, { GridChildPropsI, GridFooterPropsI } from './grid';

/**
 * Grid footer type
 */
type GridFooterT = ComponentType<GridFooterPropsI>;

/**
 * Data interface
 */
interface DataI {
  id: number;
  userName: string;
  description: string;
}

/**
 * Local constants
 */
const generateData = (length: number = 4): DataI[] =>
  new Array(length).fill(null).map((_, index) => ({
    id: index,
    userName: `Albert ${index}`,
    description: `Some desc ${index}`,
  }));

/**
 * Grid item component
 */
const GridItemComponent = ({ columnIndex, rowIndex }: GridChildPropsI<object>) => (
  <div>
    Hello, columnIndex: {columnIndex}, rowIndex: {rowIndex}!
  </div>
);

/**
 * Grid footer component
 */
const GridFooterComponent = () => <div>Luke, I'm your father!</div>;

/**
 * Helper for mocking and imitating resize the window
 */
const resizeWindow = ({ width, height }: { width: number; height: number }) => {
  window = Object.assign(window, { innerWidth: width, innerHeight: height }); // eslint-disable-line no-global-assign
  window.dispatchEvent(new Event('resize'));
};

/**
 * Helper for creating a grid component
 */
const createGrid = ({
  footerComponent,
  data = generateData(),
}: { footerComponent?: GridFooterT; data?: DataI[] } = {}) =>
  mount(
    <Grid
      width={window.innerWidth}
      height={window.innerHeight}
      data={data}
      columnWidth={250}
      rowHeight={200}
      minColumnCount={2}
      maxColumnCount={4}
      footerComponent={footerComponent}
    >
      {({ columnIndex, rowIndex, ...rest }: GridChildPropsI<object>) => (
        <GridItemComponent columnIndex={columnIndex} rowIndex={rowIndex} {...rest} />
      )}
    </Grid>
  );

describe('#grid.tsx', () => {
  test('Renders grid correctly', () => {
    act(() => {
      resizeWindow({ width: 1000, height: 500 });
    });

    const grid = createGrid();
    const gridItems = grid.find(GridItemComponent);

    expect(gridItems.length).toEqual(4);
    expect(gridItems.at(0).prop('columnIndex')).toEqual(0);
    expect(gridItems.at(1).prop('columnIndex')).toEqual(1);
    expect(gridItems.at(2).prop('columnIndex')).toEqual(2);
    expect(gridItems.at(3).prop('columnIndex')).toEqual(3);
  });

  test("Renders grid in multi rows when the content doesn't fit", () => {
    act(() => {
      resizeWindow({ width: 500, height: 500 });
    });

    const grid = createGrid();
    const gridItems = grid.find(GridItemComponent);

    expect(gridItems.length).toEqual(4);
    expect(gridItems.at(0).prop('columnIndex')).toEqual(0);
    expect(gridItems.at(1).prop('columnIndex')).toEqual(1);
    expect(gridItems.at(2).prop('columnIndex')).toEqual(0);
    expect(gridItems.at(3).prop('columnIndex')).toEqual(1);
  });

  test('Renders correct number of grid items', () => {
    act(() => {
      resizeWindow({ width: 500, height: 500 });
    });

    const data = generateData(5);
    const grid = createGrid({ data });
    const gridItems = grid.find(GridItemComponent);

    expect(gridItems.length).toEqual(5);
  });

  test('Renders footer correctly', () => {
    act(() => {
      resizeWindow({ width: 1000, height: 500 });
    });

    const grid = createGrid({ footerComponent: GridFooterComponent });
    const gridFooter = grid.find(GridFooterComponent);

    expect(gridFooter.length).toEqual(1);
    expect(gridFooter.at(0).prop('rowIndex')).toEqual(1);
  });

  test('Passes correct `data` to the children item', () => {
    act(() => {
      resizeWindow({ width: 500, height: 500 });
    });

    const data = generateData();

    const grid = createGrid({ data });
    const gridItems = grid.find(GridItemComponent);

    expect(gridItems.length).toEqual(4);
    expect(gridItems.at(0).prop('data')).toEqual(data[0]);
    expect(gridItems.at(1).prop('data')).toEqual(data[1]);
    expect(gridItems.at(2).prop('data')).toEqual(data[2]);
    expect(gridItems.at(3).prop('data')).toEqual(data[3]);
  });
});
