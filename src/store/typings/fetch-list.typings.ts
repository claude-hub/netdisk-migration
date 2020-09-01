// Typings
import { FetchSuccessPayloadI } from './common-store.typings';

/**
 * Fetch list pagination state interface
 */
export interface FetchListPaginationStateI {
  batchSize: number;
  page: number | null;
  initialPage: number;
  limit: number | null;
  isLast: boolean;
}

/**
 * Fetch list state interface
 */
export interface FetchListStateI<T> {
  items: T[];
  pagination: FetchListPaginationStateI;
  error: string | null;
  searchStr: string;
  isFetched: boolean;
  isFetching: boolean;
}

/**
 * Server response of successful fetching of the list
 */
interface FetchListSuccessServerResponseI<T> {
  results: T[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export type FetchListSuccessPayloadT<T> = FetchSuccessPayloadI<FetchListSuccessServerResponseI<T>>;
