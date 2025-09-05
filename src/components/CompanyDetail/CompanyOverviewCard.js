import React from "react";
import styled from "styled-components";

const CompanyOverviewCard = ({ description }) => {
  return (
    <CompanyOverView>
      <div className="overviewTitle">Company Overview</div>
      <div className="overviewDescription">{description}</div>
    </CompanyOverView>
  );
};

export default CompanyOverviewCard;

const CompanyOverView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26.14px;
  padding: 1.6875rem 5.75rem 1.55rem 2.875rem;
  color: ${({ theme }) => theme.colors.font.body};

  @media (max-width: 1023px) {
    padding: 2.5625rem 2.3125rem;
    gap: 20.02px;
  }
  @media (max-width: 600px) {
    padding: 1.625rem;
  }
  @media (max-width: 330px) {
    padding: 1rem;
    gap: 16px;
  }

  .overviewTitle {
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
    line-height: 28px;
    font-weight: 600;

    @media (max-width: 600px) {
      font-size: ${({ theme }) => theme.fontSizes.lg};
      line-height: 24px;
    }
  }
  .overviewDescription {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    line-height: 23px;
    letter-spacing: 0;

    @media (max-width: 600px) {
      font-size: ${({ theme }) => theme.fontSizes.sm};
      line-height: 18px;
    }
  }
`;
