/** @format */

import React from "react";
import Image from "next/image";
import styled from "styled-components";

const CompanyFounderCard = ({ founderData = [] }) => {
  return (
    <CompanyFounderCardWrapper>
      <div className="founderTitle">Company Founders</div>
      <div className="founderCardContainer">
        {console.log(founderData)}
        {founderData.map((founder, index) => (
          <div className="founderCard" key={index}>
            <div className="profileImage">
              <Image
                src={founder.profile_picture}
                alt="Profile Image"
                width={106}
                height={104}
              />
            </div>
            <div className="profileDetail">
              <div className="nameAndDesignation">
                <div className="name">{founder.founder_name}</div>
                <div className="designation">
                  <span>{founder.designation}</span>
                  <span> | </span>
                  <span>{founder.years_of_experience} years</span>
                </div>
                <div className="designation">
                  <a href={`mailto:${founder.email}`}>{founder.email}</a>
                </div>
              </div>
              {founder.founded?.length ? (
                <div className="founded">
                  Founded{" "}
                  {founder?.founded?.map((company, i) => (
                    <React.Fragment key={i}>
                      <span>{company}</span>
                      {i !== founder.founded.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </CompanyFounderCardWrapper>
  );
};

export default CompanyFounderCard;

const CompanyFounderCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20.2px;
  padding: 0 2.875rem 1.7125rem;
  color: ${({ theme }) => theme.colors.font.body};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 23px;

  @media (max-width: 1023px) {
    padding: 0 2.3125rem 2.5625rem;
  }
  @media (max-width: 600px) {
    padding: 0 1.625rem 1.625rem;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: 18px;
  }
  @media (max-width: 330px) {
    padding: 0 1rem 1rem;
    gap: 16px;
  }

  .founderTitle {
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
    line-height: 28px;
    font-weight: 600;

    @media (max-width: 600px) {
      font-size: ${({ theme }) => theme.fontSizes.lg};
      line-height: 24px;
    }
  }

  .founderCardContainer {
    display: flex;
    gap: 17px;

    @media (max-width: 1023px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: auto;
    }
    @media (max-width: 950px) {
      grid-template-columns: repeat(1, 1fr);
    }

    .founderCard {
      display: flex;
      gap: 27px;
      /* max-width: 395.75px; */
      max-width: 415px;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.cardTertiaryBg};
      padding: 1.440625rem 1.546875rem 1.715625rem;
      border-radius: 12px;

      @media (max-width: 950px) {
        max-width: unset;
      }

      @media (max-width: 500px) {
        padding: 1rem;
      }
      @media (max-width: 425px) {
        flex-direction: column;
        align-items: center;
      }

      .profileImage {
        min-width: 106px;
        max-width: 106px;
        height: 104px;
        border: 1px solid ${({ theme }) => theme.colors.border.secondary};
        border-radius: 16px;
        overflow: hidden;

        @media (max-width: 1023px) {
          min-width: 90px;
          max-width: 90px;
          height: 90px;
        }

        @media (max-width: 600px) {
          min-width: 80px;
          max-width: 80px;
          height: 80px;
        }

        img {
          width: 106px;
          height: 104px;
          object-fit: cover;

          @media (max-width: 1023px) {
            width: 90px;
            height: 90px;
          }

          @media (max-width: 600px) {
            width: 80px;
            height: 80px;
          }
        }
      }

      .profileDetail {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media (max-width: 425px) {
          width: 100%;
          gap: 5px;
        }

        .nameAndDesignation {
          display: flex;
          flex-direction: column;
          gap: 3px;

          .name {
            font-size: ${({ theme }) => theme.fontSizes.lg};
            line-height: 23px;
            font-weight: 600;

            @media (max-width: 600px) {
              font-size: ${({ theme }) => theme.fontSizes.base};
              line-height: 18px;
            }
          }
          .designation {
            font-size: ${({ theme }) => theme.fontSizes.base};
            line-height: 23px;
            @media (max-width: 600px) {
              font-size: ${({ theme }) => theme.fontSizes.sm};
              line-height: 18px;
            }
          }
        }

        .founded {
          font-size: 1rem;
          line-height: 1.4375rem;
          margin-top: 1.5rem;
          font-weight: 500;

          span {
            text-decoration: underline;
            text-decoration-style: dashed;
            text-underline-offset: 5.5px;
            font-weight: 400;
            text-decoration-color: #707070;
            text-decoration-thickness: 0.5px;
          }
        }
      }
    }
  }
`;
