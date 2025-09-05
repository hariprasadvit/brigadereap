/** @format */

"use client";

import React, { useEffect } from "react";
import styled from "styled-components";
import CompanyProfileCard from "./CompanyProfileCard";
import companyLogo from "../../../public/Images/CompanyLogo.png";
import CompanyOverviewCard from "./CompanyOverviewCard";
import CompanyFounderCard from "./CompanyFounderCard";
import profileImage1 from "../../../public/Images/profileImage1.png";
import profileImage2 from "../../../public/Images/profileImage2.png";
import TestimonialCard from "./TestimonialCard";
import testimonialLogo from "../../../public/Images/testimonialLogo.png";
import CurrentOpeningCard from "./CurrentOpeningCard";
import { useUser } from "@/utils/UserContext";
import { useRouter } from "next/navigation";
import Button from "../Button";

const founderData = [
  {
    image: profileImage1,
    name: "Chin Si Hung ti",
    designation: "Ceo",
    experience: "12 years",
    companies: ["Guideline", "Vampire"],
  },
  {
    image: profileImage2,
    name: "Diana Princess",
    designation: "Ceo",
    experience: "12 years",
    companies: ["Guideline", "Vampire"],
  },
];

const sliderItems = [
  {
    desc: "“ They thoroughly analyze our industry and target audience, allowing them to develop customized campaigns that effectively reach and engage our customers. Their creative ideas and cutting-edge techniques have helped us stay ahead of the competition.",
    name: "Gaurav Saxena",
    position: "General Manager , Bcci",
    image: testimonialLogo,
  },
  {
    desc: "“ They thoroughly analyze our industry and target audience...",
    name: "Gaurav Saxena",
    position: "General Manager , Bcci",
    image: testimonialLogo,
  },
  {
    desc: "“ They thoroughly analyze our industry and target audience...",
    name: "Gaurav Saxena",
    position: "General Manager , Bcci",
    image: testimonialLogo,
  },
];

const jobOpenings = [
  {
    designation: "Staff Software Engineer",
    locality: "Canada",
  },
  {
    designation: "Staff Software Engineer",
    locality: "Canada",
  },
  {
    designation: "Staff Software Engineer",
    locality: "Canada",
  },
];

const CompanyDetailCard = ({
  detail: {
    company_logo,
    company_name,
    state,
    country,
    city,
    industry_id,
    industry_names,
    investment_stage,
    founded_year,
    website_url,
    company_size,
    social_media_links = [],
    description,
    founders_data = [],
    status,
    is_claimed,
    created_by_type,
    rejection_reason,
    id,
    email,
    introduction_video,
    request_type,
    claimed_status,
    created_by,
    owned_by,
  } = {},
  showStatus,
  isEdit,
  loggeduser,
  isSlugSame = true,
} = {}) => {
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
    }
  }, [loggeduser?.user_id]);
  const router = useRouter();

  const goToLogin = () => {
    const currentUrl = window.location.pathname + window.location.search;
    router.push(`/login?mode=signin&redirect_url=${encodeURIComponent(currentUrl)}`);
  };

  const isMyCompany = isEdit
    ? created_by_type === "user" && created_by === user_id
      ? true
      : created_by_type !== "user" && is_claimed && owned_by === user_id
      ? true
      : request_type === "claim"
      ? claimed_status === "pending" || claimed_status === "rejected"
        ? true
        : false
      : false
    : true;

  if (!isSlugSame) {
    return (
      <SessionWrapper>
        <SessionExpired>
          <p>Data Not Found</p>
        </SessionExpired>
      </SessionWrapper>
    );
  }

  console.log(loggeduser, "user_id")

  return (isEdit ? user_id && isMyCompany : true) ? (
    <CompanyDetailWrapper>
      <div className="cardContainer">
        <CompanyProfileCard
          companyLogo={company_logo}
          companyName={company_name}
          state={state}
          country={country}
          industry_id={industry_id}
          industry_names={industry_names}
          investment_stage={investment_stage}
          founded_year={founded_year}
          website_url={website_url}
          company_size={company_size}
          social_media_links={social_media_links}
          status={
            showStatus && request_type === "claim" ? claimed_status : status
          }
          is_claimed={is_claimed}
          created_by_type={created_by_type}
          showStatus={showStatus}
          isEdit={
            showStatus && request_type === "claim"
              ? claimed_status === "approved"
              : isEdit && (status === "rejected" ? showCreateProfile : true)
          }
          rejection_reason={rejection_reason}
          introduction_video={introduction_video}
          id={id}
          email={email}
          showCreateProfile={showCreateProfile}
          isLoggedIn={user_id}
          goToLogin={goToLogin}
          request_type={showStatus && request_type}
        />
        {description && (
          <CompanyOverviewCard description={description || "--"} />
        )}
        {founders_data?.length ? (
          <CompanyFounderCard founderData={founders_data} />
        ) : null}
        {/* <TestimonialCard sliderItems={sliderItems} />
        <CurrentOpeningCard jobOpenings={jobOpenings} /> */}
      </div>
    </CompanyDetailWrapper>
  ) : !isMyCompany && isEdit && user_id ? (
    <SessionWrapper>
      <SessionExpired>
        <p>You dont have access to this profile</p>
      </SessionExpired>
    </SessionWrapper>
  ) : (
    <SessionWrapper>
      <SessionExpired>
        <h2>⚠️ {user?.error ? `${user?.error}.` : ``} Please login to continue.</h2>
        <p>
          {/* Your session has timed out due to inactivity. */}
          {/* <br /> */}
          {/* Please login to continue. */}
        </p>
        <Button
          buttonText="Login"
          height="37px"
          width="40%"
          onClick={goToLogin}
        />
      </SessionExpired>
    </SessionWrapper>
  );
};

export default CompanyDetailCard;

const SessionWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const CompanyDetailWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 2.4375rem 3.25rem 2.75rem 3.25rem;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 2.4375rem 1.625rem 2.75rem 1.625rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40vh;
    background: transparent linear-gradient(180deg, #312c2c 0%, #000000 100%) 0%
      0% no-repeat padding-box;
    z-index: 0;
  }
  .cardContainer {
    background-color: ${({ theme }) => theme.colors.cardSecondaryBg};
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.border.quaternary};
    border-radius: 8px;
    overflow: hidden;
    z-index: 10;
  }
`;

const SessionExpired = styled.div`
  max-width: 500px;
  margin: 100px auto;
  padding: 40px;
  border-radius: 12px;
  background-color: #f8f9fa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: fit-content;

  h2 {
    font-size: 24px;
    color: #e74c3c;
    margin-bottom: 20px;
    font-family: Montserrat;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    color: #333;
    margin-bottom: 1.875rem;
    line-height: 1.5;
    font-weight: 500;
    @media screen and (max-width: 550px) {
      font-size: 0.875rem;
      margin-bottom: 1.25rem;
    }
  }
  @media screen and (max-width: 550px) {
    max-width: 90%;
    padding: 20px;
  }
`;
