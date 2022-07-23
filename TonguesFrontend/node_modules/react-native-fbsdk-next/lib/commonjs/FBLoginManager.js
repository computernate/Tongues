"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
 * copy, modify, and distribute this software in source code or binary form for use
 * in connection with the web services and APIs provided by Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use of
 * this software is subject to the Facebook Developer Principles and Policies
 * [http://developers.facebook.com/policy/]. This copyright notice shall be
 * included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @format
 */
const LoginManager = _reactNative.NativeModules.FBLoginManager;
/**
 * Indicates which default audience to use for sessions that post data to Facebook.
 */

var _default = {
  /**
   * Log in with the requested permissions.
   * @param loginTrackingIOS IOS only: loginTracking: 'enabled' | 'limited', default 'enabled'.
   * @param nonceIOS IOS only: Nonce that the configuration was created with. A unique nonce will be used if none is provided to the factory method.
   */
  logInWithPermissions(permissions, loginTrackingIOS, nonceIOS) {
    if (_reactNative.Platform.OS === 'ios') {
      return LoginManager.logInWithPermissions(permissions, loginTrackingIOS, nonceIOS);
    }

    return LoginManager.logInWithPermissions(permissions);
  },

  /**
   * Getter for the login behavior.
   */
  getLoginBehavior() {
    if (_reactNative.Platform.OS === 'ios') {
      return Promise.resolve('browser');
    } else {
      return LoginManager.getLoginBehavior();
    }
  },

  /**
   * Setter for the login behavior.
   */
  setLoginBehavior(loginBehavior) {
    if (_reactNative.Platform.OS === 'ios') {
      return;
    }

    LoginManager.setLoginBehavior(loginBehavior);
  },

  /**
   * Getter for the default audience.
   */
  getDefaultAudience() {
    return LoginManager.getDefaultAudience();
  },

  /**
   * Setter for the default audience.
   */
  setDefaultAudience(defaultAudience) {
    LoginManager.setDefaultAudience(defaultAudience);
  },

  /**
   * Re-authorizes the user to update data access permissions.
   */
  reauthorizeDataAccess() {
    return LoginManager.reauthorizeDataAccess();
  },

  /**
   * Logs out the user.
   */
  logOut() {
    LoginManager.logOut();
  }

};
exports.default = _default;
//# sourceMappingURL=FBLoginManager.js.map