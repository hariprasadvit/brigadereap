/** @format */

// components/Header.js
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
// import primaryLogo from "../../public/Logos/PrimaryLogo.png";
import primaryLogo from "../../public/Logos/new-logo.png";
import profileIcon from "../../public/Icons/profile-icon.svg";
import CustomButton from "./CustomButton";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useUser } from "@/utils/UserContext";
import Link from "next/link";
import Cookies from "js-cookie";
import CustomInput from "./CustomInput";
import { clearUser } from "@/config/slices/authSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, setUser } = useUser();
  const { user_id = null } = user || {};
  const pathname = usePathname();
  const showSearchInput = false;
  // !["/login", "/company-detail"].includes(pathname);
  const isLoginPage = pathname === "/login";

  const goToLogin = (mode) => {
    const currentUrl = window.location.pathname + window.location.search;
    sessionStorage.setItem("prevPath", window.location.pathname);
    setMobileOpen(false);
    router.push(
      `/login?mode=${mode}&redirect_url=${encodeURIComponent(currentUrl)}`
    );
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProfile = () => {
    router.push(`/profile`);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    setUser(null);
    dispatch(clearUser());
    setContentLoader(true);
    window.location.reload();
    setTimeout(() => {
      setContentLoader(false);
    }, 1000);

    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest("li") &&
        !e.target.closest(".profile-dropdown-wrapper")
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);
  return (
    <>
      <HeaderWrapper className={mobileOpen ? "menu-open" : ""}>
        <LeftContainer>
          <LogoContainer isMenuOpen={mobileOpen}>
            <Link href={`${user_id ? "/profile" : "/"}`}>
              <Image src={primaryLogo} alt="Logo" />
            </Link>
          </LogoContainer>

          <Nav className="desktop-menu">
            <ul>
              <li>
                <a href="https://brigadereap.com/">HOME</a>
              </li>
              <Dropdown>
                <span>ACCELERATOR</span>
                <div className="dropdown-content">
                  <a href="https://brigadereap.com/programme">PROGRAMME</a>
                  <a href="https://brigadereap.com/portfolio">PORTFOLIO</a>
                </div>
              </Dropdown>
              <li>
                <a href="https://brigadereap.com/innovation-consulting">
                  INNOVATION CONSULTING
                </a>
              </li>
              <li>
                <a href="https://brigadereap.com/investments">INVESTMENTS</a>
              </li>
              <Dropdown>
                <span>ABOUT US</span>
                <div className="dropdown-content">
                  <a href="https://brigadereap.com/events">EVENT</a>
                  <a href="https://brigadereap.com/insights">INSIGHTS</a>
                  <a href="https://brigadereap.com/team">TEAM</a>
                  <a href="https://brigadereap.com/reap-portfolio">
                    REAP PORTFOLIO
                  </a>
                </div>
              </Dropdown>
              <li>
                <a href="https://brigadereap.com/contact-us">CONTACT US</a>
              </li>
            </ul>
          </Nav>
        </LeftContainer>

        {/* <ApplyButton href="#">APPLY NOW</ApplyButton> */}
        <RightContainer>
          {isLoginPage ? null : user_id ? (
            <>
              {/* Desktop profile dropdown */}
              {/* {!mobileOpen && (
                <div className="profile-dropdown-wrapper">
                  <ProfileImage
                    src={profileIcon}
                    alt="Profile"
                    onClick={() => setShowDropdown(!showDropdown)}
                  />
                  {showDropdown && (
                    <DropdownBox>
                      <DropdownItem onClick={handleProfile}>
                        My Profile
                      </DropdownItem>
                      <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                    </DropdownBox>
                  )}
                </div>
              )} */}
            </>
          ) : (
            <>
              {showSearchInput && (
                <div className="inputContainer">
                  <CustomInput
                    prefixIcon
                    inputBg={"white"}
                    inputBorder={"1px solid #D0D0D0"}
                    inputBorderRadius={"0"}
                    innerWidth="92%"
                    maxWidth={"377px"}
                    inputHeight={"37px"}
                    inputFontColor={"#122d4d"}
                    placeholder={"Search Profile"}
                  />
                </div>
              )}
              <div className="rightButtonContainer">
                <CustomButton
                  type="secondary"
                  btnText="Register"
                  height="37px"
                  width="92px"
                  onClick={() => goToLogin("signup")}
                />
              </div>

              <div className="rightButtonContainer">
                <CustomButton
                  type="primary"
                  btnText="Login"
                  height="37px"
                  width="92px"
                  fontSize="0.875rem"
                  borderRadius="2px"
                  onClick={() => goToLogin("signin")}
                />
              </div>
            </>
          )}

          {/* APPLY NOW - visible only when not login page and not in mobile menu */}
          {!isLoginPage && !mobileOpen && (
            <CustomButton
              type="primary"
              btnText="APPLY NOW"
              height="37px"
              width="auto"
              fontSize="0.875rem"
              borderRadius="2px"
              onClick={() =>
                window.open(
                  "https://www.f6s.com/brigade-reap-cohort18-slot2/apply",
                  "_blank"
                )
              }
              // onClick={() => goToLogin("signin")}
            />
          )}

          {isLoginPage
            ? null
            : user_id &&
              !mobileOpen && (
                <Flex>
                  <div className="profile-dropdown-wrapper">
                    <ProfileImage
                      src={profileIcon}
                      alt="Profile"
                      onClick={() => setShowDropdown(!showDropdown)}
                    />
                    {showDropdown && (
                      <DropdownBox>
                        <DropdownItem onClick={handleProfile}>
                          My Profile
                        </DropdownItem>
                        <DropdownItem onClick={handleLogout}>
                          Logout
                        </DropdownItem>
                      </DropdownBox>
                    )}
                  </div>
                </Flex>
              )}
        </RightContainer>
        <MobileRightContainer>
          <NavButton
            onClick={() => setMobileOpen(!mobileOpen)}
            name="nav-button"
            open={mobileOpen}
          >
            <Bar open={mobileOpen} />
          </NavButton>
          <div className="profile-dropdown-wrapper">
            {user_id && (
              <ProfileImage
                src={profileIcon}
                alt="Profile"
                onClick={() => setShowDropdown(!showDropdown)}
              />
            )}
            {showDropdown && (
              <DropdownBox>
                <DropdownItem onClick={handleProfile}>My Profile</DropdownItem>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </DropdownBox>
            )}
          </div>
        </MobileRightContainer>
      </HeaderWrapper>

      <MobileMenu className={mobileOpen ? "open" : ""}>
        <ul>
          <li>
            <a href="https://brigadereap.com/">HOME</a>
          </li>
          <li>
            <AccordionWrapper>
              <AccordionTitle
                onClick={() => {
                  setShowDropdown("accelerator");
                }}
                isOpen={showDropdown === "accelerator"}
              >
                ACCELERATOR
              </AccordionTitle>
              <DropdownContent isOpen={showDropdown === "accelerator"}>
                <a href="https://brigadereap.com/programme">PROGRAMME</a>
                <a href="https://brigadereap.com/portfolio">PORTFOLIO</a>
              </DropdownContent>
            </AccordionWrapper>
          </li>

          <li>
            <a href="https://brigadereap.com/innovation-consulting">
              INNOVATION CONSULTING
            </a>
          </li>
          <li>
            <a href="https://brigadereap.com/investments">INVESTMENTS</a>
          </li>

          <li>
            <AccordionWrapper>
              <AccordionTitle
                onClick={() => setShowDropdown("about")}
                isOpen={showDropdown === "about"}
              >
                ABOUT US
              </AccordionTitle>
              <DropdownContent isOpen={showDropdown === "about"}>
                <a href="https://brigadereap.com/events">EVENT</a>
                <a href="https://brigadereap.com/insights">INSIGHTS</a>
                <a href="https://brigadereap.com/team">TEAM</a>
                <a href="https://brigadereap.com/reap-portfolio">
                  REAP PORTFOLIO
                </a>
              </DropdownContent>
            </AccordionWrapper>
          </li>

          <li>
            <a href="https://brigadereap.com/contact-us">CONTACT US</a>
          </li>
        </ul>
        {isLoginPage ? null : user_id ? (
          <></>
        ) : (
          <MobileButtons>
            <div className="rightButtonContainer">
              <CustomButton
                type="secondary"
                btnText="Register"
                height="37px"
                width="92px"
                onClick={() => goToLogin("signup")}
              />
            </div>

            <div className="rightButtonContainer">
              <CustomButton
                type="primary"
                btnText="Login"
                height="37px"
                width="92px"
                fontSize="0.875rem"
                borderRadius="2px"
                onClick={() => goToLogin("signin")}
              />
            </div>
          </MobileButtons>
        )}
      </MobileMenu>
    </>
  );
};

