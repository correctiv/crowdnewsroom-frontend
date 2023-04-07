import React, { Component } from "react";
import PropTypes from "prop-types";

import { dataURItoBlob, shouldRender } from "./utils";
import uuid from "react-uuid";

async function processFile(file) {
  const { name, size, type } = file;
  console.log(file);
  return await uploadStorage(file).then(res => {
    console.log(res);
    return {
      dataURL: res.fileNameStorage,
      name,
      size,
      type
    };
  });
}

async function processFiles(files) {
  return Promise.all([].map.call(files, processFile));
}

function FilesInfo(props) {
  const { filesInfo } = props;
  if (filesInfo.length === 0) {
    return null;
  }
  return (
    <ul className="file-info">
      {filesInfo.map((fileInfo, key) => {
        const { name, size, type } = fileInfo;
        return (
          <li key={key}>
            <strong>{name}</strong> ({type}, {size} bytes)
          </li>
        );
      })}
    </ul>
  );
}

function extractFileInfo(dataURLs) {
  return dataURLs
    .filter(dataURL => typeof dataURL !== "undefined")
    .map(dataURL => {
      const { blob, name } = dataURItoBlob(dataURL);
      return {
        name: name,
        size: blob.size,
        type: blob.type
      };
    });
}

async function uploadStorage(file) {
  const uniqueHash = uuid();
  const fileExt = file.name.match(/\.([0-9a-z]+)(?:[?#]|$)/i);
  const uniqueFilename = uniqueHash + fileExt[0];
  console.log(uniqueFilename);
  const uploadUrl = fetch(
    `${
      process.env.REACT_APP_BACKEND_URL
    }/forms/presigned_url?name=${uniqueFilename}`
  )
    .then(response => response.json())
    .then(res => {
      return res;
    });
  const uploadUrlSigned = await uploadUrl;
  const requestOptions = {
    method: "PUT",
    body: file
  };
  const uploaded = fetch(uploadUrlSigned, requestOptions).then(data => {
    return {
      data,
      fileNameStorage: uniqueFilename
    };
  });
  return await uploaded;
}

class StorageFileWidget extends Component {
  constructor(props) {
    super(props);
    const { value } = props;
    const values = Array.isArray(value) ? value : [value];
    this.state = { values, filesInfo: extractFileInfo(values) };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  onChange = event => {
    const { multiple, onChange } = this.props;
    processFiles(event.target.files).then(filesInfo => {
      const state = {
        values: filesInfo.map(fileInfo => fileInfo.dataURL),
        filesInfo
      };
      this.setState(state, () => {
        console.log(state);
        if (multiple) {
          onChange(state.values);
        } else {
          onChange(state.values[0]);
        }
      });
    });
  };

  render() {
    const { id, readonly, disabled, autofocus } = this.props;
    const { filesInfo } = this.state;
    return (
      <div>
        <p>
          <input
            ref={ref => (this.inputRef = ref)}
            id={id}
            type="file"
            disabled={readonly || disabled}
            onChange={this.onChange}
            defaultValue=""
            autoFocus={autofocus}
            multiple={false}
            accept="video/*"
          />
        </p>
        <FilesInfo filesInfo={filesInfo} />
      </div>
    );
  }
}

StorageFileWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  StorageFileWidget.propTypes = {
    multiple: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    autofocus: PropTypes.bool
  };
}

export default StorageFileWidget;
