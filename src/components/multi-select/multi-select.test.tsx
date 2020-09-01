// Modules
import React from 'react';
import { shallow } from 'enzyme';

// Typings
import { LabelValueI } from 'typings/data-structures.typings';

// Components
import MultiSelect from './multi-select';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('#multi-select.tsx', () => {
  const defaultOnChangeHandler = jest.fn();

  const defaultOptions: LabelValueI[] = [
    { label: 'label 1', value: 1 },
    { label: 'label 2', value: 2 },
  ];

  const createMultiSelect = ({
    options = defaultOptions,
    selectedOptions = [],
    className,
    onChange = defaultOnChangeHandler,
  }: {
    options?: LabelValueI[];
    selectedOptions?: LabelValueI[];
    className?: string;
    onChange?: (options: LabelValueI[]) => void;
  } = {}) =>
    shallow(
      <MultiSelect className={className} options={options} selectedOptions={selectedOptions} onChange={onChange} />
    );

  test('Renders correctly', () => {
    const multiSelect = createMultiSelect();

    const multiSelectOptions = multiSelect.find('.common>option');

    expect(multiSelectOptions.length).toEqual(2);

    expect(multiSelectOptions.at(0).prop('value')).toEqual(defaultOptions[0].value);
    expect(multiSelectOptions.at(0).text()).toEqual(defaultOptions[0].label);

    expect(multiSelectOptions.at(1).prop('value')).toEqual(defaultOptions[1].value);
    expect(multiSelectOptions.at(1).text()).toEqual(defaultOptions[1].label);
  });

  test('Marks correct options as selected', () => {
    const selectedOptions = [defaultOptions[0]];
    const multiSelect = createMultiSelect({ selectedOptions });

    expect(multiSelect.prop('defaultValue')).toEqual([defaultOptions[0].value]);
  });

  test('Passes `className` correctly', () => {
    const className = 'some-class';
    const multiSelect = createMultiSelect({ className });

    expect(multiSelect.find('.common').hasClass(className)).toBe(true);
  });

  test('Passes correct data to the `onChange` handler', () => {
    const multiSelect = createMultiSelect();

    multiSelect.find('.common').simulate('change', {
      target: {
        options: [
          {
            selected: true,
            label: defaultOptions[0].label,
            value: defaultOptions[0].value,
          },
          {
            selected: false,
            label: defaultOptions[1].label,
            value: defaultOptions[1].value,
          },
        ],
      },
    });

    expect(defaultOnChangeHandler).toBeCalled();
    expect(defaultOnChangeHandler).toBeCalledWith([
      {
        label: defaultOptions[0].label,
        value: defaultOptions[0].value,
      },
    ]);
  });
});
