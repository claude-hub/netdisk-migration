// Utils
import { createEntityFieldGetter, createEntityPathGetter } from 'utils/getters.utils';

// Constants
import {
  UserFieldsE,
  UserNameFieldsE,
  UserLocationFieldsE,
  UserLocationTimezoneFieldsE,
  UserLocationCoordinatesFieldsE,
  UserLocationStreetFieldsE,
  UserPictureFieldsE,
  UserLoginFieldsE,
  UserDobFieldsE,
  UserRegisteredFieldsE,
  UserIdFieldsE,
} from '../constants/user-fields.constants';

// Typings
import {
  UserI,
  UserNameI,
  UserLocationI,
  UserLocationTimezoneI,
  UserLocationStreetI,
  UserLocationCoordinatesI,
  UserPictureI,
  UserLoginI,
  UserDobI,
  UserRegisteredI,
  UserIdI,
} from '../typings/user.typings';

/**
 * User `gender` field getter
 */
export const getUserGender = createEntityFieldGetter<UserI, UserFieldsE.GENDER>(UserFieldsE.GENDER);

/**
 * User `name` field getter
 */
export const getUserName = createEntityFieldGetter<UserI, UserFieldsE.NAME>(UserFieldsE.NAME);

/**
 * User `name.title` field getter
 */
export const getUserNameTitle = createEntityPathGetter<UserI, UserNameI[UserNameFieldsE.TITLE]>([
  UserFieldsE.NAME,
  UserNameFieldsE.TITLE,
]);

/**
 * User `name.first` field getter
 */
export const getUserNameFirst = createEntityPathGetter<UserI, UserNameI[UserNameFieldsE.FIRST]>([
  UserFieldsE.NAME,
  UserNameFieldsE.FIRST,
]);

/**
 * User `name.last` field getter
 */
export const getUserNameLast = createEntityPathGetter<UserI, UserNameI[UserNameFieldsE.LAST]>([
  UserFieldsE.NAME,
  UserNameFieldsE.LAST,
]);

/**
 * User `location` field getter
 */
export const getUserLocation = createEntityFieldGetter<UserI, UserFieldsE.LOCATION>(UserFieldsE.LOCATION);

/**
 * User `location.street` field getter
 */
export const getUserLocationStreet = createEntityPathGetter<UserI, UserLocationI[UserLocationFieldsE.STREET]>([
  UserFieldsE.LOCATION,
  UserLocationFieldsE.STREET,
]);

/**
 * User `location.street.number` field getter
 */
export const getUserLocationStreetNumber = createEntityPathGetter<
  UserI,
  UserLocationStreetI[UserLocationStreetFieldsE.NUMBER]
>([UserFieldsE.LOCATION, UserLocationFieldsE.STREET, UserLocationStreetFieldsE.NUMBER]);

/**
 * User `location.street.name` field getter
 */
export const getUserLocationStreetName = createEntityPathGetter<
  UserI,
  UserLocationStreetI[UserLocationStreetFieldsE.NAME]
>([UserFieldsE.LOCATION, UserLocationFieldsE.STREET, UserLocationStreetFieldsE.NAME]);

/**
 * User `location.city` field getter
 */
export const getUserLocationCity = createEntityPathGetter<UserI, UserLocationI[UserLocationFieldsE.CITY]>([
  UserFieldsE.LOCATION,
  UserLocationFieldsE.CITY,
]);

/**
 * User `location.state` field getter
 */
export const getUserLocationState = createEntityPathGetter<UserI, UserLocationI[UserLocationFieldsE.STATE]>([
  UserFieldsE.LOCATION,
  UserLocationFieldsE.STATE,
]);

/**
 * User `location.country` field getter
 */
export const getUserLocationCountry = createEntityPathGetter<UserI, UserLocationI[UserLocationFieldsE.COUNTRY]>([
  UserFieldsE.LOCATION,
  UserLocationFieldsE.COUNTRY,
]);

/**
 * User `location.postcode` field getter
 */
export const getUserLocationPostcode = createEntityPathGetter<UserI, UserLocationI[UserLocationFieldsE.POSTCODE]>([
  UserFieldsE.LOCATION,
  UserLocationFieldsE.POSTCODE,
]);

