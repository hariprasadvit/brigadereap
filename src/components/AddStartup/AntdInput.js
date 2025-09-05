/** @format */

import React from "react";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import styled from "styled-components";

const AntdInput = ({
  label,
  value,
  onChange,
  madantory,
  isTextArea = false,
  type,
  className,
  isPassword,
  disabled,
  onKeyPress,
  placeholder,
}) => {
  return (
    <AntdInputWrapper className="custom-input-container">
      <label className="custom-label">
        {label} {madantory ? <span className="madantory"> * </span> : null}
      </label>
      {isTextArea ? (
        <TextArea
          className="custom-input custom-textarea"
          placeholder={`Enter ${label?.replaceAll("*", "")}`}
          rows={4}
          value={value ?? ""} // Ensure it's controlled
          onChange={onChange} // Ensure form updates its value
        />
      ) : isPassword ? (
        <Input.Password
          type={type}
          className={className || "custom-input"}
          placeholder={`Enter ${label}`}
          value={value ?? ""} // Ensure it's controlled
          onChange={onChange} // Ensure form updates its value
        />
      ) : (
        <Input
          type={type || "text"}
          className={className || "custom-input"}
          placeholder={`Enter ${
            label ? label?.replaceAll("*", "") : placeholder
          }`}
          value={value ?? ""} // Ensure it's controlled
          onChange={onChange} // Ensure form updates its value
          disabled={disabled}
          onKeyPress={onKeyPress}
        />
      )}
    </AntdInputWrapper>
  );
};

export default AntdInput;

const AntdInputWrapper = styled.div`
  &.custom-input-container {
    position: relative;
    display: inline-block;
    width: 100%;
    margin-top: 26px;
    &.upload-input {
      // display: flex;
      // align-items: center;
      gap: 1rem;
      .info-text {
        font-size: 12px;
        color: #999;
      }
    }
  }

  .custom-label {
    position: absolute;
    top: -10px;
    left: 20px;
    background: #fff;
    padding: 0 15px;
    font-size: 16px;
    color: #000;
    z-index: 10;
    .madantory {
      color: red;
    }
  }

  .custom-file-upload-label {
    background: #fff;
    padding: 0 15px;
    font-size: 16px;
    color: #ccc;
    z-index: 10;
    .madantory {
      color: red;
    }
  }

  .custom-input {
    border: 1px solid #ccc;
    border-radius: 0px;
    padding: 14px 36px 10px 36px;
    width: 100%;
    outline: none !important;
    box-shadow: none !important;
    z-index: 9;
    font-size: 16px;
    color: #000;
    &:hover {
      border: 1px solid #000000 !important;
      border-color: #000000 !important;
    }
    &:focus {
      border: 1px solid #000000 !important;
      border-color: #000000 !important;
      &:hover {
        border: 1px solid #000000 !important;
        border-color: #000000 !important;
      }
    }
    .anticon {
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
  .custom-textarea {
    padding: 20px 36px 16px 36px;
    height: 7.3125rem !important;
  }
  .custom-input:focus {
    border-color: #000;
    outline: none !important;
    box-shadow: none !important;
  }

  .ant-input::placeholder {
    color: #999 !important;
    font-weight: lighter !important;
    font-size: 16px;
    font-family: "IBM Plex Sans", sans-serif !important;
  }

  :where(.css-dev-only-do-not-override-ut69n1).ant-input-outlined:focus,
  :where(.css-dev-only-do-not-override-ut69n1).ant-input-outlined:focus-within {
    border-color: #000000 !important;
  }
  :where(.css-dev-only-do-not-override-ut69n1).ant-input-affix-wrapper
    .anticon.ant-input-password-icon {
    color: #000000 !important;
  }

  .range-input {
    .ant-space-item {
      z-index: 10;
    }
  }

  .ant-form-item {
    margin-bottom: 20px;
  }
`;
