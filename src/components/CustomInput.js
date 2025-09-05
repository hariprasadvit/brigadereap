/** @format */

"use client";

import Image from "next/image";
import styled from "styled-components";
import searchIcon from "../../public/Icons/searchIconWhite.svg";
import { useEffect, useState } from "react";

export default function CustomInput({
  placeholder,
  buttonText,
  onButtonClick,
  prefixIcon,
  gap,
  maxWidth,
  width,
  innerMaxWidth,
  innerWidth,
  inputHeight,
  inputBorder,
  inputBorderRadius,
  inputBg,
  inputFontColor,
  inputPadding,
  prefixIconSize,
  isSearch,
  onFocus,
  onChange = () => {},
  handleKeyDown = () => {},
  value,
  defaultValue,
}) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);
  return (
    <InputWrapper
      $gap={gap}
      $width={width}
      $maxWidth={maxWidth}
      $height={inputHeight}
      $border={inputBorder}
      $borderRadius={inputBorderRadius}
      $bg={inputBg}
      $iconSize={prefixIconSize}
      $padding={inputPadding}
      $isSearch={isSearch}
    >
      <StyledInput
        placeholder={placeholder || ""}
        $color={inputFontColor}
        $width={innerWidth}
        $maxWidth={innerMaxWidth}
        $isSearch={isSearch}
        onChange={(e) => {
          onChange(e);
          setInputValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        value={inputValue}
        defaultValue={defaultValue}
        onFocus={onFocus}
      />
      {buttonText && (
        <RightButton onClick={() => onButtonClick(inputValue)}>
          {buttonText || ""}
        </RightButton>
      )}
      {prefixIcon && (
        <ImageWrapper onClick={() => inputValue && onButtonClick(inputValue)}>
          <Image src={searchIcon} alt="Search" />
        </ImageWrapper>
      )}
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ $isSearch }) =>
    $isSearch ? "space-between" : "unset"};
  gap: ${({ $gap }) => $gap || "0.625rem"};
  max-width: ${({ $maxWidth }) => $maxWidth || "100%"};
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height, $isSearch }) =>
    $height || $isSearch ? "56px" : "auto"};
  border: ${({ $border }) => $border || "1px solid #ffebb1"};
  border-radius: ${({ $borderRadius }) => $borderRadius || "20px"};
  overflow: ${({ $overflow }) => $overflow || "hidden"};
  padding: ${({ $padding, $isSearch }) =>
    $isSearch
      ? "0.625rem 0.75rem 0.625rem 2.875rem"
      : $padding || "0.5625rem 0.75rem"};
  background-color: ${({ $bg }) => $bg || "#49494a"};
  color: ${({ $color }) => $color || "#122d4d"};

  img {
    width: ${({ $iconSize }) => $iconSize || "20px"};
    height: ${({ $iconSize }) => $iconSize || "20px"};
  }
  @media (max-width: 1100px) {
    height: ${({ $isSearch }) => ($isSearch ? "52px" : "inherit")};
    padding: ${({ $isSearch }) => $isSearch && "0.5rem 0.35rem 0.5rem 2rem"};
  }
  @media (max-width: 800px) {
    padding: ${({ $isSearch }) => $isSearch && "0.4rem 0.4rem 0.4rem 1.8rem"};
    height: ${({ $isSearch }) => ($isSearch ? "46px" : "inherit")};
    border-radius: 14px;
  }
  @media (max-width: 550px) {
    padding: ${({ $isSearch }) =>
      $isSearch ? "0.3rem 0.27rem 0.3rem 1rem" : "inherit"};
    height: ${({ $isSearch }) => ($isSearch ? "auto" : "inherit")};
    border-radius: 12px;
  }
`;

const StyledInput = styled.input`
  max-width: ${({ $maxWidth = "100%" }) => $maxWidth};
  width: ${({ $width = "82%", $isSearch }) => $width || ($isSearch && "90%")};
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;
  background-color: transparent;
  border: unset;
  color: ${({ $color }) => $color || "white"};
  font-family: Montserrat;
  font-weight: 400;
  height: 100%;
  padding: 0;
  margin: 0;
  &::placeholder {
    color: #ffffff;
    opacity: 0.7;
    font-weight: 300;
  }
  @media (max-width: 800px) {
    font-size: ${({ $isSearch }) => ($isSearch ? "0.875rem" : "inherit")};
  }
`;

const ImageWrapper = styled.button`
  background: #e47b3c;
  border-radius: 50%;
  padding: 6px;
  border: 0;
  height: 40px;
  width: 40px;
  cursor: pointer;
  @media (max-width: 800px) {
    height: 32px;
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 550px) {
    height: 30px;
    width: 30px;
    img {
      height: 70%;
      width: 80%;
    }
  }
`;
const RightButton = styled.button`
  background: #e47b3c;
  color: #122d4d;
  border: none;
  padding: 0.4375rem 1.3125rem;
  border-radius: 20px;
  font-size: 0.6875rem;
  line-height: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #18355c;
    color: #fff;
  }
`;
