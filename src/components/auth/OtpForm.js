/** @format */

// components/auth/OtpForm.jsx
import OtpInput from "react-otp-input";
import Button from "@/components/Button";
import ToggleModeText from "./ToggleModeText";
import styled from "styled-components";

export default function OtpForm({
  otp,
  onChange,
  onSubmit,
  errors,
  timer,
  canResend,
  onResend,
  mobile,
  onEdit,
  loading,
  isResendClicked,
}) {
  return (
    <FormWrap onSubmit={onSubmit}>
      <ToggleText>
        <h2 className="otp-title">Verify OTP</h2>
        <h4 className="otp-desc">
          Kindly check your Mobile Number: <b>{mobile}</b>{" "}
          <span className="edit" onClick={onEdit}>
            Edit
          </span>{" "}
          <br />
          For a 6 digit password
        </h4>
      </ToggleText>
      <Form>
        <OtpWrap>
          <OtpInput
            value={otp}
            onChange={onChange}
            numInputs={6}
            inputType="tel"
            renderSeparator={<span className="separator"></span>}
            renderInput={(props) => <StyledOtpInput {...props} />}
          />
        </OtpWrap>
        {errors.otp && <div style={{ color: "red" }}>{errors.otp}</div>}
        <Button
          type="submit"
          buttonText={!isResendClicked && loading ? "Loading..." : "Verify"}
          disabled={!isResendClicked && loading}
          borderRadius="25px"
        />
        <ToggleText className="otp-desc">
          Didn’t get OTP ?{" "}
          {isResendClicked ? (
            <span>Resending...</span>
          ) : canResend ? (
            <b onClick={onResend} style={{ cursor: "pointer" }}>
              Resend
            </b>
          ) : (
            <span>Resend in {`0:${timer < 10 ? `0${timer}` : timer}`}</span>
          )}
        </ToggleText>
      </Form>
    </FormWrap>
  );
}
const FormWrap = styled.form`
  width: 100%;
  max-width: 30.938rem;
  margin: auto;
  min-height: auto;
  @media screen and (max-width: 550px) {
    max-width: 100%;
    padding: 20px;
  }
  @media screen and (max-width: 360px) {
    padding: 16px;
  }
`;
const Form = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 3px 6px #00000050;
  padding: 0.375rem 2.375rem 2.375rem 2.375rem;
  @media screen and (max-width: 550px) {
    padding: 0.184rem 1.375rem 1.375rem 1.375rem;
  }
  @media screen and (max-width: 360px) {
    padding: 0.16rem 1rem 1rem 1rem;
  }
`;
const OtpWrap = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  .separator {
    width: 1rem;
    @media screen and (max-width: 550px) {
      width: 0.6rem;
    }
  }
`;
const StyledOtpInput = styled.input`
  width: 56px !important;
  height: 56px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  text-align: center;
  font-size: 18px;
  outline: none;
  background: #fff;
  padding: 10px;
  margin-top: 2rem;
  color: #000;
  font-weight: 600;
  font-family: Montserrat;

  &:focus {
    border-color: #1f1761;
  }
  @media screen and (max-width: 550px) {
    width: 40px !important;
    height: 40px;
  }
  @media screen and (max-width: 360px) {
    width: 36px !important;
    height: 36px;
  }
`;

const ToggleText = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #000;
  font-size: 1rem;

  @media screen and (max-width: 550px) {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
  .otp-title {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    @media screen and (max-width: 550px) {
      font-size: 1.1rem;
    }
  }
  .otp-desc {
    margin-bottom: 1rem;
    font-weight: 400;
    font-size: 1rem;
    @media screen and (max-width: 550px) {
      font-size: 0.875rem;
    }
    .edit {
      cursor: pointer;
      font-weight: 500;
      text-decoration: underline;

      &:hover {
        color: blue;
        text-decoration: underline;
      }
    }
  }
  .signup-txt {
    cursor: pointer;
    color: #000000;
    font-weight: 600;
    &:hover {
      text-decoration: underline;
    }
  }
`;
