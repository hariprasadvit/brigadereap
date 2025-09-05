/** @format */

"use client";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import styled from "styled-components";
import CreateProfileCard from "@/components/landing/CreateProfileCard";
import FilterSection from "@/components/landing/FilterSection";
import CompanyCard from "@/components/CompanyCard";
import ResponsiveFilterSection from "@/components/landing/ResponsiveFilterSection";
import SearchBanner from "@/components/landing/SearchBanner";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import loader from "../../../public/gif/loader.gif";
import noDataImage from "../../../public/Images/no-startup.png";
import dummyImage from "../../../public/Images/dummy.png";
import dummyImage2 from "../../../public/Images/dummy2.png";
import { useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useSearchParams } from "next/navigation";
import {
  appendStartups,
  fetchStartups,
  setFilters,
  setStartups,
} from "@/config/slices/startupSlice";
import { useEffect } from "react";
import { useUser } from "@/utils/UserContext";
import { BATCHES, INDUSTRIES } from "@/utils/constants";
import Pagination from "../landing/Pagination";
import Image from "next/image";
import EmptyState from "../EmptyState";
import { CloseOutlined } from "@ant-design/icons";
import CustomButton from "../CustomButton";
import ImageSlider from "../landing/BannerSlider";

export default function StartupListing({
  initialData = {},
  searchParams = {},
  pageSize,
  page,
  items_per_page,
  industries = [],
  loggeduser,
  banners = [],
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const createProfileRef = useRef(null);
  const { user, setUser } = useUser();
  const {
    user_id = null,
    approved_startup_count,
    pending_startup_count,
    claimed_approved_count,
    claimed_pending_count,
    update_pending_count,
    update_approved_count,
  } = user || {};
  const showCreateProfile = user_id
    ? !approved_startup_count &&
      !pending_startup_count &&
      !claimed_approved_count &&
      !claimed_pending_count &&
      !update_pending_count &&
      !update_approved_count
    : true;

  useEffect(() => {
    if (loggeduser?.user_id) {
      setUser(loggeduser);
    } else {
      setUser(loggeduser || {})
    }
  }, [loggeduser?.user_id]);

  const [isLoading, setIsLoading] = useState(true);
  const [isMoreDataLoaded, setIsMoreDataLoaded] = useState(false);
  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);
  const {
    list: {
      data: {
        results: startups = [],
        total_approved_startups_count: totalCompanies,
      } = {},
      pagination: { max_page, total_count, next_page, ...pagination } = {},
    },
    loading,
  } = useSelector((state) => state.startups) || {};

  const applyFilter = (key, value, shallow, slug_id) => {
    setIsLoading(true);
    const currentParams = new URLSearchParams(window.location.search);
    setIsMoreDataLoaded(false);
    if (key === "search" || key === "page" || key === "items_per_page") {
      // For single-value filters like 'search'
      if (value) {
        currentParams.set(key, value);
      } else {
        currentParams.delete(key);
      }
    } else {
      // For multi-value filters like 'batches', 'industries', etc.
      const currentValues = currentParams.get(key)?.split(",") || [];

      let updatedValues;
      if (currentValues.includes(value)) {
        // Unchecking: remove the value
        updatedValues = currentValues.filter((v) => v !== value);
      } else {
        // Checking: add the value
        updatedValues = [...currentValues, value];
      }

      if (updatedValues.length > 0) {
        currentParams.set(key, updatedValues.join(","));
      } else {
        currentParams.delete(key);
      }
    }
    if (key !== "page") {
      currentParams.set("page", 1);
    }
    if (key !== "items_per_page") {
      currentParams.delete("items_per_page");
    }
    if (key === "is_reap_company" && value === "true") {
      currentParams.delete("batch_id");
    }
    const newQuery = currentParams.toString();

    if (key === "items_per_page") {
      router.replace(`?${newQuery}`, {
        scroll: false,
        shallow: shallow ? true : false,
      });
      setTimeout(() => {
        router.push(`/company-detail/${slug_id}`);
      }, 1000);
    } else {
      router.push(`?${newQuery}`, {
        scroll: false, // 👈 prevent auto-scroll
        shallow: shallow ? true : false,
      });
    }
    // Scroll to CreateProfileCard
    // if (!shallow)
    //   setTimeout(() => {
    //     createProfileRef.current?.scrollIntoView({
    //       behavior: "smooth",
    //       block: "start", // Ensure it aligns to top of viewport
    //     });
    //   }, 100); // slight delay ensures DOM update
    if (!shallow) {
      setTimeout(() => {
        const element = createProfileRef.current;
        if (element) {
          const yOffset = -50; // your desired offset
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;

          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  };

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      dispatch(setStartups(initialData));
    }
  }, [initialData, dispatch]);
  const currentStartups = isMoreDataLoaded
    ? startups
    : initialData?.data?.results || [];
  const currentNextPage = isMoreDataLoaded
    ? next_page
    : initialData?.pagination?.next_page;
  const currentMaxPage = isMoreDataLoaded
    ? max_page
    : initialData?.pagination?.max_page;
  const currentTotalCount = isMoreDataLoaded
    ? total_count
    : initialData?.pagination?.total_count;

  const appliedIndustryFilters = searchParams["industry_id"]
    ?.split(",")
    ?.map((item) => industries?.find((ind) => ind.id === Number(item)));

  const appliedBatchFilters = searchParams["batch_id"]
    ?.split(",")
    ?.map((item) => BATCHES?.find((ind) => ind.id === Number(item)));
  const appliedReapFilters = searchParams["is_reap_company"]
    ?.split(",")
    ?.map((item) =>
      [
        {
          name: "Reap Companies",
          id: "true",
        },
        // {
        //   name: "Non Reap Companies",
        //   id: "false",
        // },
        // "Top Revenue Companies",
        // "Exits",
      ]?.find((ind) => ind.id === item)
    );

  // Load more on scroll
  const loadMoreStartups = async () => {
    const currentParams = {
      ...searchParams,
      page: currentNextPage,
      items: items_per_page || 10,
    };
    const result = await dispatch(fetchStartups({ ...currentParams }));
    if (result?.payload?.data?.results?.length) {
      setIsMoreDataLoaded(true);
      dispatch(appendStartups(result.payload));
    }
  };

  const handleKnowMore = async (slug_id) => {
    if (currentNextPage === 2) {
      router.push(`/company-detail/${slug_id}`);
    } else {
      applyFilter(
        "items_per_page",
        (currentNextPage ? currentNextPage - 1 : currentMaxPage) *
          (items_per_page || 10),
        "shallow",
        slug_id
      );
    }
  };

  const onClearFilter = () => {
    setIsLoading(true);
    const newParams = new URLSearchParams();
    setIsMoreDataLoaded(false);
    const newQuery = newParams.toString();
    router.push(`?${newQuery}`, { scroll: false });
    setTimeout(() => {
      createProfileRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const isFilterApplied =
    appliedIndustryFilters?.length ||
    appliedReapFilters?.length ||
    appliedBatchFilters?.length ||
    searchParams?.search;

  console.log(banners, "banners");
  return (
    <LandingPageWrapper>
      <SearchWrapper>
        {/* <div className="banners">
          {banners?.map((item) => (
            <img
              src={item.image_url}
              alt="image"
              style={{ width: 100, height: 100 }}
            />
          ))}
        </div> */}
        {/* {banners?.map((item) => ( */}
        {banners?.length ? (
          banners?.length === 1 ? (
            <ImageWrap>
              <img src={banners?.[0]?.image_url} alt="banenr" />
            </ImageWrap>
          ) : (
            <ImageSlider images={banners || []} />
          )
        ) : null}
        {/* ))} */}
        <SearchBanner
          // totalCompanies={totalCompanies ? `${totalCompanies} Companies` : ""}
          bannerTitle={"Moving The World Forward."}
          bannerDescription={
            "Explore our curated directory of the most innovative startups shaping the future. Find your next investment, partnership, or inspiration."
          }
          searchValue={searchParams?.search}
          onSearchClick={(val) => applyFilter("search", val)}
        />
      </SearchWrapper>

      <CreateProfileCard
        ref={createProfileRef}
        onCreateProfile={() =>
          user_id
            ? router.push("/add-startup")
            : router.push("/login?mode=signin&redirect_url=add-startup")
        }
        showCreateProfile={showCreateProfile}
      />
      <Flexwrap>
        {isLoading && !items_per_page ? (
          <LoaderContainer>
            <Image src={loader} alt="loader" />
          </LoaderContainer>
        ) : null}

        <FilterWrapper>
          <FilterSection
            applyFilter={applyFilter}
            searchParams={searchParams}
            industries={industries}
          />
        </FilterWrapper>

        <ResponsiveFilterSection
          applyFilter={applyFilter}
          searchParams={searchParams}
          createProfileRef={createProfileRef}
          router={router}
          setIsLoading={setIsLoading}
          industries={industries}
          setIsMoreDataLoaded={setIsMoreDataLoaded}
        />
        <RightContainer>
          {currentStartups?.length ? (
            <Flex>
              <ResultText>
                Showing {currentTotalCount} results{" "}
                {searchParams?.search ? `for "${searchParams?.search}"` : ""}
              </ResultText>

              {isFilterApplied ? (
                <CustomButton
                  btnText={"Clear Filters"}
                  type="tertiary"
                  onClick={onClearFilter}
                />
              ) : null}
            </Flex>
          ) : null}
          <FiltersWrap>
            {(appliedIndustryFilters || [])?.map((industry) => (
              <FilterTag key={industry.id}>
                <span>{industry?.industry_name}</span>
                <RemoveIcon
                  onClick={() =>
                    applyFilter("industry_id", String(industry.id))
                  }
                >
                  <CloseOutlined />
                </RemoveIcon>
              </FilterTag>
            ))}
            {(appliedReapFilters || [])?.map((reap) => (
              <FilterTag key={reap.name}>
                <span>{reap.name}</span>
                <RemoveIcon
                  onClick={() =>
                    applyFilter("is_reap_company", String(reap.id))
                  }
                >
                  <CloseOutlined />
                </RemoveIcon>
              </FilterTag>
            ))}
            {(appliedBatchFilters || [])?.map((batch) => (
              <FilterTag key={batch.id}>
                <span>{batch.batch_name}</span>
                <RemoveIcon
                  onClick={() => applyFilter("batch_id", String(batch.id))}
                >
                  <CloseOutlined />
                </RemoveIcon>
              </FilterTag>
            ))}
          </FiltersWrap>
          <InfiniteScroll
            dataLength={currentStartups?.length || 0}
            next={loadMoreStartups}
            hasMore={
              !isLoading && currentNextPage && currentNextPage <= currentMaxPage
            }
            loader={
              // loading ? (
              <LoaderContainer position="block">
                <Image src={loader} alt="loader" />
              </LoaderContainer>
              // ) : null
            }
            scrollThreshold={0.9}
          >
            {currentStartups?.length ? (
              <GridWrapper>
                {currentStartups?.map(
                  ({
                    company_logo,
                    company_name,
                    city,
                    investment_stage,
                    website_url,
                    id,
                    slug_id,
                    description,
                    industry_names,
                  }) => {
                    return (
                      <CompanyCard
                        logoSrc={company_logo}
                        name={company_name}
                        place={city}
                        title1="Focus Area"
                        detail1={industry_names?.[0] || industry_names}
                        key={slug_id + id}
                        title2="Investment Stage"
                        detail2={investment_stage}
                        description={description}
                        title3="Website"
                        detail3IsLink
                        detail3={website_url}
                        onKnowMore={() => handleKnowMore(slug_id)}
                      />
                    );
                  }
                )}
              </GridWrapper>
            ) : (
              <EmptyWrapper>
                <EmptyState
                  icon={noDataImage}
                  height={178}
                  width={178}
                  description={
                    searchParams?.search
                      ? "Searched Company is not in our database"
                      : Object.keys(searchParams)?.filter(
                          (item) => item !== "page"
                        )?.length
                      ? "No Companies available for the applied filters"
                      : "No Companies available in our database"
                  }
                />
              </EmptyWrapper>
            )}
          </InfiniteScroll>
          {/* Please do not remove this component - for SEO */}
          {currentStartups?.length ? (
            <Pagination
              pageSize={pageSize}
              maxPage={currentMaxPage}
              currentPage={page}
              onPageChange={(val) => applyFilter("page", val)}
            />
          ) : null}
        </RightContainer>
      </Flexwrap>
    </LandingPageWrapper>
  );
}
const LandingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: white;
  padding-bottom: 50px;
  // overflow-x: hidden;
`;
const Flexwrap = styled.div`
  display: flex;
  gap: 2rem;
  position: relative;
  padding: 0px 3.575635rem;

  .responsiveFilter {
    display: none;
    @media (max-width: 768px) {
      display: flex;
    }
  }
  @media (max-width: 950px) {
    padding: 0 1.625rem;
  }
  @media (max-width: 550px) {
    padding: 0 1.25rem;
  }
`;
const FilterWrapper = styled.div`
  // position: sticky;
  // top: 60px;
  // align-self: start;
  // z-index: 2;
  // max-height: calc(100vh - 100px);
  // overflow-y: auto;
  // scrollbar-width: none;
  // -ms-overflow-style: none;

  @media (max-width: 800px) {
    display: none;
  }
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ImageWrap = styled.div`
  width: 80%;
  height: 350px;
  position: relative;
  margin: 1rem 0 0 0;

  img {
    height: 100%;
    width: 100%;
  }
  @media (max-width: 1100px) {
    width: 85%;
  }
  @media (max-width: 800px) {
    width: 70%;
    height: 250px;
  }
  @media (max-width: 800px) {
    width: 90%;
    height: 200px;
  }
`;
const RightContainer = styled.div`
  width: 77%;
  @media (max-width: 1100px) {
    width: 68%;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;
const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columns */
  gap: 20px;
  width: 100%;

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
  }
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: transparent linear-gradient(180deg, #312c2c 0%, #000000 100%) 0%
    0% no-repeat padding-box;
  overflow-x: hidden;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: ${(props) => props.position || "absolute"};
  top: 0;
  left: 50%;
  height: 55vh;
  img {
    height: 80px;
    width: 80px;
  }
  @media screen and (max-width: 1100px) {
    height: 42vh;
    img {
      height: 50px;
      width: 50px;
    }
  }
`;

const EmptyWrapper = styled.div`
  width: 100%;
  min-height: 300px; // adjust as needed
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ResultText = styled.h1`
  color: #000;
  font-size: 1.2rem;
  font-weight: 600;
  @media (max-width: 550px) {
    font-size: 1rem;
  }
`;
const FiltersWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 1.5rem 0px;
`;
const FilterTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.cardPrimaryBg};
  color: #000;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
`;

const RemoveIcon = styled.button`
  background: transparent;
  border: none;
  margin-left: 8px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  .anticon {
    font-size: 12px;
    color: #666;
    transition: color 0.2s;
  }

  &:hover .anticon {
    color: #000;
  }
`;