/**
 * User `location.coordinates` field getter
 */
export const getUserLocationCoordinates = createEntityPathGetter<UserI, UserLocationI[UserLocationFieldsE.COORDINATES]>(
  [UserFieldsE.LOCATION, UserLocationFieldsE.COORDINATES]
);

/**
 * User `location.coordinates.latitude` field getter
 */
export const getUserLocationCoordinatesLatitude = createEntityPathGetter<
  UserI,
  UserLocationCoordinatesI[UserLocationCoordinatesFieldsE.LATITUDE]
>([UserFieldsE.LOCATION, UserLocationFieldsE.COORDINATES, UserLocationCoordinatesFieldsE.LATITUDE]);

/**
 * User `location.coordinates.longitude` field getter
 */
export const getUserLocationCoordinatesLongitude = createEntityPathGetter<
  UserI,
  UserLocationCoordinatesI[UserLocationCoordinatesFieldsE.LONGITUDE]
>([UserFieldsE.LOCATION, UserLocationFieldsE.COORDINATES, UserLocationCoordinatesFieldsE.LONGITUDE]);

/**
 * User `location.timezone` field getter
 */
export const getUserLocationTimezone = createEntityPathGetter<UserI, UserLocationI[UserLocationFieldsE.TIMEZONE]>([
  UserFieldsE.LOCATION,
  UserLocationFieldsE.TIMEZONE,
]);

/**
 * User `location.timezone.description` field getter
 */
export const getUserLocationTimezoneDescription = createEntityPathGetter<
  UserI,
  UserLocationTimezoneI[UserLocationTimezoneFieldsE.DESCRIPTION]
>([UserFieldsE.LOCATION, UserLocationFieldsE.TIMEZONE, UserLocationTimezoneFieldsE.DESCRIPTION]);

/**
 * User `location.timezone.offset` field getter
 */
export const getUserLocationTimezoneOffset = createEntityPathGetter<
  UserI,
  UserLocationTimezoneI[UserLocationTimezoneFieldsE.OFFSET]
>([UserFieldsE.LOCATION, UserLocationFieldsE.TIMEZONE, UserLocationTimezoneFieldsE.OFFSET]);

/**
 * User `email` field getter
 */
export const getUserEmail = createEntityFieldGetter<UserI, UserFieldsE.EMAIL>(UserFieldsE.EMAIL);

/**
 * User `username` getter. It returns user's email
 * value before the `@`
 */
export const getUserUsername = (user: UserI | null | undefined, defaultValue: string = '') => {
  const email = getUserEmail(user, defaultValue);
  const [username] = email.split('@');

  return username;
};

/**
 * User `login` field getter
 */
export const getUserLogin = createEntityFieldGetter<UserI, UserFieldsE.LOGIN>(UserFieldsE.LOGIN);

/**
 * User `login.uuid` field getter
 */
export const getUserLoginUuid = createEntityPathGetter<UserI, UserLoginI[UserLoginFieldsE.UUID]>([
  UserFieldsE.LOGIN,
  UserLoginFieldsE.UUID,
]);

/**
 * User `login.username` field getter
 */
export const getUserLoginUsername = createEntityPathGetter<UserI, UserLoginI[UserLoginFieldsE.USERNAME]>([
  UserFieldsE.LOGIN,
  UserLoginFieldsE.USERNAME,
]);

/**
 * User `login.password` field getter
 */
export const getUserLoginPassword = createEntityPathGetter<UserI, UserLoginI[UserLoginFieldsE.PASSWORD]>([
  UserFieldsE.LOGIN,
  UserLoginFieldsE.PASSWORD,
]);

/**
 * User `login.salt` field getter
 */
export const getUserLoginSalt = createEntityPathGetter<UserI, UserLoginI[UserLoginFieldsE.SALT]>([
  UserFieldsE.LOGIN,
  UserLoginFieldsE.SALT,
]);

/**
 * User `login.md5` field getter
 */
export const getUserLoginMd5 = createEntityPathGetter<UserI, UserLoginI[UserLoginFieldsE.MD5]>([
  UserFieldsE.LOGIN,
  UserLoginFieldsE.MD5,
]);

