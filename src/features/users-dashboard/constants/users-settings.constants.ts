export const SET_USERS_NATIONALITIES_SETTING = 'SET_USERS_NATIONALITIES_SETTING';

/**
 * Possible users nationalities
 */
export enum UsersNationalitiesE {
  CH = 'ch',
  ES = 'es',
  FR = 'fr',
  GB = 'gb',
}

/**
 * Possible users nationalities options
 */
export const UsersNationalitiesOptions = [
  { label: 'CH', value: UsersNationalitiesE.CH },
  { label: 'ES', value: UsersNationalitiesE.ES },
  { label: 'FR', value: UsersNationalitiesE.FR },
  { label: 'GB', value: UsersNationalitiesE.GB },
];

/**
 * Field names of the users query param
 */
export enum UsersQueryFieldsE {
  NATIONALITY = 'nat',
}
