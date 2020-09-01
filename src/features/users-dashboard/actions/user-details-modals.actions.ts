// Actions
import { showModal, hideModal } from 'actions/modals.action';

// Constants
import { USER_DETAILS_MODAL_ID } from '../constants/user-details-modals.constants';

// Typings
import { UserI } from '../typings/user.typings';

/**
 * Shows user details modal
 */
export const showUserDetailsModal = (user: UserI) => showModal(USER_DETAILS_MODAL_ID, { user });

/**
 * Hides user details modal
 */
export const hideUserDetailsModal = () => hideModal(USER_DETAILS_MODAL_ID);
