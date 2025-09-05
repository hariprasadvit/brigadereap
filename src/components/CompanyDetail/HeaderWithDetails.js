import React from "react";
import HeaderNew from "../HeaderNew";
import styled from "styled-components";
import CompanyDetailCard from "./CompanyDetailCard";

const HeaderWithDetail = () => {
  return (
    <HeaderWithSearchWrapper>
      <HeaderNew
        //   ml={"0.625rem"}
        showSearchInput
      />
      <CompanyDetailCard />
    </HeaderWithSearchWrapper>
  );
};

export default HeaderWithDetail;

const HeaderWithSearchWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 378px;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 378px;
    background: linear-gradient(180deg, #312c2c 0%, #000000 100%);
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 378px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.cardSecondaryBg};
    z-index: -1;
  }
`;
