/** @format */

import React from "react";
import styled from "styled-components";
import Image from "next/image";

const EmptyState = ({
  icon,
  title,
  description,
  buttonText,
  onClick,
  width,
  height,
}) => {
  return (
    <Wrapper>
      {icon && (
        <IconWrapper>
          <Image
            src={icon}
            alt="empty-state-icon"
            width={width ? width : 80}
            height={height ? height : 80}
          />
        </IconWrapper>
      )}
      <Title>{title || "No Results Found"}</Title>
      <Description>
        {description || "There is currently no content available to display."}
      </Description>
      {buttonText && onClick && (
        <ActionButton onClick={onClick}>{buttonText}</ActionButton>
      )}
    </Wrapper>
  );
};

export default EmptyState;

// Styled Components

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  // background-color: #f9f9f9;
  border-radius: 16px;
  text-align: center;
  color: #555;
`;

const IconWrapper = styled.div`
  margin-bottom: 20px;
  img {
    opacity: 0.7;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: #777;
  margin-bottom: 20px;
  max-width: 400px;
`;

const ActionButton = styled.button`
  background-color: #0055ff;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #003dcc;
  }
`;
