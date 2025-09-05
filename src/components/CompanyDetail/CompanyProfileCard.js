/** @format */

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CustomButton from "../CustomButton";

import facebook from "../../../public/Icons/facebookLogo.svg";
import linkedinLogo from "../../../public/Icons/linkedinLogo.svg";
import x from "../../../public/Icons/xLogo.svg";
import instagram from "../../../public/Icons/instagramLogo.png";
import youtube from "../../../public/Icons/youtubeIcon.svg";
import videoIcon from "../../../public/Icons/video-2.svg";
import CustomModal from "../CustomModal";
import { INDUSTRIES, INVESTMENT_STAGE } from "@/utils/constants";
import Link from "next/link";
import InputComponent from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  claimProfile,
  resetClaimState,
} from "@/config/slices/claimProfileSlice";
import { EditOutlined, MailOutlined } from "@ant-design/icons";

const SOCIALICONS = {
  facebook: facebook,
  twitter: x,
  linkedin: linkedinLogo,
  instagram: instagram,
  youtube: youtube,
};

const CompanyProfileCard = ({
  companyLogo,
  companyName,
  state,
  country,
  industry_id,
  industry_names,
  investment_stage,
  founded_year,
  website_url,
  company_size,
  social_media_links = [],
  status,
  created_by_type,
  is_claimed,
  showStatus,
  isEdit,
  id,
  rejection_reason,
  introduction_video,
  email,
  showCreateProfile,
  isLoggedIn,
  goToLogin,
  request_type,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  return (
    <>
      <CompanyProfileCardWrapper>
        <CompanyNameWrap>
          <LogoWrapper>
            <StyledImage
              src={companyLogo}
              alt="Logo"
              width={115}
              height={115}
            />
          </LogoWrapper>
          <CompanyDetails>
            <CompanyText>
              <CompanyName>
                {companyName}
                {/* {request_type === "claim" && <div>Cliam</div>} */}

                {introduction_video && (
                  <div style={{ color: "#000", textDecoration: "underline" }}>
                    <VideoWrapper
                      href={introduction_video}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Tooltip>View Introduction Video</Tooltip>
                      <Image
                        src={videoIcon}
                        alt="video-icon"
                        width={36}
                        height={24}
                      />
                    </VideoWrapper>
                  </div>
                )}
              </CompanyName>
              <Location>
                <span>{state}</span>
                {country && (
                  <>
                    <span>, </span>
                    <span>{country}</span>
                  </>
                )}
              </Location>
            </CompanyText>
            {/* {email && (
              <ContactWrapper>
                Contact Info: <a href={`mailto:${email}`}>{email}</a>
              </ContactWrapper>
            )} */}
            <FlexWrapper>
              {status === "approved" &&
                created_by_type !== "user" &&
                !is_claimed && (
                  <CustomButton
                    type="primaryBold"
                    btnText="Claim Profile"
                    height="43px"
                    width="140px"
                    fontSize="0.875rem"
                    disabled={isLoggedIn && !showCreateProfile}
                    borderRadius="20px"
                    onClick={() => (isLoggedIn ? setIsOpen(true) : goToLogin())}
                    title={
                      isLoggedIn && !showCreateProfile
                        ? "You already have a pending or approved profile. Creating or claiming another profile is not allowed."
                        : ""
                    }
                  />
                )}
              {email && (
                <ContactWrapper href={`mailto:${email}`}>
                  {/* <a > */}
                  <MailOutlined style={{ color: "#fff" }} />
                  {/* </a> */}
                </ContactWrapper>
              )}
            </FlexWrapper>
            {showStatus && (
              <div style={{ color: "#000", textTransform: "capitalize" }}>
                <StatusWrap>
                  Status: {request_type === "claim" ? `Claim request is ` : ``}
                  {status === "rejected" ? (
                    <Status
                      status={status}
                      onClick={() => setIsStatusOpen(rejection_reason)}
                    >
                      {status}
                    </Status>
                  ) : (
                    <Status status={status}>{status}</Status>
                  )}
                </StatusWrap>
              </div>
            )}
            {isEdit && (
              <EditWrapper>
                <Link
                  href={`/add-startup?id=${id}`}
                  style={{ color: "#000", textTransform: "capitalize" }}
                >
                  <EditOutlined style={{ color: "#000" }} />
                </Link>
              </EditWrapper>
            )}
          </CompanyDetails>
        </CompanyNameWrap>

        <CompanyProfileWrap>
          <InfoItem
            label="Focus Area"
            value={industry_names?.[0] || industry_names}
          />
          <InfoItem
            label="Investment Stage"
            value={
              INVESTMENT_STAGE.find((item) => item.id === investment_stage)
                ?.name
            }
          />
          <InfoItem label="Founding Year" value={founded_year} />
          <InfoItem label="Website" value={website_url} isLink />
          <InfoItem
            label="Company Size"
            value={company_size ? `${company_size} Employees` : ""}
          />
          <div className="labelAndValue">
            <div className="label">Social Accounts</div>
            {social_media_links?.length ? (
              <div className="iconContainer">
                {social_media_links?.map((item, index) => (
                  <Link
                    href={item.url || ""}
                    target="_blank"
                    key={item.platform || index}
                  >
                    <Image
                      src={item.platform ? SOCIALICONS[item.platform] : ""}
                      alt={item.platform}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              "--"
            )}
          </div>
        </CompanyProfileWrap>
      </CompanyProfileCardWrapper>
      {isOpen && (
        <ClaimModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          startupRequestId={id}
        />
      )}
      <CustomModal
        isOpen={isStatusOpen}
        title="Rejected"
        confirmButton={"Close"}
        buttonWidth={"100px"}
        onClose={() => setIsStatusOpen(false)}
        onConfirm={() => {
          setIsStatusOpen(false);
        }}
      >
        {isStatusOpen}
      </CustomModal>
    </>
  );
};

const ClaimModal = ({ isOpen, setIsOpen, startupRequestId }) => {
  const [reason, setReason] = useState("");
  const [touched, setTouched] = useState(false);
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.claimProfile
  );
  const MIN_LEN = 50;
  const isValid = reason.trim().length >= MIN_LEN;
  useEffect(() => {
    if (success) {
      setIsOpen(false);
      window.location.reload();
      dispatch(resetClaimState());
    }
  }, [success, dispatch, setIsOpen]);

  const handleConfirm = () => {
    if (!reason.trim()) return;
    if (!isValid) return;
    dispatch(
      claimProfile({ justification: reason, start_up_id: startupRequestId })
    );
  };

  return (
    <CustomModal
      isOpen={isOpen}
      title="Do you want to Claim this Profile?"
      confirmButton={loading ? "Submitting..." : "Yes"}
      cancelButton="No"
      buttonWidth="100px"
      onClose={() => {
        setIsOpen(false);
        dispatch(resetClaimState());
      }}
      onConfirm={handleConfirm}
      confirmDisabled={!isValid || loading}
    >
      <InputComponent
        type="textarea"
        name="reason"
        label="Reason"
        value={reason}
        onChange={(e) => {
          setReason(e.target.value);
          if (!touched) setTouched(true);
        }}
        placeholder="Enter your Reason"
      />
      {touched &&
        !isValid && ( // NEW
          <div style={{ color: "red", marginTop: 8, fontSize: 14 }}>
            Reason must be at least {MIN_LEN} characters
          </div>
        )}
      {error && (
        <div style={{ color: "red", marginTop: "8px", fontSize: "14px" }}>
          {error}
        </div>
      )}
    </CustomModal>
  );
};

const InfoItem = ({ label, value = "", isLink }) => (
  <div className="labelAndValue">
    <div className="label">{label}</div>
    {isLink ? (
      <Link href={value || ""} target="_blank">
        <div className="value isLink">{value || "--"}</div>
      </Link>
    ) : (
      <div className="value">{value || "--"}</div>
    )}
  </div>
);

export default CompanyProfileCard;

const CompanyProfileCardWrapper = styled.div`
  display: flex;
  align-items: stretch;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border.secondary};
  // position: relative;

  @media (max-width: 1023px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CompanyNameWrap = styled.div`
  display: flex;
  align-items: stretch;
  gap: 22px;
  max-width: 642.88px;
  width: 100%;
  height: 100%;
  padding: 2.5625rem 2.3125rem;

  @media (max-width: 1100px) {
    padding: 2rem 1.5rem;
  }
  @media (max-width: 1023px) {
    max-width: 100%;
  }
  @media (max-width: 600px) {
    padding: 1.625rem;
    gap: 15px;
    flex-direction: column;
  }
  @media (max-width: 330px) {
    padding: 1rem;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  min-width: 115px;
  max-width: 115px;
  min-height: 115px;
  align-self: stretch;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};

  @media (max-width: 1023px) {
    min-width: 100px;
    max-width: 100px;
    min-height: 100px;
  }
  @media (max-width: 600px) {
    min-width: 90px;
    max-width: 90px;
    min-height: 90px;
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 5px;

  @media (max-width: 1023px) {
    /* keep responsive sizing handled by LogoWrapper */
  }
  @media (max-width: 600px) {
    /* keep responsive sizing handled by LogoWrapper */
  }
`;
const EditWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  position: absolute;
  top: 1.6rem;
  right: 2.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  z-index: 11;
  @media (max-width: 800px) {
    top: 1.6rem;
    right: 1rem;
  }
`;
const CompanyDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12.5px;
  width: 100%;
  height: 100%;

  @media (max-width: 600px) {
    gap: 5px;
  }
`;


const CompanyText = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// const ContactWrapper = styled.div`
//   color: ${({ theme }) => theme.colors.font.body};
//   font-weight: 400;
//   font-size: 1rem;
//   a {
//     font-weight: 600;
//     text-decoration: none;
//     color: inherit;
//   }
//   @media (max-width: 600px) {
//     font-size: 0.875rem;
//     margin: 10px 0px;
//   }
// `;

const CompanyName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  line-height: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.font.body};
  display: inline-flex;

  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    line-height: 24px;
    align-items: center;
  }
`;

const VideoWrapper = styled.a`
  width: 40px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.primaryYellow};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px; /* Optional */
  text-decoration: none;
  margin-left: 10px;
  position: relative;

  &:hover span {
    opacity: 1;
    visibility: visible;
    transform: translateY(-8px);
  }
  @media (max-width: 600px) {
    margin-left: 10px;
  }
`;

export const Tooltip = styled.span`
  position: absolute;
  top: -28px;
  background: #333;
  color: #fff;
  padding: 2px 8px;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 1;
  background: transparent linear-gradient(180deg, #312c2c 0%, #000000 100%) 0%
    0% no-repeat padding-box;
`;

const Location = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.font.body};
  opacity: 0.5;
`;

const CompanyProfileWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  flex-wrap: wrap;
  gap: 1.5rem;
  min-width: 570px;
  width: 100%;
  padding: 2.5625rem 2.3125rem;
  overflow: hidden;
  border-left: 1px solid ${({ theme }) => theme.colors.border.secondary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 23px;
  color: ${({ theme }) => theme.colors.font.body};
  height: 100%;
  align-self: stretch;

  @media (max-width: 1100px) {
    gap: 1rem;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: 16px;
    min-width: 540px;
    padding: 2rem 1.5rem;
  }

  @media (max-width: 1023px) {
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border.secondary};
    min-width: unset;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    padding: 1.625rem;
  }
  @media (max-width: 475px) {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 330px) {
    padding: 1rem;
  }

  .labelAndValue {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .label {
      font-weight: 600;
    }
    .value {
      font-weight: normal;
      word-break: break-word;
      white-space: normal;

      &.isLink {
        color: #0000ee;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .iconContainer {
      display: flex;
      gap: 3px;

      img {
        height: 20px;
        width: 20px;

        @media (max-width: 1100px) {
          height: 14px;
          width: 14px;
        }
      }
    }
  }
`;

const StatusWrap = styled.div`
  font-weight: 500;
  font-size: 1rem;
  text-transform: capitalize;
  @media (max-width: 600px) {
    font-size: 0.875rem;
  }
`;
const Status = styled.div`
  font-weight: 600;
  font-size: 1rem;
  text-transform: capitalize;
  color: ${({ status }) =>
    status === "approved"
      ? "#008000"
      : status === "rejected"
      ? "#FF0000"
      : "#FF7F50"};
  background-color: ${({ status }) =>
    status === "approved"
      ? "#0080001A"
      : status === "rejected"
      ? "#FF00001A"
      : "#FF7F501A"};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  height: max-content;
  @media (max-width: 600px) {
    font-size: 0.875rem;
  }
`;
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 600px) {
    gap: 15px;
  }
`;
const ContactWrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  gap: 8px;
  height: 36px;
  min-width: 36px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.primaryYellow};
  &:hover {
    text-decoration: underline;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 0.5px solid #d3d3d3;
    background-color: ${({ theme }) => theme.colors.font.primary};
  }

  svg {
    color: #fff;
    font-size: 18px;
  }
`;
