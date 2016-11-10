'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AjaxUploader = require('./AjaxUploader');

var _AjaxUploader2 = _interopRequireDefault(_AjaxUploader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function empty() {}

var Upload = _react2.default.createClass({
  displayName: 'Upload',

  propTypes: {
    action: _react.PropTypes.string,
    name: _react.PropTypes.string,
    multipart: _react.PropTypes.bool,
    onError: _react.PropTypes.func,
    onSuccess: _react.PropTypes.func,
    onProgress: _react.PropTypes.func,
    onStart: _react.PropTypes.func,
    data: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),
    headers: _react.PropTypes.object,
    accept: _react.PropTypes.string,
    multiple: _react.PropTypes.bool,
    beforeUpload: _react.PropTypes.func,
    withCredentials: _react.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
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
  },
  getInitialState: function getInitialState() {
    return {
      Component: null
    };
  },
  componentDidMount: function componentDidMount() {
    this.setState({
      Component: _AjaxUploader2.default
    });
  },
  render: function render() {
    var Component = this.state.Component;

    if (Component) {
      return _react2.default.createElement(Component, this.props);
    }
    return null;
  }
});

exports.default = Upload;