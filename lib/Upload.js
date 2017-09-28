'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AjaxUploader = require('./AjaxUploader');

var _AjaxUploader2 = _interopRequireDefault(_AjaxUploader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function empty() {}

var Upload = function (_Component) {
  _inherits(Upload, _Component);

  function Upload(props) {
    _classCallCheck(this, Upload);

    var _this = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this, props));

    _this.state = {
      Component: null
    };
    return _this;
  }

  _createClass(Upload, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        Component: _AjaxUploader2.default
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var Component = this.state.Component;

      if (Component) {
        return _react2.default.createElement(Component, this.props);
      }
      return null;
    }
  }]);

  return Upload;
}(_react.Component);

Upload.propTypes = {
  action: _propTypes2.default.string,
  name: _propTypes2.default.string,
  multipart: _propTypes2.default.bool,
  onError: _propTypes2.default.func,
  onSuccess: _propTypes2.default.func,
  onProgress: _propTypes2.default.func,
  onStart: _propTypes2.default.func,
  data: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
  headers: _propTypes2.default.object,
  accept: _propTypes2.default.string,
  multiple: _propTypes2.default.bool,
  beforeUpload: _propTypes2.default.func,
  withCredentials: _propTypes2.default.bool
};
Upload.defaultProps = {
  data: {},
  headers: {},
  name: 'file',
  multipart: false,
  onProgress: empty,
  onStart: empty,
  onError: empty,
  onSuccess: empty,
  multiple: false,
  beforeUpload: null,
  withCredentials: false
};

exports.default = Upload;