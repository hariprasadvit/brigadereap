/** @format */

import styled from "styled-components";

const FooterWrapper = styled.div`
  padding: 2rem;
  background: transparent linear-gradient(180deg, #3c3c3c 0%, #000000 100%) 0%
    0% no-repeat padding-box;

  color: #fff;
  @media screen and (max-width: 1599px) {
    padding: 40px 60px;
  }
  @media screen and (max-width: 1216px) {
    padding: 30px;
  }
`;

const Columns = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media screen and (max-width: 1216px) {
    display: block;
  }
`;

const Column = styled.div`
  width: 240px;
  flex: 0 0 240px;
  @media screen and (max-width: 1216px) {
    width: 100%;
    flex: 0 0 100%;
    margin-bottom: 30px;
  }
`;
const ColumnRight = styled.div`
  width: calc(100% - 240px);
  flex: 0 0 calc(100% - 240px);
  @media screen and (max-width: 1216px) {
    width: 100%;
    flex: 0 0 100%;
    margin-bottom: 0px;
  }
`;

const FooterLogo = styled.div`
  max-width: 120px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const FooterMenu = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const MenuItem = styled.li``;

const MenuLink = styled.a`
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.75rem;
  &:hover {
    color: ${({ theme }) => theme.colors.primaryYellow};
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  a img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const FooterItem = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  &.signup-form-and-brochure {
    padding: 20px 0;
    margin: 20px 0;
    border-top: 1px solid #535353;
    border-bottom: 1px solid #535353;
  }
  @media screen and (max-width: 1216px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;
const SignUpForm = styled.form`
  display: flex;
  flex-wrap: wrap;

  input {
    padding: 11px 15px;
    border: 0;
    background-color: #505050;
    width: 220px;
    border-radius: 0;
    color: #fff;
    font-weight: 500;
    font-size: 14px;
    font-family: Montserrat;
    cursor: text;
  }

  button {
    background-color: #e47b3c;
    border: none;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const BrochureLink = styled.a`
  color: #e47b3c;
  margin-top: 1rem;
  display: inline-block;
  text-transform: uppercase;
  font-size: 0.875rem;
  @media screen and (max-width: 1216px) {
    margin-top: 0rem;
  }
`;

const TermsList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0;
`;
const TermsMenuLink = styled.a`
  color: #898989;
  text-transform: uppercase;
  font-size: 0.75rem;
  &:hover {
    color: #ffc20e;
  }
`;

const Copyright = styled.div`
  font-size: 0.875rem;
  margin-top: 1rem;
  color: #898989;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <Columns>
        <Column>
          <FooterLogo>
            <img
              src="https://brigadereap.com/resources/assets/images/logo-white.svg"
              alt="Logo"
            />
          </FooterLogo>
        </Column>

        <ColumnRight>
          <FooterItem>
            <FooterMenu>
              <MenuItem>
                <MenuLink href="/">HOME</MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink href="https://brigadereap.com/programme">
                  ACCELERATOR
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink href="https://brigadereap.com/innovation-consulting">
                  Innovation Consulting
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink href="https://brigadereap.com/investments">
                  INVESTMENTS
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink href="https://brigadereap.com/team">
                  ABOUT US
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink href="https://brigadereap.com/contact-us">
                  CONTACT US
                </MenuLink>
              </MenuItem>
            </FooterMenu>

            <SocialIcons>
              <a
                href="https://www.linkedin.com/company/brigade-real-estate-accelerator-program-reap-/"
                target="_blank"
              >
                <img
                  src="https://brigadereap.com/resources/assets/images/icons/linkedin.svg"
                  alt="LinkedIn"
                />
              </a>
              <a href="https://www.instagram.com/brigadereap/" target="_blank">
                <img
                  src="https://brigadereap.com/resources/assets/images/icons/instagram.svg"
                  alt="Instagram"
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UCWSZ5Lr8C11Gfrjj8vT7Wog"
                target="_blank"
              >
                <img
                  src="https://brigadereap.com/resources/assets/images/icons/youtube.svg"
                  alt="YouTube"
                />
              </a>
            </SocialIcons>
          </FooterItem>
          <FooterItem className="signup-form-and-brochure">
            <SignUpForm
              id="signupnewslatter"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                name="signupnewslatter-email"
                id="signupnewslatter-email"
                placeholder="Signup for newsletter"
                // required
              />
              <button
                type="submit"
                id="signupnewslatter-submit"
                name="submit"
                value="submit"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M23.7941 0.205977C23.5952 0.00703962 23.2968 -0.0541321 23.0358 0.0503052L0.442008 9.08769C0.183493 9.1911 0.0103837 9.43729 0.000446172 9.71558C-0.00944443 9.99383 0.145805 10.2517 0.396305 10.3732L9.30573 14.6942L13.6267 23.6036C13.7446 23.8466 13.9907 23.9999 14.2592 23.9999C14.2676 23.9999 14.276 23.9998 14.2844 23.9994C14.5626 23.9896 14.8088 23.8164 14.9122 23.5579L23.9497 0.964319C24.0541 0.703132 23.9929 0.404867 23.7941 0.205977ZM2.44188 9.80235L20.3774 2.62819L9.6886 13.3169L2.44188 9.80235ZM14.1976 21.5581L10.683 14.3112L21.3718 3.6225L14.1976 21.5581Z"
                    fill="white"
                  />
                </svg>
              </button>
            </SignUpForm>

            <BrochureLink
              href="https://brigadereap.com/XjFwJdPsFG/brigade-reap-brochure.pdf"
              target="_blank"
            >
              Download brochure
            </BrochureLink>
          </FooterItem>
          <TermsList>
            <MenuItem>
              <TermsMenuLink href="https://brigadereap.com/disclaimer">
                Disclaimer
              </TermsMenuLink>
            </MenuItem>
            <MenuItem>
              <TermsMenuLink href="https://brigadereap.com/privacy-policy">
                Privacy Policies
              </TermsMenuLink>
            </MenuItem>
            <MenuItem>
              <TermsMenuLink
              // href="#"
              >
                Site map
              </TermsMenuLink>
            </MenuItem>
          </TermsList>

          <Copyright>
            © 2025 All Rights Reserved by Brigade REAP. The content on this
            website is the exclusive property of Brigade REAP.
          </Copyright>
        </ColumnRight>
      </Columns>
    </FooterWrapper>
  );
}
