import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";

export default function AntdDatepicker({
  label,
  error,
  placeholder,
  value,
  name,
  onChange,
  disabledDate,
  customStyles,
  picker,
}) {
  return (
    <AntdDatepickerWrapper
      className="custom-input-container"
      style={customStyles}
    >
      {label && <label className="custom-label">{label}</label>}
      <DatePicker
        onChange={(e) => {
          onChange(picker === "year" ? dayjs(e).format("YYYY") : e, name);
        }}
        style={{ borderColor: error && "red", padding: "14px 12px 10px 36px" }}
        placeholder={placeholder}
        value={
          value ? dayjs(value, picker === "year" ? "YYYY" : "YYYY-MM-DD") : null
        }
        format={picker === "year" ? "YYYY" : "DD MMMM YYYY"}
        disabledDate={disabledDate}
        className="custom-input"
        picker={picker}
      />
    </AntdDatepickerWrapper>
  );
}

const AntdDatepickerWrapper = styled.div`
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
  .ant-picker-suffix {
    svg {
      color: #999 !important;
      width: 26px !important;
      height: 26px !important;
    }
  }

  .ant-picker-input input::placeholder {
    color: #999 !important;
    font-weight: lighter !important;
    font-size: 16px;
    font-family: "IBM Plex Sans", sans-serif !important;
  }
  .ant-picker-input input {
    font-size: 16px !important;
  }
`;
