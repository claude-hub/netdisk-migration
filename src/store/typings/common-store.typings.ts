// Modules
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

// Constants
import { ActionsTransportsE, HttpMethodsE } from 'constants/api.constants';

// Typings
import { BodyI } from 'typings/api.typings';

/**
 * Request params for a fetch action
 */
export interface FetchActionRequestParamsI {
  method: HttpMethodsE;
  url: string;
  body?: BodyI;
}

/**
 * Common action interface
 */
export type CommonActionT<P = undefined, T extends ActionsTransportsE | undefined = undefined> = {
  type: string;
  payload?: P;
  transport?: T;
} & (T extends undefined ? {} : { requestParams: FetchActionRequestParamsI });

/**
 * Payload of successful fetching
 */
export interface FetchSuccessPayloadI<T> {
  data: T;
}

/**
 * Payload of failed fetching
 */
export interface FetchFailurePayloadI {
  errorMsg: string;
}

/**
 * Payload of list searching
 */
export interface SearchListPayloadI {
  searchStr: string;
}

/**
 * Root reducer type
 */
export type RootReducerStateT = ReturnType<typeof import('store/root.reducer').default>;

/**
 * Thunk action type
 */
export type ThunkActionT<ReturnType = void> = ThunkAction<ReturnType, RootReducerStateT, unknown, Action<string>>;
