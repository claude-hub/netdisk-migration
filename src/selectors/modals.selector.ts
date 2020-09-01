// Modules
import { prop } from 'ramda';

// Typings
import { RootReducerStateT } from 'store/typings';

/**
 * Selects Modal Data by provided modal ID
 */
export const selectModalDataById = <T>(state: RootReducerStateT, id: string) => {
  const data = prop(id, state.global.modals);
  const { isShown = false, additionalData } = data || {};

  return { isShown, additionalData: additionalData as T };
};
