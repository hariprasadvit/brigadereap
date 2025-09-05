/** @format */

"use client";
// app/(with-header)/layout.tsx
import HeaderNew from "@/components/Header";
import styled, { ThemeProvider } from "styled-components";
import theme from "@/app/styles";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import loader from "../../../public/gif/loader.gif";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function WithHeaderLayout({ children }) {
  const pathname = usePathname();
  const hideFooter = pathname === "/profile";
  const [contentLoader, setContentLoader] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <PageWrapper>
        <HeaderNew setContentLoader={setContentLoader} />
        {contentLoader ? (
          <LoaderContainer>
            <Image src={loader} alt="loader" />
          </LoaderContainer>
        ) : (
          children
        )}
        {!hideFooter && <Footer />}
      </PageWrapper>
    </ThemeProvider>
  );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  // height: 100%;
  /* justify-content: space-between; */
  background-color: ${({ theme }) => theme.colors.cardSecondaryBg};
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  img {
    height: 80px;
    width: 80px;
  }
  @media screen and (max-width: 1100px) {
    height: 42vh;
    img {
      height: 50px;
      width: 50px;
    }
  }
`;
