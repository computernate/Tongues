/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { isDefined, isString } from './util/validate';
import { Platform, NativeModules } from 'react-native';
const Settings = NativeModules.FBSettings;
export default {
  /**
   * For iOS only, get AdvertiserTrackingEnabled status.
   * @platform ios
   */
  getAdvertiserTrackingEnabled() {
    if (Platform.OS === 'ios') {
      return Settings.getAdvertiserTrackingEnabled();
    } else {
      return Promise.resolve(true);
    }
  },

  /**
   * For iOS only, set AdvertiserTrackingEnabled status, only works in iOS 14 and above.
   * @platform ios
   */
  setAdvertiserTrackingEnabled(ATE) {
    if (Platform.OS === 'ios') {
      return Settings.setAdvertiserTrackingEnabled(ATE);
    } else {
      return Promise.resolve(false);
    }
  },

  /**
   * Set data processing options
   */
  setDataProcessingOptions(options) {
    let country = 0;

    if (typeof (arguments.length <= 1 ? undefined : arguments[1]) === 'number') {
      country = arguments.length <= 1 ? undefined : arguments[1];
    }

    let state = 0;

    if (typeof (arguments.length <= 2 ? undefined : arguments[2]) === 'number') {
      state = arguments.length <= 2 ? undefined : arguments[2];
    }

    Settings.setDataProcessingOptions(options, country, state);
  },

  /**
   * Initialize the sdk
   */
  initializeSDK() {
    Settings.initializeSDK();
  },

  /**
   * Set app id
   */
  setAppID(appID) {
    if (!isDefined(appID) || !isString(appID) || appID.length === 0) {
      throw new Error("setAppID expected 'appID' to be a non empty string");
    }

    Settings.setAppID(appID);
  }

};
//# sourceMappingURL=FBSettings.js.map