export default Header;

const MobileButtons = styled.div`
  display: flex;
  gap: 1%;
  margin-top: 20px;
  justify-content: space-between;
  .rightButtonContainer {
    width: 49%;
    button {
      width: 100%;
    }
  }
`;
const LogoContainer = styled.div`
  max-width: 90px;
  width: 100%;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  ${({ isMenuOpen }) =>
    isMenuOpen &&
    css`
      z-index: 0;
      img {
        opacity: 0;
        visibility: hidden;
      }
    `}
`;
const HeaderWrapper = styled.header`
  position: sticky;
  top: -1px;
  z-index: 10;
  background: linear-gradient(180deg, #312c2c 0%, #000000 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 2rem;
  &.menu-open {
    background: transparent;
  }
  &.menu-open ${LogoContainer} {
    z-index: 0;
    img {
      opacity: 0;
      visibility: hidden;
    }
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.875rem;
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;

    li,
    span {
      padding: 1.75rem 0.938rem;
      width: max-content;
      color: white;
      font-weight: 500;
      cursor: pointer;
      position: relative;
      @media (max-width: 1300px) {
        padding: 1.5rem 0.75rem;
      }
    }

    a {
      color: white;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 600;
      &:hover {
        color: ${({ theme }) => theme.colors.primaryYellow};
      }
      @media (max-width: 1300px) {
        font-size: 0.75rem;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Dropdown = styled.li`
  position: relative;
  span {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.font.primary};
    text-decoration: none;
    &:hover {
      color: ${({ theme }) => theme.colors.primaryYellow};
    }
    @media (max-width: 1300px) {
      font-size: 0.75rem;
    }
  }
  .dropdown-content {
    position: absolute;
    top: 120%;
    left: 0;
    background-color: ${({ theme }) => theme.colors.primaryYellow};
    padding: 0.5rem 1rem;
    // display: none;
    visibility: hidden;
    transition: 0.3s linear;
    flex-direction: column;
    min-width: 180px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

    a {
      display: block;
      color: ${({ theme }) => theme.colors.font.body};
      padding: 5px 0;
      text-decoration: none;
      &:hover {
        color: ${({ theme }) => theme.colors.font.primary};
      }
    }
  }

  &:hover .dropdown-content {
    // display: flex;
    visibility: visible;
    top: 100%;
    transition: 0.3s linear;
  }
