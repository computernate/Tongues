"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

/**
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/**
 * Aggregated Event Measurement (AEM) for iOS apps allows for the measurement of app events
 * from iOS 14.5+ users who have opted out of app tracking.
 *
 * @ref https://developers.facebook.com/docs/app-events/guides/aggregated-event-measurement/
 */
var _default = {
  /**
   * Log AEM event, event names for AEM must match event names you used in app event logging.
   *
   * *This method will bypass if platform isn't iOS*
   *
   * **Make sure you also handle the DeepLink URL with AEM**
   *
   * @ref https://developers.facebook.com/docs/app-events/guides/aggregated-event-measurement/
   * @platform iOS
   */
  logAEMEvent: (eventName, value, currency, otherParameters) => {
    // AEM is currently only for iOS
    if (_reactNative.Platform.OS !== 'ios') {
      return;
    }

    _reactNative.NativeModules.FBSDKAEMReporter.recordAndUpdateEvent(eventName, value, currency, otherParameters);
  }
};
exports.default = _default;
//# sourceMappingURL=FBAEMReporter.js.map