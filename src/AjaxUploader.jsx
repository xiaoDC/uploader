import React, { PropTypes } from 'react';
import classNames from 'classnames';
import defaultRequest from './request';
import getUid from './uid';

const AjaxUploader = React.createClass({
  propTypes: {
    component: PropTypes.string,
    style: PropTypes.object,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    multiple: PropTypes.bool,
    accept: PropTypes.string,
    children: PropTypes.any,
    onStart: PropTypes.func,
    headers: PropTypes.object,
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),
    beforeUpload: PropTypes.func.isRequired,
    customRequest: PropTypes.func,
    withCredentials: PropTypes.bool,
  },

  getInitialState() {
    this.reqs = {};
    return {
      uid: getUid(),
    };
  },

  componentWillUnmount() {
    this.abort();
  },

  onChange(e) {
    const files = e.target.files;
    this.uploadFiles(files);
    this.reset();
  },

  onClick() {
    const el =this.refs.file;
    if (!el) {
      return;
    }
    el.click();
  },

  onKeyDown(e) {
    if (e.key == 'Enter') {
      this.onClick();
    }
  },

  onFileDrop(e) {
    if (e.type === 'dragover') {
      e.preventDefault();
      return;
    }

    const files = e.dataTransfer.files;
    this.uploadFiles(files);
    e.preventDefault();
  },

  uploadFiles(files) {
    const postFiles = Array.prototype.slice.call(files);
    const len = postFiles.length;
    for (let i = 0; i < len; i++) {
      const file = postFiles[i];
      file.uid = getUid();
      this.upload(file);
    }
  },

  upload(file) {
    const { props } = this;

    const before = props.beforeUpload(file);
    if (before && before.then) {
      before.then(res => {
        if (!res) return;
        const { options, action, meta } = res;
        Object.keys(meta).forEach(key => file[key] = meta[key]);
        this.post(file, options, action);
      });
    }
  },

  post(file, newOptions, newAction) {
    if (!this.isMounted()) {
      return;
    }

    if (!newAction) {
      props.onError(newOptions, newOptions, file);
    }

    const { props } = this;
    let { data } = props;
    const { onStart } = props;
    if (typeof data === 'function') {
      data = data(file);
    }
    if (newOptions) {
      data = newOptions;
    }
    const { uid } = file;
    const request = defaultRequest;
    this.reqs[uid] = request({
      action: newAction,
      filename: props.name,
      file,
      data,
      headers: props.headers,
      withCredentials: props.withCredentials,
      onProgress: e => {
        props.onProgress(e, file);
      },
      onSuccess: ret => {
        delete this.reqs[uid];
        props.onSuccess(ret, file);
      },
      onError: (err, ret) => {
        delete this.reqs[uid];
        props.onError(err, ret, file);
      },
    });
    onStart(file);
  },

  reset() {
    this.setState({
      uid: getUid(),
    });
  },

  abort(file) {
    const { reqs } = this;
    if (file) {
      let uid = file;
      if (file && file.uid) {
        uid = file.uid;
      }
      if (reqs[uid]) {
        reqs[uid].abort();
        delete reqs[uid];
      }
    } else {
      Object.keys(reqs).forEach((uid) => {
        reqs[uid].abort();
        delete reqs[uid];
      });
    }
  },

  render() {
    const hidden = { display: 'none' };
    const props = this.props;
    return (
      <span
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        onDrop={this.onFileDrop}
        onDragOver={this.onFileDrop}
        role="button"
        tabIndex="0"
        >
        <input type="file"
               ref="file"
               style={hidden}
               accept={props.accept}
               multiple={this.props.multiple}
               onChange={this.onChange}
          />
        {props.children}
      </span>
    );
  },
});


export default AjaxUploader;
