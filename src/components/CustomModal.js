/** @format */

"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
import CustomButton from "./CustomButton";

const CustomModal = ({
  className,
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  cancelButton,
  confirmButton,
  buttonWidth,
  confirmDisabled,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()} className={className}>
        <ModalHeader>
          <Title>{title}</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <ModalContent>{children}</ModalContent>

        <ModalFooter>
          {cancelButton && (
            <CustomButton
              type="secondary"
              onClick={onClose}
              btnText={cancelButton}
              width={buttonWidth}
              height={"37px"}
              border={"1px solid #707070"}
            />
          )}
          <CustomButton
            type="primary"
            onClick={onConfirm}
            btnText={confirmButton}
            width={buttonWidth}
            height={"37px"}
            disabled={confirmDisabled}
          />
        </ModalFooter>
      </ModalBox>
    </Overlay>
  );
};

export default CustomModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  padding: 0;
  margin: 1.625rem;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.font.body};
`;

const ModalHeader = styled.div`
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};

  @media (max-width: 425px) {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

const CloseButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.font.body};
`;

const ModalContent = styled.div`
  padding: 1.25rem;
  font-size: ${({ theme }) => theme.fontSizes.base};

  @media (max-width: 425px) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const ModalFooter = styled.div`
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #eee;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
