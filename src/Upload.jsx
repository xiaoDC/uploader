import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AjaxUpload from './AjaxUploader';

function empty() {
}


class Upload extends Component{
  constructor(props) {
    super(props);

    this.state = {
      Component: null,
    }
  }

  componentDidMount() {
    this.setState({
      Component: AjaxUpload,
    });
  }

  render() {
    const { Component } = this.state;
    if (Component) {
      return <Component {...this.props} />;
    }
    return null;
  }
}

Upload.propTypes = {
  action: PropTypes.string,
  name: PropTypes.string,
  multipart: PropTypes.bool,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  onProgress: PropTypes.func,
  onStart: PropTypes.func,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
  headers: PropTypes.object,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  beforeUpload: PropTypes.func,
  withCredentials: PropTypes.bool,
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
  withCredentials: false,
};

export default Upload;
