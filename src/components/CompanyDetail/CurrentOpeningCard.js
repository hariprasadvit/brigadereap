import React from "react";
import styled from "styled-components";
import CustomButton from "../CustomButton";

const CurrentOpeningCard = ({ jobOpenings }) => {
  return (
    <CurrentOpeningCardWrapper>
      <div className="currentOpeningTitle">Current Openings</div>
      <div className="openingsCardContainer">
        {jobOpenings.map((job, index) => (
          <div className="openingsCard" key={index}>
            <div className="openingsCardTop">
              <div className="designation">{job.designation}</div>
              <div className="locality">{job.locality}</div>
            </div>
            <div>
              <CustomButton
                btnText="Apply Now"
                bg="transparent"
                border="1px solid #707070"
                padding="0.3125rem 0.75rem 0.375rem"
              />
            </div>
          </div>
        ))}
      </div>
    </CurrentOpeningCardWrapper>
  );
};

export default CurrentOpeningCard;

const CurrentOpeningCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;
  padding: 0 2.875rem 6.514375rem;
  color: ${({ theme }) => theme.colors.font.body};

  @media (max-width: 1023px) {
    padding: 0 2.3125rem 2.5625rem;
    gap: 20.02px;
  }
  @media (max-width: 600px) {
    padding: 0 1.625rem 2.5625rem;
  }
  @media (max-width: 330px) {
    padding: 0 1rem 2.5625rem;
  }

  .currentOpeningTitle {
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
    line-height: 28px;
    font-weight: 600;

    @media (max-width: 600px) {
      font-size: ${({ theme }) => theme.fontSizes.lg};
      line-height: 24px;
    }
  }

  .openingsCardContainer {
    display: flex;
    gap: 18.5px;

    @media (max-width: 1023px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: auto;
    }
    @media (max-width: 850px) {
      grid-template-columns: repeat(1, 1fr);
    }

    .openingsCard {
      display: flex;
      flex-direction: column;
      gap: 20px;
      background-color: ${({ theme }) => theme.colors.cardSecondaryBg};
      box-shadow: 0px 3px 6px #60606029;
      max-width: 327px;
      width: 100%;
      border-radius: 8px;
      overflow: hidden;
      padding: 2.428125rem 1.5625rem 1.931875rem;

      @media (max-width: 1023px) {
        max-width: unset;
      }
      @media (max-width: 500px) {
        padding: 1.625rem;
      }
      @media (max-width: 330px) {
        padding: 1rem;
      }

      .openingsCardTop {
        display: flex;
        flex-direction: column;
        gap: 1.15px;

        .designation {
          font-size: ${({ theme }) => theme.fontSizes.xxxl};
          line-height: 28px;
          font-weight: 600;
          color: ${({ theme }) => theme.colors.font.heading1};

          @media (max-width: 425px) {
            font-size: ${({ theme }) => theme.fontSizes.base};
            line-height: 20px;
          }
        }
        .locality {
          font-size: ${({ theme }) => theme.fontSizes.lg};
          line-height: 23px;
          font-weight: normal;
          color: ${({ theme }) => theme.colors.font.body};
          opacity: 0.6;

          @media (max-width: 425px) {
            font-size: ${({ theme }) => theme.fontSizes.sm};
            line-height: 18px;
          }
        }
      }
    }
  }
`;
