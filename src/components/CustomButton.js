/** @format */

"use client";

import React from "react";
import styled from "styled-components";
import { Image } from "antd";
import theme from "@/app/styles";

const BUTTON_STYLES = {
  primary: {
    bg: theme.colors.button.primaryBg,
    color: theme.colors.font.primary,
    fontSize: theme.colors.font.sm,
    borderRadius: "2px",
    hoverBg: theme.colors.button.hoverBg,
    hoverColor: theme.colors.button.hoverColor,
  },
  primaryBold: {
    bg: theme.colors.button.primaryBg,
    color: theme.colors.button.primaryColor,
    fontSize: theme.colors.font.sm,
    borderRadius: "2px",
    hoverBg: theme.colors.button.hoverBg,
    hoverColor: theme.colors.button.hoverColor,
    fontWeight: "600",
  },
  secondary: {
    bg: theme.colors.button.secondaryBg,
    color: theme.colors.font.body,
    fontSize: theme.colors.font.sm,
    borderRadius: "2px",
    hoverBg: theme.colors.button.hoverBg,
    hoverColor: theme.colors.button.hoverColor,
  },
  tertiary: {
    bg: theme.colors.greys.g3,
    color: theme.colors.font.body,
    fontSize: theme.colors.font.sm,
    borderRadius: "2px",
    hoverBg: theme.colors.button.hoverBg,
    hoverColor: theme.colors.button.hoverColor,
  },
  link: {
    bg: theme.colors.button.tertiaryBg,
    color: theme.colors.button.tertiaryColor,
    fontSize: theme.colors.font.sm,
    hoverColor: theme.colors.button.hoverColor2,
  },
};

export default function CustomButton({
  type = "primary",
  btnText,
  href,
  onClick,
  disabled,
  icon,
  suffixIcon,
  bg,
  width,
  responsiveWidth,
  height,
  border,
  fontSize,
  fontWeight,
  color,
  borderRadius,
  iconSize = 20,
  padding,
  style = {},
  isSelected = false,
  htmlType,
  title,
}) {
  const isLink = Boolean(href);
  const styleSet = BUTTON_STYLES[type] || BUTTON_STYLES.primary;

  const Content = (
    <ButtonContent>
      {icon && (
        <StyledIcon
          src={icon}
          width={iconSize}
          height={iconSize}
          preview={false}
        />
      )}
      <span>{btnText}</span>
      {suffixIcon && (
        <StyledIcon
          src={suffixIcon}
          width={iconSize}
          height={iconSize}
          preview={false}
        />
      )}
    </ButtonContent>
  );

  return (
    <StyledWrapper
      as={isLink ? "a" : "button"}
      href={href}
      onClick={onClick}
      disabled={disabled}
      title={title}
      $bg={bg || styleSet.bg}
      $hoverBg={styleSet.hoverBg}
      $hoverColor={styleSet.hoverColor}
      $color={color || styleSet.color}
      $width={width}
      $responsiveWidth={responsiveWidth}
      $height={height}
      $border={border}
      $fontSize={fontSize || styleSet.fontSize}
      $fontWeight={fontWeight || styleSet.fontWeight}
      $radius={borderRadius || styleSet.borderRadius}
      $padding={padding || styleSet.padding}
      $isSelected={isSelected}
      style={style}
      type={htmlType}
    >
      {Content}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $isSelected, $type, $color, $hoverColor }) =>
    $isSelected && $type === "link" ? $hoverColor : $color};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  font-size: ${({ $fontSize }) => $fontSize || "0.875rem"};
  font-weight: ${({ $fontWeight }) => $fontWeight || "600"};
  font-family: "Montserrat";
  border: ${({ $border }) => $border || "none"};
  border-radius: ${({ $radius }) => $radius};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  text-decoration: none;
  transition: background-color 0.3s;
  padding: ${({ $padding }) => $padding || "0.25rem 0.75rem"};
  line-height: 18px;

  @media screen and (max-width: 550px) {
    padding: 0.5rem;
    font-size: 0.6rem;
  }
  &:hover {
    background-color: ${({ $hoverBg }) => $hoverBg};
    color: ${({ $hoverColor }) => $hoverColor};
  }

  &:disabled {
    opacity: 0.6;
  }

  @media (max-width: 950px) {
    width: ${({ $responsiveWidth }) => $responsiveWidth};
  }
  @media (max-width: 425px) {
    width: 100%;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  > span {
    font-family: "Montserrat";
    // color: ${({ theme }) => theme.colors.font.primary};
  }
`;

const StyledIcon = styled(Image)`
  object-fit: contain;
`;