`;

const NavButton = styled.button`
  background: transparent;
  border: none;
  width: 30px;
  height: 25px;
  position: relative;
  display: block;
  cursor: pointer;
  z-index: 444;

  @media (min-width: 951px) {
    display: none;
  }
`;

const Bar = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.primaryYellow};
  transition: all 0.3s ease;
  border-radius: 50px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primaryYellow};
    transition: all 0.3s ease;
    border-radius: 50px;
  }

  &::before {
    right: 0px;
    top: ${({ open }) => (open ? "0" : "-8px")};
    transform: ${({ open }) => (open ? "rotate(45deg)" : "none")};
  }

  &::after {
    width: ${({ open }) => (open ? "100%" : "70%")};
    right: 0px;
    bottom: ${({ open }) => (open ? "0" : "-7.5px")};
    transform: ${({ open }) => (open ? "rotate(-45deg)" : "none")};
  }

  ${({ open }) =>
    open &&
    css`
      background-color: transparent;
    `}
`;
const MobileMenu = styled.div`
  background: #2d2d2d;
  color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-top: 0;
  padding: 70px 20px 20px !important;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  opacity: 0;
  clip-path: circle(0px at 90% -10%);
  -webkit-clip-path: circle(0px at 90% -10%);
  transition: all 0.6s ease;
  z-index: 99;
  &.open {
    z-index: 99;
    opacity: 1;
    pointer-events: all;
    clip-path: circle(1600px at 90% -10%);
    -webkit-clip-path: circle(1600px at 90% -10%);
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;

    li,
    summary {
      color: white;
      font-size: 18px;
      font-weight: 500;
      display: block;
      padding: 15px 0;
      text-align: left;
      border-bottom: 1px solid #ffffff30;
    }

    a {
      color: white;
      text-decoration: none;
      // padding-left: 1rem;
      display: block;
      font-size: 0.875rem;
    }

    details[open] summary {
      color: #f5b700;
    }

    details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;

const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const AccordionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: white;
  padding: 0.5rem 0;
  cursor: pointer;
  position: relative;
  font-size: 0.875rem;
  @media (max-width: 550px) {
    padding: 0;
  }
  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: ${({ isOpen }) =>
      isOpen ? "rotate(-135deg)" : "rotate(45deg)"};
    width: 8px;
    height: 8px;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    transition: transform 0.3s ease;
    margin-top: -6px;
  }
`;
const DropdownContent = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryYellow};
  border: 1px solid #2d2d2d10;
  border-top: 0;
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? "500px" : "0px")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: max-height 0.5s ease, opacity 0.4s ease, visibility 0.4s ease;
  padding: ${({ isOpen }) => (isOpen ? "15px" : "0 15px")};
  margin-top: ${({ isOpen }) => (isOpen ? "10px" : "0")};

  display: flex;
  flex-direction: column;

  a {
    display: block;
    color: black !important;
    font-weight: 500;
    margin-bottom: 10px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
const LeftContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 950px) {
    gap: 0.875rem;
  }
`;
const RightContainer = styled.div`
  display: flex;
  gap: 0.875rem;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 950px) {
    display: none;
  }
  .inputContainer {
    max-width: 377px;
    width: 100%;
  }
  .rightButtonContainer {
    width: 92px;
  }
`;
const MobileRightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  // align-items: center;

  @media (min-width: 700px) {
    display: none;
  }
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  .profile-dropdown-wrapper {
    display: flex;
    justify-content: center;

    ${({ open }) =>
      open &&
      css`
        display: none;
      `}
  }
`;
const ProfileImage = styled(Image)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 20px;
`;
const DropdownBox = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  width: 150px;
  padding: 0.5rem 0;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  color: #1f1761;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;
