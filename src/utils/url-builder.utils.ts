// Modules
import { isEmpty } from 'ramda';

/**
 * Local typings
 */
type ValueT = string | string[] | number | number[] | boolean | boolean[];

export interface ParamsI {
  [k: string]: string | number | boolean;
}
export interface QueryI {
  [k: string]: ValueT;
}

type BuildQueryStringFnArgsT = {
  params?: ParamsI;
  query?: QueryI;
};

/**
 * Filters all empty values: [], {}, ''
 */
const filterEmptyValues = ([, value]: [string, ValueT]) => !isEmpty(value);

/**
 * Filter all empty values in the array
 */
const filterArrayValues = (arrayValues: ValueT[]) => arrayValues.filter(value => !isEmpty(value));

/**
 * Converts
 */
const convertQueryKeyValueToString = ([key, value]: [string, ValueT]) => {
  const values = Array.isArray(value) ? filterArrayValues(value).join(',') : value;

  return `${key}=${encodeURIComponent(values)}`;
};

/**
 * Converts query object to URL string
 */
const convertQueryObjectToString = (query: QueryI) => {
  const queryValues = Object.entries(query)
    .filter(filterEmptyValues)
    .reduce<ValueT[]>((acc, keyValue) => [...acc, convertQueryKeyValueToString(keyValue)], []);

  return queryValues.join('&');
};

/**
 * Sets params to the URL string
 */
const setParamsToURL = (url: string, params: ParamsI) =>
  Object.entries(params).reduce((accUrl, [key, value]) => {
    if (!accUrl.includes(`:${key}`)) {
      throw Error(`${key} not found`);
    }

    return accUrl.replace(`:${key}`, value as string);
  }, url);

/**
 * Build Query String helper
 */
export const buildQueryString = (url: string, arg: BuildQueryStringFnArgsT = {}) => {
  const { params, query } = arg;

  if (!query && !params) {
    return url;
  }

  const queryParams = query && convertQueryObjectToString(query);
  const urlResult = params ? setParamsToURL(url, params) : url;

  return queryParams ? `${urlResult}?${queryParams}` : `${urlResult}`;
};
