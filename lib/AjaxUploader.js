'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

var _uid = require('./uid');

var _uid2 = _interopRequireDefault(_uid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AjaxUploader = function (_Component) {
  _inherits(AjaxUploader, _Component);

  function AjaxUploader(props) {
    _classCallCheck(this, AjaxUploader);

    var _this = _possibleConstructorReturn(this, (AjaxUploader.__proto__ || Object.getPrototypeOf(AjaxUploader)).call(this, props));

    _this.reqs = {};
    _this.state = {
      uid: (0, _uid2.default)()
    };
    return _this;
  }

  _createClass(AjaxUploader, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.abort();
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var files = e.target.files;
      this.uploadFiles(files);
      this.reset();
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      var el = this.refs.file;
      if (!el) {
        return;
      }
      el.click();
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      if (e.key == 'Enter') {
        this.onClick();
      }
    }
  }, {
    key: 'onFileDrop',
    value: function onFileDrop(e) {
      if (e.type === 'dragover') {
        e.preventDefault();
        return;
      }

      var files = e.dataTransfer.files;
      this.uploadFiles(files);
      e.preventDefault();
    }
  }, {
    key: 'uploadFiles',
    value: function uploadFiles(files) {
      var postFiles = Array.prototype.slice.call(files);
      var len = postFiles.length;
      for (var i = 0; i < len; i++) {
        var file = postFiles[i];
        file.uid = (0, _uid2.default)();
        this.upload(file);
      }
    }
  }, {
    key: 'upload',
    value: function upload(file) {
      var _this2 = this;

      var props = this.props;


      var before = props.beforeUpload(file);
      if (before && before.then) {
        before.then(function (res) {
          if (!res) return;
          var options = res.options,
              action = res.action,
              meta = res.meta;

          Object.keys(meta).forEach(function (key) {
            return file[key] = meta[key];
          });
          _this2.post(file, options, action);
        });
      }
    }
  }, {
    key: 'post',
    value: function post(file, newOptions, newAction) {
      var _this3 = this;

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
          delete _this3.reqs[uid];
          props.onSuccess(ret, file);
        },
        onError: function onError(err, ret) {
          delete _this3.reqs[uid];
          props.onError(err, ret, file);
        }
      });
      onStart(file);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.setState({
        uid: (0, _uid2.default)()
      });
    }
  }, {
    key: 'abort',
    value: function abort(file) {
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
    }
  }, {
    key: 'render',
    value: function render() {
      var hidden = { display: 'none' };
      var props = this.props;
      return _react2.default.createElement(
        'span',
        {
          onClick: this.onClick.bind(this),
          onKeyDown: this.onKeyDown.bind(this),
          onDrop: this.onFileDrop.bind(this),
          onDragOver: this.onFileDrop,
          role: 'button',
          tabIndex: '0'
        },
        _react2.default.createElement('input', { type: 'file',
          ref: 'file',
          style: hidden,
          accept: props.accept,
          multiple: this.props.multiple,
          onChange: this.onChange.bind(this)
        }),
        props.children
      );
    }
  }]);

  return AjaxUploader;
}(_react.Component);

;

AjaxUploader.propTypes = {
  component: _propTypes2.default.string,
  style: _propTypes2.default.object,
  prefixCls: _propTypes2.default.string,
  className: _propTypes2.default.string,
  multiple: _propTypes2.default.bool,
  accept: _propTypes2.default.string,
  children: _propTypes2.default.any,
  onStart: _propTypes2.default.func,
  headers: _propTypes2.default.object,
  data: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
  beforeUpload: _propTypes2.default.func.isRequired,
  customRequest: _propTypes2.default.func,
  withCredentials: _propTypes2.default.bool
};

exports.default = AjaxUploader;