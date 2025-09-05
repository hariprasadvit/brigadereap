import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import leftArrow from "../../../public/Icons/leftArrow.svg";
import rightArrow from "../../../public/Icons/rightArrow.svg";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function TestimonialCard({
  testimonialPaddingTop,
  sliderItems,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  return (
    <Wrapper style={{ paddingTop: testimonialPaddingTop }}>
      <div className="testimonialTitle">Testimonials</div>
      <Container>
        <ClientSlider>
          <Slider ref={sliderRef} {...settings}>
            {sliderItems.map((item, index) => (
              <TestimonialItem key={index}>
                <div className="testimonialDetails">
                  <Desc>{item.desc}</Desc>
                  <ProfileData>
                    <Image src={item.image} alt="client" />
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.position}</span>
                    </div>
                  </ProfileData>
                </div>
              </TestimonialItem>
            ))}
          </Slider>

          <div className="hideAtResponsive">
            <ArrowControlBar>
              <Arrow onClick={() => sliderRef.current?.slickPrev()}>
                <Image src={leftArrow} alt="Previous" />
              </Arrow>
              <SlideCount>
                {(currentSlide + 1).toString().padStart(2, "0")}/
                {sliderItems.length.toString().padStart(2, "0")}
              </SlideCount>
              <Arrow onClick={() => sliderRef.current?.slickNext()}>
                <Image src={rightArrow} alt="Next" />
              </Arrow>
            </ArrowControlBar>
          </div>
        </ClientSlider>
      </Container>
      <div className="showAtResponsive">
        <ArrowControlBar>
          <Arrow onClick={() => sliderRef.current?.slickPrev()}>
            <Image src={leftArrow} alt="Previous" />
          </Arrow>
          <SlideCount>
            {(currentSlide + 1).toString().padStart(2, "0")}/
            {sliderItems.length.toString().padStart(2, "0")}
          </SlideCount>
          <Arrow onClick={() => sliderRef.current?.slickNext()}>
            <Image src={rightArrow} alt="Next" />
          </Arrow>
        </ArrowControlBar>
      </div>
    </Wrapper>
  );
}

// Styled Components
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 0 2.875rem 1.678125rem;
  color: ${({ theme }) => theme.colors.font.body};
  position: relative;

  @media (max-width: 1023px) {
    padding: 0 2.3125rem 2.5625rem;
  }
  @media (max-width: 600px) {
    padding: 0 1.625rem;
  }
  @media (max-width: 425px) {
    gap: 40px;
  }
  @media (max-width: 330px) {
    padding: 0 1rem;
  }

  .showAtResponsive {
    display: none;
    @media (max-width: 768px) {
      display: block;
    }
  }

  .testimonialTitle {
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
    line-height: 28px;
    font-weight: 600;
  }

  .slick-arrow {
    display: none !important;
  }
`;

const Container = styled.div`
  background: #f7f7f7;
  padding: 2.75rem 3.1875rem 2.0625rem 3.0625rem;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 500px) {
    padding: 1.625rem;
  }
  @media (max-width: 330px) {
    padding: 1rem;
  }
`;

const ClientSlider = styled.div`
  position: relative;
  margin-left: 0.03125rem;

  .hideAtResponsive {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const TestimonialItem = styled.div`
  .testimonialDetails {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Desc = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 32px;
  font-weight: 600;
  margin-bottom: 1.3125rem;

  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 23px;
  }
  @media (max-width: 425px) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const ProfileData = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 425px) {
    gap: 10px;
  }

  img {
    max-width: 55px;
    width: 100%;
    height: auto;
    max-height: 55px;

    @media (max-width: 425px) {
      max-width: 50px;
      max-height: 50px;
    }
  }

  div {
    strong {
      display: block;
      font-size: ${({ theme }) => theme.fontSizes.xxxl};
      line-height: 28px;
      font-weight: 600;

      @media (max-width: 600px) {
        font-size: ${({ theme }) => theme.fontSizes.lg};
        line-height: 23px;
      }
      @media (max-width: 425px) {
        font-size: ${({ theme }) => theme.fontSizes.base};
        line-height: 18px;
      }
    }
    span {
      display: block;
      font-size: ${({ theme }) => theme.fontSizes.base};
      line-height: 20px;
      font-weight: 300;

      @media (max-width: 600px) {
        font-size: ${({ theme }) => theme.fontSizes.sm};
        line-height: 18px;
      }

      @media (max-width: 425px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
        line-height: 16px;
      }
    }
  }
`;

const Arrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  width: 81px;
  height: 46px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.border.teritary};

  @media (max-width: 1023px) {
    width: 60px;
    height: 35px;
  }
  @media (max-width: 768px) {
    width: 46px;
    height: 24px;
  }
  @media (max-width: 425px) {
    width: 35px;
    height: 24px;
  }

  img {
    width: 24px;
    height: 24px;
    transition: filter 0.3s ease;

    @media (max-width: 768px) {
      width: 14px;
      height: 14px;
    }
  }

  &:hover {
    background: #010104;
    border: 1px solid transparent;

    img {
      filter: brightness(0) invert(1);
    }
  }
`;

const ArrowControlBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  margin-top: 1.5rem;
  position: absolute;
  bottom: 0;
  right: 0;

  @media (max-width: 1023px) {
    gap: 5px;
  }
  @media (max-width: 768px) {
    top: 2px;
    bottom: unset;
    right: 40px;
    margin-top: unset;
  }
  @media (max-width: 600px) {
    right: 30px;
  }

  @media (max-width: 425px) {
    top: 33px;
    gap: 0;
  }
`;

const SlideCount = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.font.body};
  min-width: 50px;
  text-align: center;
  user-select: none;
  pointer-events: none;

  @media (max-width: 425px) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;
