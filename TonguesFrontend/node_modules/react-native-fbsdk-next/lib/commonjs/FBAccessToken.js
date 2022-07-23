"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const AccessToken = _reactNative.NativeModules.FBAccessToken;
const eventEmitter = new _reactNative.NativeEventEmitter(AccessToken);

/**
 * Represents an immutable access token for using Facebook services.
 */
class FBAccessToken {
  /**
   * The access token string.
   */

  /**
   * The known granted permissions.
   */

  /**
   * The known declined permissions.
   */

  /**
   * The known expired permissions.
   */

  /**
   * The app ID.
   */

  /**
   * The user ID.
   */

  /**
   * The expiration time of the access token.
   * The value is the number of milliseconds since Jan. 1, 1970, midnight GMT.
   */

  /**
   * The last refresh time of the access token.
   * The value is the number of milliseconds since Jan. 1, 1970, midnight GMT.
   */

  /**
   * The data access expiration time of the access token.
   * The value is the number of milliseconds since Jan. 1, 1970, midnight GMT.
   */

  /**
   * The source of access token.
   * @platform android
   */
  constructor(tokenMap) {
    _defineProperty(this, "accessToken", void 0);

    _defineProperty(this, "permissions", void 0);

    _defineProperty(this, "declinedPermissions", void 0);

    _defineProperty(this, "expiredPermissions", void 0);

    _defineProperty(this, "applicationID", void 0);

    _defineProperty(this, "userID", void 0);

    _defineProperty(this, "expirationTime", void 0);

    _defineProperty(this, "lastRefreshTime", void 0);

    _defineProperty(this, "dataAccessExpirationTime", void 0);

    _defineProperty(this, "accessTokenSource", void 0);

    this.accessToken = tokenMap.accessToken;
    this.permissions = tokenMap.permissions;
    this.declinedPermissions = tokenMap.declinedPermissions;
    this.expiredPermissions = tokenMap.expiredPermissions;
    this.applicationID = tokenMap.applicationID;
    this.userID = tokenMap.userID;
    this.expirationTime = tokenMap.expirationTime;
    this.lastRefreshTime = tokenMap.lastRefreshTime;
    this.dataAccessExpirationTime = tokenMap.dataAccessExpirationTime;
    this.accessTokenSource = tokenMap.accessTokenSource;
    Object.freeze(this);
  }
  /**
   * Getter for the access token that is current for the application.
   */


  static getCurrentAccessToken() {
    return new Promise(resolve => {
      AccessToken.getCurrentAccessToken(tokenMap => {
        if (tokenMap) {
          resolve(new FBAccessToken(tokenMap));
        } else {
          resolve(null);
        }
      });
    });
  }
  /**
   * Setter for the access token that is current for the application.
   */


  static setCurrentAccessToken(accessToken) {
    AccessToken.setCurrentAccessToken(accessToken);
  }
  /**
   * Updates the current access token with up to date permissions,
   * and extends the expiration date, if extension is possible.
   */


  static refreshCurrentAccessTokenAsync() {
    return AccessToken.refreshCurrentAccessTokenAsync();
  }
  /**
   * Adds a listener for when the access token changes. Returns a functions which removes the
   * listener when called.
   */


  static addListener(listener) {
    const subscription = eventEmitter.addListener('fbsdk.accessTokenDidChange', tokenMap => {
      if (tokenMap) {
        listener(new FBAccessToken(tokenMap));
      } else {
        listener(null);
      }
    });
    return () => subscription.remove();
  }
  /**
   * Gets the date at which the access token expires. The value is the number of
   * milliseconds since Jan. 1, 1970, midnight GMT.
   */


  getExpires() {
    return this.expirationTime;
  }
  /**
   * Get the list of permissions associated with this access token. Note that the most up-to-date
   * list of permissions is maintained by Facebook, so this list may be outdated if permissions
   * have been added or removed since the time the AccessToken object was created. See
   * https://developers.facebook.com/docs/reference/login/#permissions for details.
   */


  getPermissions() {
    return this.permissions;
  }
  /**
   * Gets the list of permissions declined by the user with this access token. It represents the
   * entire set of permissions that have been requested and declined. Note that the most
   * up-to-date list of permissions is maintained by Facebook, so this list may be outdated if
   * permissions have been granted or declined since the last time an AccessToken object was
   * created. See https://developers.facebook.com/docs/reference/login/#permissions for details.
   */


  getDeclinedPermissions() {
    return this.declinedPermissions;
  }

  getExpiredPermissions() {
    return this.expiredPermissions;
  }
  /**
   * Gets the date at which the token was last refreshed. Since tokens expire, the Facebook SDK
   * will attempt to renew them periodically. The value is the number of milliseconds since
   * Jan. 1, 1970, midnight GMT.
   */


  getLastRefresh() {
    return this.lastRefreshTime;
  }

  getDataAccessExpiration() {
    return this.dataAccessExpirationTime;
  }
  /**
   * Gets the ID of the Facebook Application associated with this access token.
   */


  getApplicationId() {
    return this.applicationID;
  }
  /**
   * Gets user ID associated with this access token.
   */


  getUserId() {
    return this.userID;
  }

}

var _default = FBAccessToken;
exports.default = _default;
//# sourceMappingURL=FBAccessToken.js.map