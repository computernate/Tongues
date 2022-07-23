function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @format
 */
import { Platform, NativeModules } from 'react-native';
const AuthenticationToken = NativeModules.FBAuthenticationToken;

/**
 * Represents an immutable access token for using Facebook services.
 */
class FBAuthenticationToken {
  /**
     The raw token string from the authentication response
    */

  /**
     The nonce from the decoded authentication response
    */

  /**
    The graph domain where the user is authenticated.
   */
  constructor(tokenMap) {
    _defineProperty(this, "authenticationToken", void 0);

    _defineProperty(this, "nonce", void 0);

    _defineProperty(this, "graphDomain", void 0);

    this.authenticationToken = tokenMap.authenticationToken;
    this.nonce = tokenMap.nonce;
    this.graphDomain = tokenMap.graphDomain;
    Object.freeze(this);
  }
  /**
   * Getter for the authentication token
   */


  static getAuthenticationTokenIOS() {
    if (Platform.OS === 'android') {
      return Promise.resolve(null);
    }

    return new Promise(resolve => {
      AuthenticationToken.getAuthenticationToken(tokenMap => {
        if (tokenMap) {
          resolve(new FBAuthenticationToken(tokenMap));
        } else {
          resolve(null);
        }
      });
    });
  }

}

export default FBAuthenticationToken;
//# sourceMappingURL=FBAuthenticationToken.js.map