/**
 * User `login.sha1` field getter
 */
export const getUserLoginSha1 = createEntityPathGetter<UserI, UserLoginI[UserLoginFieldsE.SHA1]>([
  UserFieldsE.LOGIN,
  UserLoginFieldsE.SHA1,
]);

/**
 * User `login.sha256` field getter
 */
export const getUserLoginSha256 = createEntityPathGetter<UserI, UserLoginI[UserLoginFieldsE.SHA256]>([
  UserFieldsE.LOGIN,
  UserLoginFieldsE.SHA256,
]);

/**
 * User `dob` field getter
 */
export const getUserDob = createEntityFieldGetter<UserI, UserFieldsE.DOB>(UserFieldsE.DOB);

/**
 * User `dob.date` field getter
 */
export const getUserDobDate = createEntityPathGetter<UserI, UserDobI[UserDobFieldsE.DATE]>([
  UserFieldsE.DOB,
  UserDobFieldsE.DATE,
]);

/**
 * User `dob.age` field getter
 */
export const getUserDobAge = createEntityPathGetter<UserI, UserDobI[UserDobFieldsE.AGE]>([
  UserFieldsE.DOB,
  UserDobFieldsE.AGE,
]);

/**
 * User `registered` field getter
 */
export const getUserRegistered = createEntityFieldGetter<UserI, UserFieldsE.REGISTERED>(UserFieldsE.REGISTERED);

/**
 * User `registered.date` field getter
 */
export const getUserRegisteredDate = createEntityPathGetter<UserI, UserRegisteredI[UserRegisteredFieldsE.DATE]>([
  UserFieldsE.REGISTERED,
  UserRegisteredFieldsE.DATE,
]);

/**
 * User `registered.age` field getter
 */
export const getUserRegisteredAge = createEntityPathGetter<UserI, UserRegisteredI[UserRegisteredFieldsE.AGE]>([
  UserFieldsE.REGISTERED,
  UserRegisteredFieldsE.AGE,
]);

/**
 * User `phone` field getter
 */
export const getUserPhone = createEntityFieldGetter<UserI, UserFieldsE.PHONE>(UserFieldsE.PHONE);

/**
 * User `cell` field getter
 */
export const getUserCell = createEntityFieldGetter<UserI, UserFieldsE.CELL>(UserFieldsE.CELL);

/**
 * User `id` field getter
 */
export const getUserId = createEntityFieldGetter<UserI, UserFieldsE.ID>(UserFieldsE.ID);

/**
 * User `id.name` field getter
 */
export const getUserIdName = createEntityPathGetter<UserI, UserIdI[UserIdFieldsE.NAME]>([
  UserFieldsE.ID,
  UserIdFieldsE.NAME,
]);

/**
 * User `id.value` field getter
 */
export const getUserIdValue = createEntityPathGetter<UserI, UserIdI[UserIdFieldsE.VALUE]>([
  UserFieldsE.ID,
  UserIdFieldsE.VALUE,
]);

/**
 * User `picture` field getter
 */
export const getUserPicture = createEntityFieldGetter<UserI, UserFieldsE.PICTURE>(UserFieldsE.PICTURE);

/**
 * User `picture.large` field getter
 */
export const getUserPictureLarge = createEntityPathGetter<UserI, UserPictureI[UserPictureFieldsE.LARGE]>([
  UserFieldsE.PICTURE,
  UserPictureFieldsE.LARGE,
]);

/**
 * User `picture.medium` field getter
 */
export const getUserPictureMedium = createEntityPathGetter<UserI, UserPictureI[UserPictureFieldsE.MEDIUM]>([
  UserFieldsE.PICTURE,
  UserPictureFieldsE.MEDIUM,
]);

/**
 * User `picture.thumbnail` field getter
 */
export const getUserPictureThumbnail = createEntityPathGetter<UserI, UserPictureI[UserPictureFieldsE.THUMBNAIL]>([
  UserFieldsE.PICTURE,
  UserPictureFieldsE.THUMBNAIL,
]);

/**
 * User `nat` field getter
 */
export const getUserNat = createEntityFieldGetter<UserI, UserFieldsE.NAT>(UserFieldsE.NAT);
