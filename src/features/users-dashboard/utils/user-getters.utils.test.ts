// Utils
import {
  getUserGender,
  getUserName,
  getUserNameTitle,
  getUserNameFirst,
  getUserNameLast,
  getUserUsername,
  getUserLocation,
  getUserLocationStreet,
  getUserLocationStreetNumber,
  getUserLocationStreetName,
  getUserLocationCity,
  getUserLocationState,
  getUserLocationCountry,
  getUserLocationPostcode,
  getUserLocationCoordinates,
  getUserLocationCoordinatesLatitude,
  getUserLocationCoordinatesLongitude,
  getUserLocationTimezone,
  getUserLocationTimezoneDescription,
  getUserLocationTimezoneOffset,
  getUserEmail,
  getUserLogin,
  getUserLoginUuid,
  getUserLoginUsername,
  getUserLoginPassword,
  getUserLoginSalt,
  getUserLoginMd5,
  getUserLoginSha1,
  getUserLoginSha256,
  getUserDob,
  getUserDobDate,
  getUserDobAge,
  getUserRegistered,
  getUserRegisteredDate,
  getUserRegisteredAge,
  getUserPhone,
  getUserCell,
  getUserId,
  getUserIdName,
  getUserIdValue,
  getUserPicture,
  getUserPictureLarge,
  getUserPictureMedium,
  getUserPictureThumbnail,
  getUserNat,
} from './user-getters.utils';

// Typings
import { UserI } from '../typings/user.typings';

const userItem: UserI = {
  gender: 'female',
  name: { title: 'Mrs', first: 'Jane', last: 'Cole' },
  location: {
    street: { number: 2660, name: 'White Oak Dr' },
    city: 'Dumas',
    state: 'Nebraska',
    country: 'United States',
    postcode: 63430,
    coordinates: { latitude: '88.6334', longitude: '135.2691' },
    timezone: {
      offset: '+2:00',
      description: 'Kaliningrad, South Africa',
    },
  },
  email: 'jane.cole@example.com',
  login: {
    uuid: '62584f38-972e-4b85-8817-60a32c2f278c',
    username: 'heavygorilla115',
    password: 'arrows',
    salt: 'Ej4RHwcF',
    md5: 'cb628888456bc467a4f6052595f8307e',
    sha1: 'cc0962a9707985e1f69892af205e224fe9d46827',
    sha256: '0fe081478a5444bb63c4f262a15f387c1d70dc5e93d5489b0c418ee4d7b80c2d',
  },
  dob: { date: '1980-08-19T20:52:03.518Z', age: 40 },
  registered: { date: '2005-08-23T08:18:49.948Z', age: 15 },
  phone: '(719)-145-7176',
  cell: '(246)-535-0497',
  id: { name: 'SSN', value: '495-04-8968' },
  picture: {
    large: 'https://randomuser.me/api/portraits/women/14.jpg',
    medium: 'https://randomuser.me/api/portraits/med/women/14.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/thumb/women/14.jpg',
  },
  nat: 'US',
};

