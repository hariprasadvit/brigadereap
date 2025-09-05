import React from "react";
import HeaderNew from "../HeaderNew";
import SearchBanner from "./SearchBanner";
import styled from "styled-components";

const HeaderWithSearch = () => {
  return (
    <HeaderWithSearchWrapper>
      <HeaderNew
      //   ml={"0.625rem"}
      />
      <SearchBanner
        totalCompanies={"350 Companies"}
        bannerTitle={"Moving The World Forward."}
        bannerDescription={
          "Explore our curated directory of the most innovative startups shaping the future. Find your next investment, partnership, or inspiration."
        }
      />
    </HeaderWithSearchWrapper>
  );
};

export default HeaderWithSearch;

const HeaderWithSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 364px;
  background: transparent linear-gradient(180deg, #312c2c 0%, #000000 100%) 0%
    0% no-repeat padding-box;
`;
