/** @format */

import { Checkbox } from "antd";
import React from "react";
import styled from "styled-components";

const AntdCheckbox = ({
  name = "",
  checked = false,
  label,
  marginTop,
  paddingBot,
  disabled = false,
  onChange = () => {},
}) => {
  return (
    <AntdCheckboxWrapper
      className="checkboxwrap"
      style={{ marginTop: marginTop, paddingBottom: paddingBot }}
    >
      <Checkbox
        onChange={(e) => onChange(e.target.checked)} // <-- pass only checked value
        name={name}
        checked={checked} // <-- controlled
        disabled={disabled}
      >
        {label}
      </Checkbox>
    </AntdCheckboxWrapper>
  );
};
export default AntdCheckbox;

const AntdCheckboxWrapper = styled.div`
  &.checkboxwrap {
    margin-right: 15px;
    margin-top: 30px;
    .ant-checkbox-wrapper {
      color: ${({ theme }) => theme.colors.greys.g1};
      font-size: 14px;
      font-weight: 400;
      line-height: 1.5;
    }
    .ant-checkbox-inner {
      padding: 4px;
      width: 24px;
      height: 24px;
      border: 2px solid ${({ theme }) => theme.colors.greys.g2};
    }
    .ant-checkbox-label {
      padding: 0 15px;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.88);
      z-index: 10;
      .madantory {
        color: red;
      }
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: ${({ theme }) => theme.colors.primaryYellow};
      border: 2px solid ${({ theme }) => theme.colors.primaryYellow};
    }
    .ant-checkbox .ant-checkbox-inner:after {
      width: 6px;
      height: 11px;
      top: 46%;
      left: 35%;
      border: 0px 2px 2px 0px solid #fff;
    }
    .ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover
      .ant-checkbox-checked:not(.ant-checkbox-disabled)
      .ant-checkbox-inner {
      background-color: ${({ theme }) => theme.colors.primaryYellow};
    }
    .ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover
      .ant-checkbox-inner,
    .ant-checkbox:not(.ant-checkbox-disabled):hover .ant-checkbox-inner {
      border: 2px solid #d9d8dd;
    }
  }
`;
