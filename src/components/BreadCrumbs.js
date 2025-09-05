/** @format */

import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import Link from "next/link";
import styled from "styled-components";

const BreadcrumbWrapper = styled.nav`
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 8px;
  color: #555;
  margin-bottom: 2rem;
  a {
    color: blue;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .separator {
    margin: 0 6px;
    color: #aaa;
  }

  .icon {
    margin-right: 4px;
  }
`;

const CustomBreadcrumb = () => {
  return (
    <BreadcrumbWrapper>
      <Link href="/">
        <span>
          <HomeOutlined className="icon" />
          Home
        </span>
      </Link>
      <span className="separator">/</span>
      {/* <Link href="/products"> */}
        <span>
          {/* <AppstoreOutlined className="icon" /> */}
          My Profile
        </span>
      {/* </Link> */}
      {/* <span className="separator">/</span>
      <span>Details</span> */}
    </BreadcrumbWrapper>
  );
};

export default CustomBreadcrumb;
