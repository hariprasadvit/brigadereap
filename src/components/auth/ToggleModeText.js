/** @format */

import styled from "styled-components";

// components/auth/ToggleModeText.jsx
export default function ToggleModeText({ mode, onClick }) {
  return (
    <ToggleText style={{ textAlign: "center", marginTop: "1rem" }}>
      {mode === "signup"
        ? "Already have an account?"
        : "Don't have an account ?"}{" "}
      <span onClick={onClick} style={{ cursor: "pointer", fontWeight: "bold" }}>
        {mode === "signup" ? "Sign In" : "Sign Up"}
      </span>
    </ToggleText>
  );
}

const ToggleText = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #000;
  font-size: 1rem;
  .otp-title {
    margin-bottom: 1rem;
  }
  .otp-desc {
    margin-bottom: 1rem;
    font-weight: 400;
  }
  .signup-txt {
    cursor: pointer;
    color: #000000;
    font-weight: 600;
    &:hover {
      text-decoration: underline;
    }
  }
  @media screen and (max-width: 550px) {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
`;
