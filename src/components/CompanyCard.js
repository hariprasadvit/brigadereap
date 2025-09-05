/** @format */

"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { EditOutlined } from "@ant-design/icons";
import CustomModal from "./CustomModal";
import Image from "next/image";
import infoIcon from "../../public/Icons/info-circle.svg";
export default function CompanyCard({
  logoSrc,
  name,
  place,
  description,
  detail1,
  detail2,
  detail3,
  title1,
  title2,
  title3,
  onKnowMore,
  status,
  detail3IsLink,
  isEdit,
  onEdit,
  rejection_reason,
  isExpanded,
  isTruncated,
  request_type,
}) {
  const paragraphRef = useRef(null);
  const [showReadMore, setShowReadMore] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (paragraph) {
      const lineHeight = parseFloat(
        getComputedStyle(paragraph).lineHeight || "23"
      );
      const maxLines = 3;
      const maxHeight = lineHeight * maxLines;
      if (paragraph.scrollHeight > maxHeight) {
        setShowReadMore(true);
      }
    }
  }, []);

  return (
    <CardWrapper onClick={onKnowMore}>
      <Header>
        {/* {request_type === "claim" && <div>Cliam</div>} */}
        <CompanyInfo>
          <Logo src={logoSrc} alt="Company Logo" />
          <NamePlace>
            <CompanyName>{name}</CompanyName>
            <CompanyPlace>{place}</CompanyPlace>
          </NamePlace>
        </CompanyInfo>
        <Header style={{ gap: 20 }}>
          <>
            {status ? (
              <Status
                status={status}
                // style={{
                //   color:
                //     status === "approved"
                //       ? "green"
                //       : status === "rejected"
                //       ? "red"
                //       : "grey",
                // }}
              >
                {request_type === "claim" ? `Claim request is ` : ``}
                {status === "rejected" ? (
                  <span onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(rejection_reason)
                  }}
                  >
                    {" "}
                    {status}
                  </span>
                ) : (
                  status
                )}
              </Status>
            ) : null}
            {status === "rejected" ? (
              <Infoicon
                className="info-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(rejection_reason)
                }}
              >
                <Image src={infoIcon} alt="info-icon" />
              </Infoicon>
            ) : null}
          </>

          {isEdit ? (
            <EditWrapper>
              <Status
                style={{
                  color: "black",
                  background: "transparent",
                }}
                onClick={e => {
                  e.stopPropagation();
                  onEdit(e)
                }}
              >
                <EditOutlined />
              </Status>
            </EditWrapper>
          ) : null}
        </Header>
      </Header>

      <Content>
        <Paragraph ref={paragraphRef}>{description}</Paragraph>
        {showReadMore && <ReadMore onClick={onKnowMore}>...Read more</ReadMore>}
      </Content>

      <FooterWrapper>
        <Footer>
          <FooterTitle>{title1}</FooterTitle>
          <FooterDescription>{detail1 || "--"}</FooterDescription>
        </Footer>
        <Footer>
          <FooterTitle>{title2}</FooterTitle>
          <FooterDescription>{detail2 || "--"}</FooterDescription>
        </Footer>
        <Footer>
          <FooterTitle>{title3}</FooterTitle>
          <FooterDescription
            className={detail3IsLink && detail3 ? "underline" : ""}
          >
            {(detail3IsLink && detail3 ? (
              <Link href={detail3} target="_blank" onClick={(e) => e.stopPropagation()}  rel="noopener noreferrer">
                {detail3}
              </Link>
            ) : (
              detail3
            )) || "--"}
          </FooterDescription>
        </Footer>
        {/* <Footer className="footer-bottom">
          <Knowmore onClick={onKnowMore}>Know More</Knowmore>
        </Footer> */}
      </FooterWrapper>
      <CustomModal
        className="reject-modal"
        isOpen={isOpen}
        title="Rejected !"
        confirmButton={"Close"}
        buttonWidth={"100px"}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          setIsOpen(false);
        }}
      >
        <div className="content">{isOpen}</div>
      </CustomModal>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 0.5rem;
  padding: 1.875rem;
  height: max-content;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(180, 200, 230, 0.15);
  position: relative;
  @media (max-width: 550px) {
    padding: 1rem;
  }
  .reject-modal {
    .content {
      max-height: 40vh;
      overflow-y: auto;
      @media (max-width: 800px) {
        max-height: 50vh;
      }
      @media (max-width: 550px) {
        max-height: 55vh;
      }
      scrollbar-width: thin;
      scrollbar-color: grey transparent;

      &::-webkit-scrollbar {
        width: 3px;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: grey;
        border-radius: 10px;
      }
    }
  }
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;
`;

const EditWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  position: absolute;
  top: -0.7rem;
  right: -0.7rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
`;
const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 3.75rem;
  height: 3.75rem;
  padding: 5px;
  object-fit: contain;
  margin-right: 12px;
  border: 1px solid #c9c9c9;
  border-radius: 8px;
`;

const NamePlace = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyName = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: #000;
  &:hover {
    text-decoration: underline;
  }
`;
const Status = styled.div`
  font-weight: 600;
  font-size: 1rem;
  text-transform: capitalize;
  color: ${({ status }) =>
    status === "approved"
      ? "#008000"
      : status === "rejected"
      ? "#FF0000"
      : "#FF7F50"};
  background-color: ${({ status }) =>
    status === "approved"
      ? "#0080001A"
      : status === "rejected"
      ? "#FF00001A"
      : "#FF7F501A"};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  height: max-content;
  .flex-data {
    display: flex;
    align-items: center;
    `;

const Infoicon = styled.div`
      height: 26px;
      width: 26px;
      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }
`;

const CompanyPlace = styled.div`
  font-size: 0.875rem;
  color: #000;
`;

const Content = styled.div`
  margin-bottom: 1rem;
  height: 92px;
`;

const Paragraph = styled.p`
  font-size: 0.875rem;
  color: #000;
  line-height: 1.643;
  display: -webkit-box;
  -webkit-box-orient: unset;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  max-height: calc(1.643em * 3);
`;
const ReadMore = styled.span`
  font-size: 0.875rem;
  color: #000;
  cursor: pointer;
  display: inline-block;
  margin-top: 4px;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
const FooterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; /* spacing between footers */
  margin-top: 1.5rem;
`;

const Footer = styled.div`
  flex: 1 1 30%; /* flexible width with min 30% */
  min-width: 200px;
  &.footer-bottom {
    align-self: flex-end;
  }
`;

const FooterTitle = styled.h4`
  font-size: 14px;
  color: #000000;
  line-height: 23px;
  font-weight: 600;
`;

const FooterDescription = styled.p`
  font-size: 14px;
  color: #000000;
  line-height: 23px;
  &.underline:hover {
    text-decoration: underline;
  }
  &.underline {
    color: #0000ee;
  }
`;
const Knowmore = styled.a`
  font-size: 14px;
  color: #000000;
  line-height: 23px;
  font-weight: 600;
  border-bottom: 2px dotted #707070;
  cursor: pointer;
`;
