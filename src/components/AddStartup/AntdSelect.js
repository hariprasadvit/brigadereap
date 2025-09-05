/** @format */

import { Select } from "antd";
import styled from "styled-components";

const AntdSelect = ({
  label,
  mapData,
  value,
  onChange,
  mode,
  disabled,
  style,
  allowClear,
  showSearch,
  placeholder,
  popupRender = null
}) => {
  return (
    <AntdSelectWrapper className="select-wrapper" style={style}>
      <label className="select-label">{label}</label>
      <Select
        className={value ? "custom-select selected" : "custom-select"}
        value={value}
        onChange={onChange}
        mode={mode}
        // popupRender={popupRender}
        disabled={disabled}
        placeholder={placeholder || `${label?.replaceAll("*", "")}`}
        allowClear={allowClear}
        showSearch={showSearch}
        // {...(showSearch && {
        //   filterOption: (input, option) =>
        //     (option?.children ?? "")
        //       .toString()
        //       .toLowerCase()
        //       .includes(input.toLowerCase()),
        // })}
      >
        {mapData.map((val) => (
          <Select.Option key={val.id} value={val.id} disabled={val.disabled}>
            {val.label || val.page_name || val.name}
          </Select.Option>
        ))}
      </Select>
    </AntdSelectWrapper>
  );
};

export default AntdSelect;

const AntdSelectWrapper = styled.div`
  /** @format */

  &.select-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
    margin-top: 26px;
  }

  .select-label {
    position: absolute;
    top: -10px;
    left: 20px;
    background: #fff;
    padding: 0 15px;
    font-size: 16px;
    z-index: 10; /* Ant Design primary color */
  }

  .custom-select {
    width: 100%;
    width: 100%;
    outline: none !important;
    box-shadow: none !important;
    z-index: 9;
    font-size: 16px;
    color: #000;
    height: auto;
    border: 0px !important;
    border-radius: 2px;
    &.selected {
      .ant-select-selector {
        // background: linear-gradient(
        //   to top,
        //   rgba(46, 91, 255, 0.1),
        //   rgba(46, 91, 255, 0.05)
        // );
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0.7) 10%,
          rgba(46, 91, 255, 0.1) 70%,
          rgba(46, 91, 255, 0.2) 100%
        );
      }
    }
  }

  .custom-select > .ant-select-selector {
    // border: 0px;
    border-radius: 4px;
    font-size: 18px;
    padding: 6px 34px 6px 34px !important;
    font-weight: 500;
    border: 1px solid #ccc !important;
  }
  .ant-select-focused .ant-select-selector,
  .ant-select:hover .ant-select-selector {
    border-color: black !important;
    box-shadow: none !important;
  }
  .custom-select > .ant-select-selection-overflow {
    flex-wrap: nowrap;
    overflow-x: scroll;
  }
  .ant-select-selection-wrap {
    margin: 4px 0px;
  }
  .custom-select .ant-select-arrow,
  .custom-select .ant-select-clear {
    background: #999 !important; /* Set background color */
    padding: 14px 8px;
    border-radius: 4px;
    color: white !important; /* Change arrow color to white for contrast */
  }
  .ant-select .ant-select-arrow,
  .custom-select .ant-select-clear {
    top: 36%;
  }
  .custom-select .ant-select-clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    top: 34%;
    right: 2.6%;
    border: 1px solid #fff !important; /* Set background color */
    background: #fff !important; /* Set background color */
    svg {
      color: #999; // rgb(248, 184, 23);
      width: 24px;
      height: 24px;
    }
  }

  :where(
      .css-dev-only-do-not-override-1261szd
    ).ant-select-outlined.ant-select-status-error:not(
      .ant-select-customize-input
    )
    .ant-select-selector {
    border: 1px solid #ff4d4f !important;
    background: #ffffff;
  }
  :where(
      .css-dev-only-do-not-override-36gkoj
    ).ant-select-outlined.ant-select-status-error:not(
      .ant-select-customize-input
    )
    .ant-select-selector {
    border: 1px solid #ff4d4f !important;
    background: #ffffff;
  }

  .ant-select-selection-placeholder {
    color: #999 !important;
    font-weight: lighter !important;
    font-size: 16px;
    font-family: "IBM Plex Sans", sans-serif !important;
  }

  .ant-select-item-option-selected,
  :where(.css-dev-only-do-not-override-ut69n1).ant-select-dropdown
    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: rgba(248, 184, 23, 0.3);
  }
  .ant-select-selector {
    border: none !important;
  }
  .ant-select {
    border: 1px solid #ccc;
    &:hover {
      border-color: #000000 !important;
    }
  }
  // .anticon-close-circle {
  //   width: 25px;
  //   height: 25px;
  //   background: rgb(248, 184, 23); /* Set background color */
  //   border-radius: 50%;
  // }
  :where(
      .css-dev-only-do-not-override-1v5z42l
    ).ant-select-outlined.ant-select-status-error:not(
      .ant-select-customize-input
    )
    .ant-select-selector {
    border: 1px solid #ff4d4f !important;
  }
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
  }
`;
