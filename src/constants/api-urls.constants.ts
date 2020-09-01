/**
 * Helper for building users API URL
 */
const buildUsersApiUrl = (url: string) => `${process.env.USERS_API_HOST}/api/${url}`;

// Users URLs
export const FETCH_USERS_LIST_URL = buildUsersApiUrl('');
