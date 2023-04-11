import React, { Component } from "react";
import PropTypes from "prop-types";

import { shouldRender, fakeUuid } from "./utils";

async function processFile(file) {
  const { name, size, type } = file;
  return await uploadStorage(file).then(res => {
    return {
      storageFileName: res.fileNameStorage,
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
    <div className="file-info" style={{ display: "flex" }}>
      {filesInfo.map((fileInfo, key) => {
        const { storageFileName: name, size, type } = fileInfo;
        return (
          <p key={key}>
            <strong>{name}</strong> ({type}, {(size / 1000000).toFixed(2)} MB)
          </p>
        );
      })}
    </div>
  );
}

function extractFileInfo(file) {
  return file
    .filter(storageFileName => typeof storageFileName !== "undefined")
    .map(fileObj => {
      return {
        name: fileObj.name,
        size: fileObj.size,
        type: fileObj.type
      };
    });
}

async function uploadStorage(file) {
  const uniqueHash = fakeUuid();
  const fileExt = file.name.match(/\.([0-9a-z]+)(?:[?#]|$)/i);
  const uniqueFilename = uniqueHash + fileExt[0];
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
  const uploaded = fetch(uploadUrlSigned, requestOptions)
    .then(data => {
      return {
        data,
        fileNameStorage: uniqueFilename
      };
    })
    .catch(e => {
      throw e;
    });
  return await uploaded;
}

class StorageVideoWidget extends Component {
  constructor(props) {
    super(props);
    const { value } = props;
    const values = Array.isArray(value) ? value : [value];
    this.state = {
      values,
      filesInfo: extractFileInfo(values),
      isLoading: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  onChange = event => {
    const { multiple, onChange } = this.props;
    const submitElem = document.querySelectorAll("input.btn, a.btn");
    submitElem.forEach(e => {
      e.disabled = true;
    });
    this.setState({ isLoading: true });
    processFiles(event.target.files)
      .then(filesInfo => {
        const state = {
          values: filesInfo.map(fileInfo => fileInfo.storageFileName),
          filesInfo
        };
        this.setState(state, () => {
          if (multiple) {
            onChange(state.values);
          } else {
            onChange(state.values[0]);
          }
        });
        this.setState({ isLoading: false });
        submitElem.forEach(e => {
          e.disabled = false;
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
        submitElem.forEach(e => {
          e.disabled = false;
        });
      });
  };

  render() {
    const { id, readonly, disabled, autofocus, options } = this.props;
    const { filesInfo } = this.state;
    return (
      <div>
        {!!options.question && options.question !== "" ? (
          <p>{options.question}</p>
        ) : null}
        <p>
          <input
            ref={ref => (this.inputRef = ref)}
            id={id}
            type="file"
            disabled={readonly || disabled || this.state.isLoading}
            onChange={this.onChange}
            defaultValue=""
            autoFocus={autofocus}
            multiple={false}
            accept="video/*"
            style={{ width: "100%" }}
          />
        </p>
        {this.state.isLoading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
              opacity=".25"
            />
            <path
              fill="currentColor"
              d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
            >
              <animateTransform
                attributeName="transform"
                dur="0.75s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </path>
          </svg>
        ) : null}
        <FilesInfo filesInfo={filesInfo} />
      </div>
    );
  }
}

StorageVideoWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  StorageVideoWidget.propTypes = {
    multiple: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    autofocus: PropTypes.bool
  };
}

export default StorageVideoWidget;
