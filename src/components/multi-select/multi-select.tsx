// Modules
import React, { useCallback } from 'react';
import CSSModules from 'react-css-modules';

// Typings
import { LabelValueI } from 'typings/data-structures.typings';
import { SelectChangeEventHandlerT } from 'typings/common.typings';

// Utils
import { getLabel, getValue } from 'utils/getters.utils';

// Styles
import styles from './multi-select.scss';

/**
 * Multi select props
 */
interface MultiSelectPropsI<T extends LabelValueI<any, any>> {
  selectedOptions: T[];
  options: T[];
  onChange: (options: T[]) => void;
  className?: string;
  styleName?: string;
}

/**
 * Common multi-select component
 */
const MultiSelect = <T extends LabelValueI<any, any>>({
  onChange,
  options,
  selectedOptions,
  className,
}: MultiSelectPropsI<T>) => {
  /**
   * Handle multi-select change and call
   * `onChange` handler with the selected options
   */
  const handleChange = useCallback<SelectChangeEventHandlerT>(
    evt => {
      const { options } = evt.target;

      const selectedOptions = Array.prototype.filter
        .call(options, option => option.selected)
        .map(option => ({ label: option.label, value: option.value } as T));

      onChange && onChange(selectedOptions);
    },
    [onChange]
  );

  return (
    <select
      styleName="common"
      multiple
      onChange={handleChange}
      className={className}
      defaultValue={selectedOptions.map(getValue)}
    >
      {options.map(option => (
        <option key={`multi-select-${getValue(option)}`} value={getValue(option)}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  );
};

export default CSSModules(MultiSelect, styles);
