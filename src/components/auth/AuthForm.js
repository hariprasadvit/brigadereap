/** @format */

// components/auth/AuthForm.jsx
import InputComponent from "@/components/Input";
import Button from "@/components/Button";
import ToggleModeText from "./ToggleModeText";
import styled from "styled-components";

export default function AuthForm({
  mode,
  formData,
  errors,
  loading,
  onChange,
  onSubmit,
  onSwitchMode,
}) {
  return (
    <FormWrap onSubmit={onSubmit}>
      <Form>
        <Title>{mode === "signup" ? "Register New Account" : "Login"}</Title>
        {mode === "signup" && (
          <>
            <InputComponent
              name="first_name"
              label="First name"
              value={formData.first_name}
              onChange={onChange}
              placeholder="Enter your first name"
              error={errors.first_name}
              onKeyDown={(e) => {
                const allowedRegex = /^[a-zA-Z]$/;
                if (
                  !allowedRegex.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Tab" &&
                  e.key !== " "
                ) {
                  e.preventDefault();
                }
              }}
            />
            <InputComponent
              name="last_name"
              label="Last name"
              value={formData.last_name}
              onChange={onChange}
              placeholder="Enter your last name"
              error={errors.last_name}
              onKeyDown={(e) => {
                const allowedRegex = /^[a-zA-Z]$/;
                if (
                  !allowedRegex.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Tab" &&
                  e.key !== " "
                ) {
                  e.preventDefault();
                }
              }}
            />
          </>
        )}
        <InputComponent
          name="mobile_number"
          label="Mobile"
          value={formData.mobile_number}
          onChange={onChange}
          placeholder="Enter your mobile number"
          error={errors.mobile_number}
          type="tel"
        />
        <Button
          type="submit"
          buttonText={loading ? "Loading..." : "Verify"}
          disabled={loading}
          borderRadius="25px"
        />
        <ToggleModeText mode={mode} onClick={onSwitchMode} />
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
`;
const Form = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 3px 6px #00000050;
  padding: 0.375rem 2.375rem 2.375rem 2.375rem;
  @media screen and (max-width: 550px) {
    padding: 0.184rem 1.375rem 1.375rem 1.375rem;
  }
`;

const Title = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #000;
  font-weight: bold;
  font-size: 1.5rem;
  @media screen and (max-width: 550px) {
    font-size: 1rem;
  }
`;
