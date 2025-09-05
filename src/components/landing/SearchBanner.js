/** @format */

"use client";
import { useRef, useEffect } from "react";
import styled from "styled-components";
import InputWithButton from "../CustomInput";
import theme from "../../app/styles";
import searchIcon from "../../../public/Icons/searchIcon.svg";
import Image from "next/image";
import healthcare from "../../../public/Icons/healthcare.svg";
import robot from "../../../public/Icons/robot.svg";
import ai from "../../../public/Icons/ai.svg";
import raise from "../../../public/Icons/raise.svg";
import realEstate from "../../../public/Icons/real-estate.svg";

const definedSearchResults = [
  {
    id: "Waste-to-Material Companies",
    icon: healthcare,
    description: "Waste-to-Material Companies",
  },
  {
    id: "Construction AI & Robotics Firms",
    icon: robot,
    description: "Construction AI & Robotics Firms",
  },
  {
    id: "Smart Water Tech Startups",
    icon: raise,
    description: "Smart Water Tech Startups",
  },
  {
    id: "Real Estate Analytics Firms",
    icon: realEstate,
    description: "Real Estate Analytics Firms",
  },
  {
    id: "Building Automation Systems",
    icon: ai,
    description: "Building Automation Systems",
  },
];

export default function SearchBanner({
  totalCompanies,
  bannerTitle,
  bannerDescription,
  onSearch,
  onSearchClick,
  searchValue,
}) {
  const searchRef = useRef(null);
  const scrollIfNeeded = () => {
    const inputEl = searchRef.current;
    if (!inputEl) return;

    const rect = inputEl.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // If the input starts below 50% of the viewport
    if (rect.top > viewportHeight / 2) {
      const scrollOffset = viewportHeight * 0.2;
      window.scrollBy({
        top: rect.top - scrollOffset,
        behavior: "smooth",
      });
    }
  };
  return (
    <SearchBannerWrapper>
      {totalCompanies && <div className="totalCompanies">{totalCompanies}</div>}
      <div
        className={`bannerTitle ${totalCompanies ? "" : "no_total_companies"}`}
      >
        {bannerTitle}
      </div>
      <div className="bannerDescription">{bannerDescription}</div>
      <SearchWrap ref={searchRef}>
        <InputWithButton
          // buttonText="Search"
          isSearch={true}
          prefixIcon
          placeholder={"Ask me about Companies"}
          defaultValue={searchValue}
          onButtonClick={onSearchClick}
          handleKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearchClick(e.target.value.trim());
            }
          }}
          onChange={(e) => {
            if (!e.target.value) {
              onSearchClick("");
            }
          }}
          onFocus={scrollIfNeeded}
        />
      </SearchWrap>

      <FlexWrap>
        {definedSearchResults.map(({ id, icon, description }) => (
          <SearchResultCard key={id} onClick={() => onSearchClick(id)}>
            <ImageWrapper>
              <Image src={icon} alt="Search" width={30} height={30} />
            </ImageWrapper>
            <Text>{description}</Text>
          </SearchResultCard>
        ))}
      </FlexWrap>
    </SearchBannerWrapper>
  );
}

const SearchBannerWrapper = styled.div`
  color: ${({ theme }) => theme.colors.font.primary};
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem 1.625rem 3rem 1.625rem;
  align-items: center;
  width: 100%;
  max-width: 1440px;
  @media (max-width: 800px) {
    padding: 1.875rem 1.25rem 2.813rem 1.25rem;
  }
  @media (max-width: 550px) {
    padding: 0.5rem 1.25rem 1.25rem 1.25rem;
  }
  .totalCompanies {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.font.secondary};
    background-color: ${({ theme }) => theme.colors.tagPrimaryBg};
    border-radius: 20px;
    padding: 0.3125rem 1rem 0.375rem 1rem;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: 15px;
    margin-bottom: 0.4375rem;
  }

  .bannerTitle {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    line-height: 32px;
    font-weight: 600;
    text-align: center;
    max-width: 480px;
    color: ${({ theme }) => theme.colors.font.primary};
    @media (max-width: 800px) {
      font-size: 22px;
    }
    @media (max-width: 550px) {
      font-size: 18px;
    }
  }
  .no_total_companies {
    margin-top: 0.4375rem;
  }
  .bannerDescription {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: 18px;
    font-weight: 300;
    text-align: center;
    letter-spacing: 0px;
    color: ${({ theme }) => theme.colors.font.primary};
    margin: 0.75rem 0px 0.3125rem 0px;
    max-width: 480px;
    @media (max-width: 550px) {
      font-size: 0.813rem;
      line-height: 1rem;
    }
  }
`;

const SearchWrap = styled.div`
  padding: 1rem 0px 1.5rem 0px;
  width: 60%;
  @media (max-width: 800px) {
    width: 70%;
  }
  @media (max-width: 550px) {
    width: 90%;
    padding: 0.75rem 0px 0rem 0px;
  }
`;

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px 24px;
  justify-content: center;
  width: 100%;
  @media (min-width: 1200px) {
    width: 80%;
  }
  @media (max-width: 800px) {
    gap: 20px 12px;
  }
  @media (max-width: 550px) {
    display: none;
  }
`;

const SearchResultCard = styled.div`
  background: #49494a 0% 0% no-repeat padding-box;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 24px;
  padding: 3px 12px 3px 4px;
  cursor: pointer;
  @media (max-width: 800px) {
    padding: 0.313rem 0.437rem;
    gap: 1rem;
  }
  @media (max-width: 550px) {
    gap: 0.875rem;
  }
`;

const ImageWrapper = styled.span`
  height: 26px;
  width: 26px;
  img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 800px) {
    height: 26px;
    width: 26px;
  }
  @media (max-width: 550px) {
    height: 24px;
    width: 24px;
  }
`;

const Text = styled.p`
  text-align: left;
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  font-weight: 300;
  @media (max-width: 800px) {
    font-size: 1rem;
    line-height: 1.25rem;
  }
  @media (max-width: 550px) {
    font-size: 0.875rem;
  }
`;
