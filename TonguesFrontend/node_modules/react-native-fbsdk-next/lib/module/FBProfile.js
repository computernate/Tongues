function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @format
 */
import { Platform, NativeModules } from 'react-native';
const Profile = NativeModules.FBProfile;

/**
 * Represents an immutable Facebook profile
 * This class provides a global "currentProfile" instance to more easily add social context to your application.
 */
class FBProfile {
  /**
   * The user id
   */

  /**
   * The user's email.
   * IMPORTANT: This field will only be populated if your user has granted your application the 'email' permission.
   */

  /**
   * The user's complete name
   */

  /**
   * The user's first name
   */

  /**
   * The user's last name
   */

  /**
   * The user's middle name
   */

  /**
   * A URL to the user's profile.
   * IMPORTANT: This field will only be populated if your user has granted your application the 'user_link' permission
   */

  /**
   * A URL to use for fetching a user's profile image.
   */
  constructor(profileMap) {
    _defineProperty(this, "userID", void 0);

    _defineProperty(this, "email", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "firstName", void 0);

    _defineProperty(this, "lastName", void 0);

    _defineProperty(this, "middleName", void 0);

    _defineProperty(this, "linkURL", void 0);

    _defineProperty(this, "imageURL", void 0);

    this.firstName = profileMap.firstName;
    this.lastName = profileMap.lastName;
    this.middleName = profileMap.middleName;
    this.linkURL = profileMap.linkURL;
    this.imageURL = profileMap.imageURL;
    this.userID = profileMap.userID;

    if (Platform.OS !== 'android') {
      this.email = profileMap.email;
    }

    this.name = profileMap.name;
    Object.freeze(this);
  }
  /**
   * Getter the current logged profile
   */


  static getCurrentProfile() {
    return new Promise(resolve => {
      Profile.getCurrentProfile(profileMap => {
        if (profileMap) {
          resolve(new FBProfile(profileMap));
        } else {
          resolve(null);
        }
      });
    });
  }

}

export default FBProfile;
//# sourceMappingURL=FBProfile.js.map