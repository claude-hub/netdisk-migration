/**
 * Kind of `abstraction` for fetching data, so that
 * the application doesn't depend on low-level fetch API
 */
export const fetchAPI = (url: string, params: RequestInit) => fetch(url, params);
