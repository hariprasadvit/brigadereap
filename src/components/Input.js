/** @format */

"use client";

import styled from "styled-components";

export default function InputComponent({
  name,
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  disabled,
  onKeyDown,
}) {
  return (
    <InputWrapper>
      <Label htmlFor={name}>{label}</Label>
      {type === "textarea" ? (
        <StyledTextarea
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onKeyDown={onKeyDown}
        />
      ) : (
        <Input
          type={type || "text"}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onKeyDown={onKeyDown}
        />
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  margin-top: 2rem;
  @media screen and (max-width: 550px) {
    margin-top: 1.5rem;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
  color: #000;
  font-size: 1rem;
  @media screen and (max-width: 550px) {
    font-size: 0.8rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9375rem 1.375rem;
  border: 1px solid #c6c6c6;
  background-color: #fff;
  color: #000000;
  font-size: 1rem;
  font-family: Montserrat;
  font-weight: 700;
  &::placeholder {
    color: #0d0d0d;
    font-weight: 400;
  }

  &:focus {
    border-color: #1f1761;
    outline: none;
  }
  @media screen and (max-width: 550px) {
    padding: 0.6rem 0.687rem;
    font-size: 0.8rem;
  }
`;
const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 0.9375rem 1.375rem;
  border: 1px solid #c6c6c6;
  background-color: #fff;
  color: #000000;
  font-size: 1rem;
  font-family: Montserrat;
  font-weight: 700;
  resize: vertical;
  min-height: 120px;

  &::placeholder {
    color: #0d0d0d;
    font-weight: 400;
  }

  &:focus {
    border-color: #1f1761;
    outline: none;
  }

  @media screen and (max-width: 550px) {
    padding: 0.6rem 0.687rem;
    font-size: 0.8rem;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;
