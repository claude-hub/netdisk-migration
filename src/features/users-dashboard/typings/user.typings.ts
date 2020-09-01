// Constants
import {
  UserFieldsE,
  UserNameFieldsE,
  UserLocationFieldsE,
  UserLocationStreetFieldsE,
  UserLocationCoordinatesFieldsE,
  UserLocationTimezoneFieldsE,
  UserLoginFieldsE,
  UserDobFieldsE,
  UserRegisteredFieldsE,
  UserIdFieldsE,
  UserPictureFieldsE,
} from '../constants/user-fields.constants';

/**
 * Interface of the user's `name` field
 */
export interface UserNameI {
  [UserNameFieldsE.TITLE]: string;
  [UserNameFieldsE.FIRST]: string;
  [UserNameFieldsE.LAST]: string;
}

/**
 * Interface of the user's `location.street` field
 */
export interface UserLocationStreetI {
  [UserLocationStreetFieldsE.NUMBER]: number;
  [UserLocationStreetFieldsE.NAME]: string;
}

/**
 * Interface of the user's `location.coordinates` field
 */
export interface UserLocationCoordinatesI {
  [UserLocationCoordinatesFieldsE.LATITUDE]: string;
  [UserLocationCoordinatesFieldsE.LONGITUDE]: string;
}

/**
 * Interface of the user's `location.timezone` field
 */
export interface UserLocationTimezoneI {
  [UserLocationTimezoneFieldsE.DESCRIPTION]: string;
  [UserLocationTimezoneFieldsE.OFFSET]: string;
}

/**
 * Interface of the user's `location` field
 */
export interface UserLocationI {
  [UserLocationFieldsE.STREET]: UserLocationStreetI;
  [UserLocationFieldsE.CITY]: string;
  [UserLocationFieldsE.STATE]: string;
  [UserLocationFieldsE.COUNTRY]: string;
  [UserLocationFieldsE.POSTCODE]: number;
  [UserLocationFieldsE.COORDINATES]: UserLocationCoordinatesI;
  [UserLocationFieldsE.TIMEZONE]: UserLocationTimezoneI;
}

/**
 * Interface of the user's `login` field
 */
export interface UserLoginI {
  [UserLoginFieldsE.UUID]: string;
  [UserLoginFieldsE.USERNAME]: string;
  [UserLoginFieldsE.PASSWORD]: string;
  [UserLoginFieldsE.SALT]: string;
  [UserLoginFieldsE.MD5]: string;
  [UserLoginFieldsE.SHA1]: string;
  [UserLoginFieldsE.SHA256]: string;
}

/**
 * Interface of the user's `dob` field
 */
export interface UserDobI {
  [UserDobFieldsE.DATE]: string;
  [UserDobFieldsE.AGE]: number;
}

/**
 * Interface of the user's `registered` field
 */
export interface UserRegisteredI {
  [UserRegisteredFieldsE.DATE]: string;
  [UserRegisteredFieldsE.AGE]: number;
}

/**
 * Interface of the user's `id` field
 */
export interface UserIdI {
  [UserIdFieldsE.NAME]: string;
  [UserIdFieldsE.VALUE]: string;
}

/**
 * Interface of the user's `picture` field
 */
export interface UserPictureI {
  [UserPictureFieldsE.LARGE]: string;
  [UserPictureFieldsE.MEDIUM]: string;
  [UserPictureFieldsE.THUMBNAIL]: string;
}

/**
 * Interface of the user entity
 */
export interface UserI {
  [UserFieldsE.GENDER]: string;
  [UserFieldsE.NAME]: UserNameI;
  [UserFieldsE.LOCATION]: UserLocationI;
  [UserFieldsE.EMAIL]: string;
  [UserFieldsE.LOGIN]: UserLoginI;
  [UserFieldsE.DOB]: UserDobI;
  [UserFieldsE.REGISTERED]: UserRegisteredI;
  [UserFieldsE.PHONE]: string;
  [UserFieldsE.CELL]: string;
  [UserFieldsE.ID]: UserIdI;
  [UserFieldsE.PICTURE]: UserPictureI;
  [UserFieldsE.NAT]: string;
}
