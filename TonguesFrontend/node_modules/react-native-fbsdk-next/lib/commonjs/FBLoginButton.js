"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A button that initiates a log in or log out flow upon tapping.
 */
class LoginButton extends React.Component {
  _eventHandler(event) {
    if (typeof event !== 'object' || !event || !event.nativeEvent) {
      return;
    }

    const eventDict = event.nativeEvent;

    if (eventDict.type === 'loginFinished') {
      if (this.props.onLoginFinished) {
        this.props.onLoginFinished(eventDict.error, eventDict.result);
      }
    } else if (eventDict.type === 'logoutFinished') {
      if (this.props.onLogoutFinished) {
        this.props.onLogoutFinished();
      }
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(RCTFBLoginButton, _extends({}, this.props, {
      onChange: this._eventHandler.bind(this)
    }));
  }

}

_defineProperty(LoginButton, "defaultProps", void 0);

const styles = _reactNative.StyleSheet.create({
  defaultButtonStyle: {
    height: 30,
    width: 190
  }
});

LoginButton.defaultProps = {
  style: styles.defaultButtonStyle
};
const RCTFBLoginButton = (0, _reactNative.requireNativeComponent)('RCTFBLoginButton');
var _default = LoginButton;
exports.default = _default;
//# sourceMappingURL=FBLoginButton.js.map