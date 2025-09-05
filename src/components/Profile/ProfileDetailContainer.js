/** @format */

"use client";
import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import styled from "styled-components";
import Image from "next/image";
import homeIcon from "../../../public/Icons/homeIcon.svg";
import eventIcon from "../../../public/Icons/eventIcon.svg";
import settingIcon from "../../../public/Icons/settingIcon.svg";
import CompanyCard from "../CompanyCard";
import { INDUSTRIES } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useUser } from "@/utils/UserContext";
import Button from "../Button";
import CustomButton from "../CustomButton";
import CustomModal from "../CustomModal";
import InputComponent from "../Input";
import CustomBreadcrumb from "../BreadCrumbs";
import EditableProfileCard from "./EditableProfileCard";

const menuItems = [
  { id: "home", label: "Home", icon: homeIcon, alt: "Home" },
  { id: "event", label: "Event", icon: eventIcon, alt: "Event" },
  { id: "settings", label: "Settings", icon: settingIcon, alt: "Settings" },
];

export default function ProfileDetailContainer({ startups = {}, loggeduser }) {
  const [activeMenu, setActiveMenu] = useState("home");
  const router = useRouter();
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

  const goToLogin = () => {
    const currentUrl = window.location.pathname + window.location.search;
    router.push(
      `/login?mode=signin&redirect_url=${encodeURIComponent(currentUrl)}`
    );
  };
  useEffect(() => {
    if (loggeduser?.user_id) {
      setUser(loggeduser);
    } else {
      setUser(loggeduser || {})
    }
  }, [loggeduser?.user_id]);

  return (
    <ProfileDetailContainerWrap>
      <LeftMenuBar>
        {menuItems.map(({ id, label, icon, alt }) => (
          <div
            key={id}
            className={`menuIconContainer ${activeMenu === id ? "active" : ""}`}
            onClick={() => setActiveMenu(id)}
          >
            <Image src={icon} alt={alt} className="icon" />
            <div className="menuLabel">{label}</div>
          </div>
        ))}
      </LeftMenuBar>

      {user_id ? (
        <ProfileDetailContainerWrapper>
          <CustomBreadcrumb />
          {activeMenu === "home" && (
            <>
              <h1>My Companies</h1>
              {showCreateProfile && (
                <ProfileCard
                  onCreateProfile={() => router.push("/add-startup")}
                />
              )}
              <GridWrapper>
                {(startups?.data || [])?.map(
                  ({
                    company_logo,
                    company_name,
                    city,
                    industry_id,
                    industry_names,
                    investment_stage,
                    website_url,
                    id,
                    status,
                    description,
                    rejection_reason,
                    request_type,
                    claimed_status,
                  }) => {
                    return (
                      <CompanyCard
                        logoSrc={company_logo}
                        name={company_name}
                        status={
                          request_type === "claim" ? claimed_status : status
                        }
                        place={city}
                        request_type={request_type}
                        title1="Focus Area"
                        description={description}
                        detail1={industry_names?.[0] || industry_names}
                        isEdit={
                          request_type === "claim"
                            ? claimed_status === "approved"
                            : status === "rejected"
                            ? showCreateProfile
                            : true
                        }
                        key={id}
                        rejection_reason={rejection_reason}
                        onEdit={() => router.push(`/add-startup?id=${id}`)}
                        title2="Investment Stage"
                        detail2={investment_stage}
                        title3="Website"
                        detail3={website_url}
                        detail3IsLink
                        onKnowMore={() => router.push(`/my-company/${id}`)}
                      />
                    );
                  }
                )}
              </GridWrapper>
            </>
          )}

          {activeMenu === "event" && (
            <>
              <h1>Upcoming Events</h1>
              <p>Here you can add details or components related to Events.</p>
            </>
          )}

          {activeMenu === "settings" && (
            <>
              <h1>Settings</h1>
              <EditableProfileCard user_details={user} />
            </>
          )}
        </ProfileDetailContainerWrapper>
      ) : (
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
      )}
    </ProfileDetailContainerWrap>
  );
}

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

const ProfileDetailContainerWrap = styled.div`
  display: flex;
  height: 100%;
  @media screen and (max-width: 550px) {
    flex-direction: column;
  }
`;

const LeftMenuBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 41px;
  align-items: center;
  background-color: black;
  max-width: 102px;
  width: 100%;
  padding: 39px 16px;

  @media screen and (max-width: 550px) {
    max-width: 100%;
    flex-direction: row;
    height: auto;
    padding: 20px 30px;
    justify-content: space-between;
  }

  .menuIconContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10.21px;
    cursor: pointer;

    img {
      width: 25px;
      height: 25px;
      filter: brightness(0) saturate(100%) invert(100%); // white by default
      transition: filter 0.2s;
      @media screen and (max-width: 550px) {
        width: 1rem;
        height: 1rem;
      }
    }

    .menuLabel {
      font-size: 0.875rem;
      line-height: 18px;
      color: #ffffff;
      transition: color 0.2s;
      @media screen and (max-width: 550px) {
        font-size: 0.75rem;
        line-height: 16px;
      }
    }

    &.active {
      img {
        filter: brightness(0) saturate(100%) invert(62%) sepia(88%)
          saturate(518%) hue-rotate(-12deg) brightness(102%) contrast(96%);
      }

      .menuLabel {
        color: #e47b3c;
      }
    }
  }
`;

const ProfileDetailContainerWrapper = styled.div`
  padding: 3.375rem 4.375rem 4.375rem 4.375rem;
  width: 100%;
  height: calc(100vh - 88px);
  overflow-y: scroll;
  @media screen and (max-width: 768px) {
    padding: 3.125rem;
  }
  @media screen and (max-width: 650px) {
    padding: 2.125rem;
  }
  @media screen and (max-width: 550px) {
    padding: 16px;
  }
  h1 {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    color: #000;
    margin-bottom: 25px;
    @media screen and (max-width: 768px) {
      font-size: 20px;
    }
  }
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columns */
  gap: 20px;
  width: 100%;
  padding-top: 30px;
  @media (max-width: 950px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* Stack on small screens */
  }
`;
