/** @format */

"use client";

import styled from "styled-components";
export default function Button({
  onClick,
  buttonText,
  type,
  disabled,
  borderRadius,
  width,
}) {
  return (
    <ButtonWrapper
      onClick={onClick}
      type={type}
      disabled={disabled}
      radius={borderRadius}
      width={width}
    >
      {buttonText}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button`
  margin-top: 1.5rem;
  background-color: #e47b3c;
  color: #ffffff;
  padding: 0.75rem;
  width: ${(props) => props.width || "100%"};
  border: none;
  border-radius: ${(props) => props.radius || "4px"};
  cursor: pointer;
  font-weight: bold;
  font-size: 1.125rem;
  font-family: "Montserrat";
  @media screen and (max-width: 550px) {
    padding: 0.5rem;
    font-size: 1rem;
  }
`;
