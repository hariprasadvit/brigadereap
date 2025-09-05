/** @format */

import Image from "next/image";
import React, { forwardRef } from "react";
import styled from "styled-components";
import reapImage from "../../../public/Images/ReapImage.svg";
import CustomButton from "../CustomButton";

const CreateProfileCard = forwardRef(
  ({ onCreateProfile, showCreateProfile }, ref) => {
    return (
      <div ref={ref}>
        {showCreateProfile ? (
          <CreateProfileCardWrapper>
            <>
              <div className="imageContainer">
                <Image src={reapImage} alt="Gain Reap" />
              </div>
              <div className="cardContent">
                <div className="contentDetails">
                  <div className="cardContentTitle">
                  Unlock Opportunities for Your Startup with REAP
                  </div>
                  <div className="cardContentDescription">
                  Register and complete your profile to submit your startup to the REAP Platform.
                  </div>
                </div>

                <CustomButton
                  type="primary"
                  btnText="Create Profile"
                  height={"43px"}
                  width={"140px"}
                  fontSize={"0.875rem"}
                  borderRadius={"20px"}
                  onClick={onCreateProfile}
                />
              </div>
            </>
          </CreateProfileCardWrapper>
        ) : null}
      </div>
    );
  }
);

export default CreateProfileCard;

const CreateProfileCardWrapper = styled.div`
  margin: 0 3.575635rem;
  position: relative;
  max-width: 100vw;
  background-color: ${({ theme }) => theme.colors.cardPrimaryBg};
  border-radius: 19px;
  height: 113px;
  display: flex;
  justify-content: flex-end;
  margin-top: 1.0625rem;

  @media (max-width: 950px) {
    margin: 0 1.625rem;
    height: auto;
    padding: 1.25rem;
  }
  @media (max-width: 550px) {
    margin: 0 1.25rem;
  }

  .imageContainer {
    position: absolute;
    bottom: 0;
    left: 6.22254758vw;
    height: 129px;

    @media (max-width: 950px) {
      left: 4%;
      height: auto;
    }
    @media (max-width: 480px) {
      display: none;
    }

    img {
      width: 128px;
      height: 129px;

      @media (max-width: 950px) {
        width: 100px;
        height: 100px;
      }
    }
  }
  .cardContent {
    display: flex;
    width: 76%;
    gap: 11.4934114vw;
    align-items: center;
    color: ${({ theme }) => theme.colors.font.body};
    padding-right: 1.25rem;

    @media (max-width: 950px) {
      padding-right: unset;
      gap: 10px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    @media (max-width: 480px) {
      width: 100%;
      gap: 20px;
    }

    .contentDetails {
      display: flex;
      flex-direction: column;

      @media (max-width: 950px) {
        align-items: center;
        gap: 10px;
      }

      .cardContentTitle {
        font-weight: 600;
        font-size: ${({ theme }) => theme.fontSizes.xxl};
        line-height: 32px;

        @media (max-width: 950px) {
          font-size: ${({ theme }) => theme.fontSizes.lg};
          line-height: 24px;
          text-align: center;
        }
        @media (max-width: 425px) {
          font-size: ${({ theme }) => theme.fontSizes.sm};
          line-height: 18px;
          text-align: center;
        }
      }

      .cardContentDescription {
        font-size: ${({ theme }) => theme.fontSizes.xs};
        line-height: 18px;
      }
    }
  }
`;
