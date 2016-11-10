'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

var _uid = require('./uid');

var _uid2 = _interopRequireDefault(_uid);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AjaxUploader = _react2.default.createClass({
  displayName: 'AjaxUploader',

  propTypes: {
    component: _react.PropTypes.string,
    style: _react.PropTypes.object,
    prefixCls: _react.PropTypes.string,
    className: _react.PropTypes.string,
    multiple: _react.PropTypes.bool,
    accept: _react.PropTypes.string,
    children: _react.PropTypes.any,
    onStart: _react.PropTypes.func,
    headers: _react.PropTypes.object,
    data: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),
    beforeUpload: _react.PropTypes.func.isRequired,
    customRequest: _react.PropTypes.func,
    withCredentials: _react.PropTypes.bool
  },

  getInitialState: function getInitialState() {
    this.reqs = {};
    return {
      uid: (0, _uid2.default)()
    };
  },
  componentWillUnmount: function componentWillUnmount() {
    this.abort();
  },
  onChange: function onChange(e) {
    var files = e.target.files;
    this.uploadFiles(files);
    this.reset();
  },
  onClick: function onClick() {
    var el = this.refs.file;
    if (!el) {
      return;
    }
    el.click();
  },
  onKeyDown: function onKeyDown(e) {
    if (e.key == 'Enter') {
      this.onClick();
    }
  },
  onFileDrop: function onFileDrop(e) {
    if (e.type === 'dragover') {
      e.preventDefault();
      return;
    }

    var files = e.dataTransfer.files;
    this.uploadFiles(files);
    e.preventDefault();
  },
  uploadFiles: function uploadFiles(files) {
    var postFiles = Array.prototype.slice.call(files);
    var len = postFiles.length;
    for (var i = 0; i < len; i++) {
      var file = postFiles[i];
      file.uid = (0, _uid2.default)();
      this.upload(file);
    }
  },
  upload: function upload(file) {
    var _this = this;

    var props = this.props;


    var before = props.beforeUpload(file);
    if (before && before.then) {
      before.then(function (_ref) {
        var options = _ref.options;
        var action = _ref.action;
        var meta = _ref.meta;

        var newfile = (0, _objectAssign2.default)({}, file, meta);
        _this.post(file, options, action);
      });
    }
  },
  post: function post(file, newOptions, newAction) {
    var _this2 = this;

    if (!this.isMounted()) {
      return;
    }

    if (!newAction) {
      props.onError(newOptions, newOptions, file);
    }

    var props = this.props;
    var data = props.data;
    var onStart = props.onStart;

    if (typeof data === 'function') {
      data = data(file);
    }
    if (newOptions) {
      data = newOptions;
    }
    var uid = file.uid;

    var request = _request2.default;
    this.reqs[uid] = request({
      action: newAction,
      filename: props.name,
      file: file,
      data: data,
      headers: props.headers,
      withCredentials: props.withCredentials,
      onProgress: function onProgress(e) {
        props.onProgress(e, file);
      },
      onSuccess: function onSuccess(ret) {
        delete _this2.reqs[uid];
        props.onSuccess(ret, file);
      },
      onError: function onError(err, ret) {
        delete _this2.reqs[uid];
        props.onError(err, ret, file);
      }
    });
    onStart(file);
  },
  reset: function reset() {
    this.setState({
      uid: (0, _uid2.default)()
    });
  },
  abort: function abort(file) {
    var reqs = this.reqs;

    if (file) {
      var uid = file;
      if (file && file.uid) {
        uid = file.uid;
      }
      if (reqs[uid]) {
        reqs[uid].abort();
        delete reqs[uid];
      }
    } else {
      Object.keys(reqs).forEach(function (uid) {
        reqs[uid].abort();
        delete reqs[uid];
      });
    }
  },
  render: function render() {
    var hidden = { dispaly: 'none' };
    var props = this.props;
    return _react2.default.createElement(
      'span',
      {
        onClick: this.onClick,
        onKeyDown: this.onKeyDown,
        onDrop: this.onFileDrop,
        onDragOver: this.onFileDrop,
        role: 'button',
        tabIndex: '0'
      },
      _react2.default.createElement('input', { type: 'file',
        ref: 'file',
        style: hidden,
        accept: props.accept,
        multiple: this.props.multiple,
        onChange: this.onChange
      }),
      props.children
    );
  }
});

exports.default = AjaxUploader;