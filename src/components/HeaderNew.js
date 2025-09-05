/** @format */

"use client";

import Image from "next/image";
import styled, { css } from "styled-components";
import primaryLogo from "../../public/Logos/new-logo.png";
import profileIcon from "../../public/Icons/profile-icon.svg";
import CustomButton from "./CustomButton";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useUser } from "@/utils/UserContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import CustomInput from "./CustomInput";
import { clearUser } from "@/config/slices/authSlice";
import { useDispatch } from "react-redux";

const MENU_ITEMS = [
  "Home",
  "accelerator",
  "Innovation Consulting ",
  "Investments",
  "about us",
  "contact us",
];

export default function HeaderNew({ ml, setContentLoader = () => {} }) {
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
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

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
      if (!e.target.closest(".profile-dropdown-wrapper")) {
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
    <HeaderWrapper $ml={ml}>
      <LeftContainer>
        <LogoContainer>
          <Link href={`${user_id ? "/profile" : "/"}`}>
            <Image src={primaryLogo} alt="Logo" />
          </Link>
        </LogoContainer>
        {/* <MenuButton>
          {MENU_ITEMS.map((item) => (
            <CustomButton
              key={item}
              type="link"
              btnText={item}
              onClick={() => setActiveMenu(item)}
              isSelected={activeMenu === item}
            />
          ))}
        </MenuButton> */}
        <NavMenu id="header-primary-menu">
          <ul className="header__menu1 homemenu">
            <li className="header__menu-item">
              <a href="https://brigadereap.com/">HOME</a>
            </li>

            <li className="header__menu-item dropdown-menu">
              <div className="dropdown-trigger">
                <a
                  href="javascript:void(0);"
                  onClick={() => {
                    console.log("click working here");
                    setActiveMobileDropdown(
                      activeMobileDropdown === "accelerator"
                        ? null
                        : "accelerator"
                    );
                  }}
                >
                  ACCELERATOR test
                </a>
                {console.log(activeMobileDropdown, "testing here")}
                <DropdownContent open={activeMobileDropdown === "accelerator"}>
                  <a
                    className="options"
                    href="https://brigadereap.com/programme"
                  >
                    PROGRAMME
                  </a>
                  <a
                    className="options"
                    href="https://brigadereap.com/portfolio"
                  >
                    PORTFOLIO
                  </a>
                </DropdownContent>
              </div>
            </li>

            <li className="header__menu-item">
              <a href="https://brigadereap.com/innovation-consulting">
                Innovation Consulting
              </a>
            </li>
            <li className="header__menu-item">
              <a href="https://brigadereap.com/investments">INVESTMENTS</a>
            </li>

            <li className="header__menu-item dropdown-menu">
              <div className="dropdown-trigger">
                <a
                  href="javascript:void(0);"
                  onClick={() =>
                    setActiveMobileDropdown(
                      activeMobileDropdown === "about" ? null : "about"
                    )
                  }
                >
                  ABOUT US
                </a>

                <DropdownContent open={activeMobileDropdown === "about"}>
                  <a className="options" href="https://brigadereap.com/events">
                    Event
                  </a>
                  <a
                    className="options"
                    href="https://brigadereap.com/insights"
                  >
                    INSIGHTS
                  </a>
                  <a className="options" href="https://brigadereap.com/team">
                    TEAM
                  </a>
                  <a
                    className="options"
                    href="https://brigadereap.com/reap-portfolio"
                  >
                    REAP PORTFOLIO
                  </a>
                </DropdownContent>
              </div>
            </li>

            <li className="header__menu-item">
              <a href="https://brigadereap.com/contact-us">CONTACT US</a>
            </li>
            <li className="header__menu-item">
              <a href="https://brigadereap.com/market-access"></a>
            </li>
          </ul>
        </NavMenu>
      </LeftContainer>
      <RightContainer>
        {isLoginPage ? null : user_id ? (
          <>
            {/* <div className="profile-dropdown-wrapper">
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
            </div> */}
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
      </RightContainer>
      {showSearchInput && (
        <div className="inputContainer responsiveInputContainer">
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
      <Flex>
        {isLoginPage
          ? null
          : user_id &&
            !mobileOpen && (
              <div className="profile-dropdown-wrapper" open={mobileOpen}>
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
            )}
        <NavButton
          onClick={() => setMobileOpen(!mobileOpen)}
          name="nav-button"
          open={mobileOpen}
        >
          <Bar open={mobileOpen} />
        </NavButton>
      </Flex>

      <MobileBackground open={mobileOpen}>
        <ResponsiveButton>
          {MENU_ITEMS.map((item) => (
            <CustomButton
              style={{ textTransform: "uppercase" }}
              key={item}
              type="link"
              btnText={item}
              onClick={() => {
                setActiveMenu(item);
              }}
              isSelected={activeMenu === item}
            />
          ))}

          <div className="responsiveButtonContainer">
            {isLoginPage ? null : user_id ? (
              <></>
            ) : (
              <>
                <CustomButton
                  type="secondary"
                  btnText="Register"
                  height="37px"
                  responsiveWidth={"200px"}
                  onClick={() => goToLogin("signup")}
                />
                <CustomButton
                  type="primary"
                  btnText="Login"
                  height="37px"
                  width="92px"
                  fontSize="0.875rem"
                  borderRadius="2px"
                  responsiveWidth={"200px"}
                  onClick={() => goToLogin("signin")}
                />
              </>
            )}
          </div>
        </ResponsiveButton>
      </MobileBackground>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.875rem;
  width: 100%;
  max-height: 88px;
  margin-left: ${({ $ml }) => $ml || "0"};
  background: transparent linear-gradient(180deg, #312c2c 0%, #000000 100%) 0%
    0% no-repeat padding-box;
  padding: 0.9375rem 2.0625rem;

  @media (max-width: 950px) {
    padding: 0.9375rem 1.625rem 1.1875rem 1.625rem;
    gap: 1rem;
  }

  .responsiveInputContainer {
    display: none;

    @media (max-width: 950px) {
      display: flex;
      width: 100%;
      justify-content: flex-end;
    }
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3.875rem;
`;

const LogoContainer = styled.div`
  max-width: 91px;
  width: 100%;
  cursor: pointer;
  img {
    width: 91px;
    height: 54px;
  }
`;

const MenuButton = styled.div`
  display: flex;
  gap: 3.3125rem;

  /* @media (max-width: 1023px) {
    gap: 1.875rem;
  } */
  @media (max-width: 1100px) {
    gap: 1.625rem;
  }
  @media (max-width: 950px) {
    display: none;
  }
`;

const RightContainer = styled.div`
  display: flex;
  gap: 0.875rem;
  width: 100%;
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
const NavButton = styled.button`
  background: transparent;
  border: none;
  width: 20px;
  height: 17px;
  position: relative;
  display: block;
  cursor: pointer;
  // margin-right: ${($open) => ($open ? "20px" : "0")};
  ${({ open }) =>
    open &&
    css`
      margin-right: 16px;
    `}

  @media (min-width: 951px) {
    display: none;
  }
`;

const Bar = styled.span`
  display: block;
  background: #ffc20e;
  height: 3px;
  border-radius: 4px;
  width: 20px;
  position: relative;
  transition: background 0.3s;

  ${({ open }) =>
    open &&
    css`
      background: rgba(255, 255, 255, 0);
      margin-right: 20px;
    `}

  &::before,
  &::after {
    content: "";
    background: #ffc20e;
    height: 3px;
    width: 30px;
    border-radius: 4px;
    position: absolute;
    left: 0;
    transition: all 0.3s ease;
  }

  &::before {
    bottom: 7px;
    ${({ open }) =>
      open &&
      css`
        bottom: 0;
        transform: rotate(-45deg);
      `}
  }

  &::after {
    top: 7px;
    ${({ open }) =>
      open &&
      css`
        top: 0;
        transform: rotate(45deg);
      `}
  }
`;

const MobileBackground = styled.div`
  @media (max-width: 950px) {
    background: #000;
    position: fixed;
    top: 88px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    display: ${({ open }) => (open ? "block" : "none")};
    z-index: 3;
  }

  @media (min-width: 951px) {
    display: none;
  }
`;

const ResponsiveButton = styled.div`
  display: flex;
  gap: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media (max-width: 425px) {
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1.25rem;
    gap: 20px;
  }

  .responsiveButtonContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;

    @media (min-width: 426px) {
      align-items: center;
    }
  }
`;

const ProfileImage = styled(Image)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
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

const DropdownContent = styled.div`
  position: absolute;
  top: 108%;
  left: 0;
  background: #ffc20e;
  flex-direction: column;
  padding: 0.5rem;
  z-index: 99;
  width: 165px;
  display: flex;

  // Controlled visibility based on prop
  max-height: ${({ open }) => (open ? "500px" : "0")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-10px)")};
  transition: all 0.3s ease-in-out;

  .options {
    color: #000 !important;
    padding: 0.25rem 0;
    font-weight: 500 !important;
    white-space: nowrap;

    &:hover {
      color: #fff !important;
    }
  }
  .header__menu-item.dropdown-menu .dropdown-trigger:hover ${DropdownContent} {
    max-height: 500px;
    opacity: 1;
    transform: translateY(0);
  }
`;

const NavMenu = styled.nav`
  flex-grow: 1;
  @media (max-width: 950px) {
    display: none;
  }
  ul {
    list-style: none;
    display: flex;
    gap: 1rem;
    @media (max-width: 1300px) {
      gap: 0rem;
    }

    .header__menu-item {
      padding: 1.75rem 0.938rem;
      width: max-content;

      a {
        color: #fff;
        text-decoration: none;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.875rem;
        &:hover {
          color: #ffc20e;
        }
        @media (max-width: 1300px) {
          font-size: 0.813rem;
        }
      }
    }
    .dropdown-menu {
      position: relative;
    }
  }
  .header__menu-item.dropdown-menu .dropdown-trigger:hover ${DropdownContent} {
    max-height: 500px;
    opacity: 1;
    transform: translateY(0);
  }
`;