describe('#user-getters.utils.ts', () => {
  /**
   * Helper for generating a test case for
   * a particular getter function
   */
  const testUserFieldGetter = <ReturnType>({
    getterName,
    getter,
    expectedValue,
    user = userItem,
  }: {
    getterName: string;
    getter: (user: UserI | null | undefined, defaultValue?: ReturnType) => ReturnType | undefined;
    expectedValue: ReturnType;
    user?: UserI;
  }) => {
    test(`#${getterName}`, () => {
      expect(getter(user)).toEqual(expectedValue);
    });
  };

  testUserFieldGetter({
    getterName: 'getUserGender',
    getter: getUserGender,
    expectedValue: userItem.gender,
  });

  testUserFieldGetter({
    getterName: 'getUserName',
    getter: getUserName,
    expectedValue: userItem.name,
  });

  testUserFieldGetter({
    getterName: 'getUserNameTitle',
    getter: getUserNameTitle,
    expectedValue: userItem.name.title,
  });

  testUserFieldGetter({
    getterName: 'getUserNameFirst',
    getter: getUserNameFirst,
    expectedValue: userItem.name.first,
  });

  testUserFieldGetter({
    getterName: 'getUserNameLast',
    getter: getUserNameLast,
    expectedValue: userItem.name.last,
  });

  testUserFieldGetter({
    getterName: 'getUserUsername',
    getter: getUserUsername,
    expectedValue: 'jane.cole',
  });

  testUserFieldGetter({
    getterName: 'getUserLocation',
    getter: getUserLocation,
    expectedValue: userItem.location,
  });

  testUserFieldGetter({
    getterName: 'getUserLocationStreet',
    getter: getUserLocationStreet,
    expectedValue: userItem.location.street,
  });

  testUserFieldGetter({
    getterName: 'getUserLocationStreetNumber',
    getter: getUserLocationStreetNumber,
    expectedValue: userItem.location.street.number,
  });

  testUserFieldGetter({
    getterName: 'getUserLocationStreetName',
    getter: getUserLocationStreetName,
    expectedValue: userItem.location.street.name,
  });

  testUserFieldGetter({
    getterName: 'getUserLocationCity',
    getter: getUserLocationCity,
    expectedValue: userItem.location.city,
  });

  testUserFieldGetter({
    getterName: 'getUserLocationState',
    getter: getUserLocationState,
    expectedValue: userItem.location.state,
  });

  testUserFieldGetter({
    getterName: 'getUserLocationCountry',
    getter: getUserLocationCountry,
    expectedValue: userItem.location.country,
  });

  testUserFieldGetter({
    getterName: 'getUserLocationPostcode',
    getter: getUserLocationPostcode,
    expectedValue: userItem.location.postcode,
  });

  testUserFieldGetter({
    getterName: 'getUserLocationCoordinates',
    getter: getUserLocationCoordinates,
    expectedValue: userItem.location.coordinates,
  });

  testUserFieldGetter({
    getterName: 'getUserLocationCoordinatesLatitude',
    getter: getUserLocationCoordinatesLatitude,
    expectedValue: userItem.location.coordinates.latitude,
  });

  testUserFieldGetter({
    getterName: 'getUserLocationCoordinatesLongitude',
    getter: getUserLocationCoordinatesLongitude,
    expectedValue: userItem.location.coordinates.longitude,
  });

  testUserFieldGetter({
    getterName: 'getUserLocationTimezone',
    getter: getUserLocationTimezone,
    expectedValue: userItem.location.timezone,
  });

  testUserFieldGetter({
    getterName: 'getUserLocationTimezoneDescription',
    getter: getUserLocationTimezoneDescription,
    expectedValue: userItem.location.timezone.description,
  });

  testUserFieldGetter({
    getterName: 'getUserLocationTimezoneOffset',
    getter: getUserLocationTimezoneOffset,
    expectedValue: userItem.location.timezone.offset,
  });

  testUserFieldGetter({
    getterName: 'getUserEmail',
    getter: getUserEmail,
    expectedValue: userItem.email,
  });

  testUserFieldGetter({
    getterName: 'getUserLogin',
    getter: getUserLogin,
    expectedValue: userItem.login,
  });

  testUserFieldGetter({
    getterName: 'getUserLoginUuid',
    getter: getUserLoginUuid,
    expectedValue: userItem.login.uuid,
  });

  testUserFieldGetter({
    getterName: 'getUserLoginUsername',
    getter: getUserLoginUsername,
    expectedValue: userItem.login.username,
  });

  testUserFieldGetter({
    getterName: 'getUserLoginPassword',
    getter: getUserLoginPassword,
    expectedValue: userItem.login.password,
  });

  testUserFieldGetter({
    getterName: 'getUserLoginSalt',
    getter: getUserLoginSalt,
    expectedValue: userItem.login.salt,
  });

  testUserFieldGetter({
    getterName: 'getUserLoginMd5',
    getter: getUserLoginMd5,
    expectedValue: userItem.login.md5,
  });

  testUserFieldGetter({
    getterName: 'getUserLoginSha1',
    getter: getUserLoginSha1,
    expectedValue: userItem.login.sha1,
  });

  testUserFieldGetter({
    getterName: 'getUserLoginSha256',
    getter: getUserLoginSha256,
    expectedValue: userItem.login.sha256,
  });

  testUserFieldGetter({
    getterName: 'getUserDob',
    getter: getUserDob,
    expectedValue: userItem.dob,
  });

  testUserFieldGetter({
    getterName: 'getUserDobDate',
    getter: getUserDobDate,
    expectedValue: userItem.dob.date,
  });

  testUserFieldGetter({
    getterName: 'getUserDobAge',
    getter: getUserDobAge,
    expectedValue: userItem.dob.age,
  });

  testUserFieldGetter({
    getterName: 'getUserRegistered',
    getter: getUserRegistered,
    expectedValue: userItem.registered,
  });

  testUserFieldGetter({
    getterName: 'getUserRegisteredDate',
    getter: getUserRegisteredDate,
    expectedValue: userItem.registered.date,
  });

  testUserFieldGetter({
    getterName: 'getUserRegisteredAge',
    getter: getUserRegisteredAge,
    expectedValue: userItem.registered.age,
  });

  testUserFieldGetter({
    getterName: 'getUserPhone',
    getter: getUserPhone,
    expectedValue: userItem.phone,
  });

  testUserFieldGetter({
    getterName: 'getUserCell',
    getter: getUserCell,
    expectedValue: userItem.cell,
  });

  testUserFieldGetter({
    getterName: 'getUserId',
    getter: getUserId,
    expectedValue: userItem.id,
  });

  testUserFieldGetter({
    getterName: 'getUserIdName',
    getter: getUserIdName,
    expectedValue: userItem.id.name,
  });

  testUserFieldGetter({
    getterName: 'getUserIdValue',
    getter: getUserIdValue,
    expectedValue: userItem.id.value,
  });

  testUserFieldGetter({
    getterName: 'getUserPicture',
    getter: getUserPicture,
    expectedValue: userItem.picture,
  });

  testUserFieldGetter({
    getterName: 'getUserPictureLarge',
    getter: getUserPictureLarge,
    expectedValue: userItem.picture.large,
  });

  testUserFieldGetter({
    getterName: 'getUserPictureMedium',
    getter: getUserPictureMedium,
    expectedValue: userItem.picture.medium,
  });

  testUserFieldGetter({
    getterName: 'getUserPictureThumbnail',
    getter: getUserPictureThumbnail,
    expectedValue: userItem.picture.thumbnail,
  });

  testUserFieldGetter({
    getterName: 'getUserNat',
    getter: getUserNat,
    expectedValue: userItem.nat,
  });
});
