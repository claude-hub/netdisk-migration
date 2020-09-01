// Modules
import { Dispatch } from 'redux';

// Constants
import { ActionsTransportsE } from 'constants/api.constants';

// Typings
import { CommonActionT } from 'store/typings';

// Utils
import { sendStoreApiRequest } from 'store/utils/store-api.utils';

/**
 * Helper for checking if the action is of request type
 */
const isRequestTypeAction = (
  action: CommonActionT<any> | CommonActionT<any, ActionsTransportsE>
): action is CommonActionT<any, ActionsTransportsE> => action.transport === ActionsTransportsE.REQUEST;

/**
 * Api middleware, it sends a request if a given
 * action is of request type
 */
const apiMiddleware = ({ dispatch }: { dispatch: Dispatch }) => (next: Dispatch) => (
  action: CommonActionT<any> | CommonActionT<any, ActionsTransportsE>
) => {
  if (isRequestTypeAction(action)) {
    return sendStoreApiRequest(action, dispatch);
  }

  return next(action);
};

export default apiMiddleware;
