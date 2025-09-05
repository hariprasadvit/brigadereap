/** @format */

import React from "react";
import { Pagination } from "antd";
import styled from "styled-components";
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import theme from "@/app/styles";

const StyledPagination = styled(Pagination)`
  margin-top: 30px;
  display: none !important;
  .ant-pagination-item {
    border: none;
    background: transparent;
    color: #000;
  }

  .ant-pagination-item-active {
    font-weight: bold;
    border-color: #000;
    background-color: ${theme.colors.button.primaryBg};
    a {
      color: #000;
    }
  }

  .ant-pagination-item-link {
    color: #000;
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    .ant-pagination-item-link {
      color: #000;
    }
  }
`;

const CustomPagination = ({
  pageSize = 10,
  maxPage,
  currentPage,
  showTotal,
  onPageChange,
  showQuickJumper,
}) => (
  <StyledPagination
    pageSize={pageSize}
    showSizeChanger={false}
    total={maxPage * pageSize}
    hideOnSinglePage
    current={currentPage}
    showTotal={(total) =>
      showTotal ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            Showing Page {currentPage} of {total / tableFilters.items}
          </div>
        </div>
      ) : null
    }
    onChange={(val, filter) => {
      if ((val > 0 && val <= (maxPage || 0)) || maxPage === 0) {
        onPageChange(val);
      }
    }}
    itemRender={(_, type, originalElement) => {
      if (type === "prev") {
        return (
          <div style={{ display: "flex" }}>
            <div
              className="prev-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (currentPage != 1) onPageChange(1);
              }}
              title="First page"
              style={{ marginRight: 12 }}
            >
              <div className="arrow prev">
                <DoubleLeftOutlined />
              </div>
            </div>
            <div className="prev-btn">
              <div className="arrow prev">
                <LeftOutlined />
              </div>
            </div>
          </div>
        );
      }
      if (type === "next") {
        return (
          <div style={{ display: "flex" }}>
            <div className="next-btn" style={{ marginRight: 12 }}>
              <div className="arrow next">
                <RightOutlined />
              </div>
            </div>
            <div
              className="next-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (currentPage != (maxPage || 0)) onPageChange(maxPage || 0);
              }}
              title="Last page"
            >
              <div className="arrow next">
                <DoubleRightOutlined />
              </div>
            </div>
          </div>
        );
      }
      return currentPage ? originalElement : "";
    }}
    style={{ justifyContent: "flex-end", display: "flex" }}
    className="ant-table-pagination ant-table-pagination-right"
    showQuickJumper={showQuickJumper ? { goButton: <button>GO</button> } : null}
  />
);

export default CustomPagination;
