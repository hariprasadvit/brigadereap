import Image from "next/image";
import React from "react";
import styled from "styled-components";
import Button from "../Button";

const ProfileCard = ({ onCreateProfile }) => {
  return (
    <ProfileCardWrapper>
      <div className="label">Add your Startup</div>
      <Button buttonText="Create profile" onClick={onCreateProfile}/>
    </ProfileCardWrapper>
  );
};

export default ProfileCard;

const ProfileCardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 4px #00000050;
  border-radius: 8px;
  opacity: 1;
  padding: 35px;

  @media screen and (max-width: 768px) {
    padding: 25px;
  }
  @media screen and (max-width: 550px) {
    flex-direction: column;
    gap: 15px;
    max-width: 350px;
    margin: 0 auto;
  }
  .label {
    font-size: 21px;
    font-weight: 600;
    line-height: 28px;
    color: #000;
    @media screen and (max-width: 768px) {
      font-size: 18px;
    }
  }
  button {
    max-width: 215px;
    margin: 0;
  }
`;
