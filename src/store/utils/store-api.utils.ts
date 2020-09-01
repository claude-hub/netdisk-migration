// Modules
import { Dispatch } from 'redux';

// Constants
import { HttpActionsTypesE, ActionsTransportsE } from 'constants/api.constants';

// Utils
import { fetchAPI } from 'utils/api.utils';
import { buildActionType } from './build-action-type.utils';

// Typings
import { CommonActionT, FetchSuccessPayloadI, FetchFailurePayloadI } from '../typings/common-store.typings';
import { BodyI } from 'typings/api.typings';

/**
 * Create fetch success payload object
 */
const createFetchSuccessPayload = <T>(data: T): FetchSuccessPayloadI<T> => ({ data });

/**
 * Create fetch failure payload object
 */
const createFetchFailurePayload = (errorMsg: string): FetchFailurePayloadI => ({ errorMsg });

/**
 * Helper for getting a request body.
 * It returns an object with a stringified `body` field if
 * it's present, otherwise it returns an empty object
 */
const getRequestBody = (body: BodyI | undefined) => (body ? { body: JSON.stringify(body) } : {});

/**
 * Helper for sending API calls that are handled by
 * the store when the request is fulfilled/rejected
 */
export const sendStoreApiRequest = async (action: CommonActionT<any, ActionsTransportsE>, dispatch: Dispatch) => {
  const { method, url, body } = action.requestParams;

  try {
    dispatch({
      type: buildActionType(action.type, HttpActionsTypesE.FETCH),
    });

    const response = await fetchAPI(url, { method, ...getRequestBody(body) });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    dispatch({
      type: buildActionType(action.type, HttpActionsTypesE.SUCCESS),
      payload: createFetchSuccessPayload(data),
      initialActionData: action,
    });

    return response;
  } catch (err) {
    dispatch({
      type: buildActionType(action.type, HttpActionsTypesE.FAILURE),
      payload: createFetchFailurePayload(err.message),
      initialActionData: action,
    });

    return err;
  }
};
