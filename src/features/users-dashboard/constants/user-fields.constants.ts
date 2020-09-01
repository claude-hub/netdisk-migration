/**
 * Field names of the user entity
 */
export enum UserFieldsE {
  GENDER = 'gender',
  NAME = 'name',
  LOCATION = 'location',
  EMAIL = 'email',
  LOGIN = 'login',
  DOB = 'dob',
  REGISTERED = 'registered',
  PHONE = 'phone',
  CELL = 'cell',
  ID = 'id',
  PICTURE = 'picture',
  NAT = 'nat',
}

/**
 * Field names of the user's `name` field
 */
export enum UserNameFieldsE {
  TITLE = 'title',
  FIRST = 'first',
  LAST = 'last',
}

/**
 * Filed names of the user's `location` field
 */
export enum UserLocationFieldsE {
  STREET = 'street',
  CITY = 'city',
  STATE = 'state',
  COUNTRY = 'country',
  POSTCODE = 'postcode',
  COORDINATES = 'coordinates',
  TIMEZONE = 'timezone',
}

/**
 * Field names of the user's `location.street` field
 */
export enum UserLocationStreetFieldsE {
  NUMBER = 'number',
  NAME = 'name',
}

/**
 * Field names of the user's `location.coordinates` field
 */
export enum UserLocationCoordinatesFieldsE {
  LATITUDE = 'latitude',
  LONGITUDE = 'longitude',
}

/**
 * Field names of the user's `location.timezone` field
 */
export enum UserLocationTimezoneFieldsE {
  OFFSET = 'offset',
  DESCRIPTION = 'description',
}

/**
 * Field names of the user's `login` field
 */
export enum UserLoginFieldsE {
  UUID = 'uuid',
  USERNAME = 'username',
  PASSWORD = 'password',
  SALT = 'salt',
  MD5 = 'md5',
  SHA1 = 'sha1',
  SHA256 = 'sha256',
}

/**
 * Field names of the user's `dob` field
 */
export enum UserDobFieldsE {
  DATE = 'date',
  AGE = 'age',
}

/**
 * Field names of the user's `registered` field
 */
export enum UserRegisteredFieldsE {
  DATE = 'date',
  AGE = 'age',
}

/**
 * Field names of the user's `id` field
 */
export enum UserIdFieldsE {
  NAME = 'name',
  VALUE = 'value',
}

/**
 * Field names of the user's `picture` field
 */
export enum UserPictureFieldsE {
  LARGE = 'large',
  MEDIUM = 'medium',
  THUMBNAIL = 'thumbnail',
}
