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
const MessageDialog = _reactNative.NativeModules.FBMessageDialog;
var _default = {
  /**
   * Check if the dialog can be shown.
   */
  canShow(shareContent) {
    return MessageDialog.canShow(shareContent);
  },

  /**
   * Shows the dialog using the specified content.
   */
  show(shareContent) {
    return MessageDialog.show(shareContent);
  },

  /**
   * Sets whether or not the native message dialog should fail when it encounters a data error.
   */
  setShouldFailOnDataError(shouldFailOnDataError) {
    MessageDialog.setShouldFailOnDataError(shouldFailOnDataError);
  }

};
exports.default = _default;
//# sourceMappingURL=FBMessageDialog.js.map