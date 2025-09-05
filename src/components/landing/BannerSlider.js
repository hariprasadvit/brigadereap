/** @format */

"use client";

import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

const SliderWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 1rem 0;

  .slick-list {
    overflow: visible;
  }

  .slick-slide {
    opacity: 0.4;
    transform: scale(0.85);
    transition: transform 0.3s ease, opacity 0.3s ease;
    padding: 0 10px;
  }

  .slick-center {
    transform: scale(1);
    opacity: 1;
    z-index: 2;
  }

  .slide-box {
    width: 100%;
    height: 220px;
    position: relative;
    border-radius: 0px;
    overflow: hidden;
  }

  .slick-dots {
    bottom: -40px;

    li {
      margin: 0 4px;
    }

    button {
      width: 22px;
      height: 7px;
      padding: 0;
      background-color: grey;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    li.slick-active button {
      background-color: #de793b;
    }
    li button:before {
      display: none;
    }
  }

  @media (max-width: 800px) {
    .slide-box {
      height: 200px;
    }
    .slick-dots {
      bottom: -50px;
    }
  }
  @media (max-width: 550px) {
    padding: 1rem 0 2rem 0;

    .slide-box {
      height: 180px;
    }
    .slick-slide {
      padding: 0;
    }
    .slick-dots {
      bottom: -40px;
    }
    button {
      height: 5px;
    }
  }
`;

const CenterSlider = ({ images = [] }) => {
  const settings = {
    centerMode: true,
    centerPadding: "25%", // this gives ~70% center, 15% each side peeking
    slidesToShow: 1,
    speed: 500,
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000, // 2000ms = 2 seconds between slides

    responsive: [
      {
        breakpoint: 800,
        settings: {
          centerPadding: "10%",
        },
      },
      {
        breakpoint: 550,
        settings: {
          centerPadding: "15px",
        },
      },
    ],
  };

  return (
    <SliderWrapper>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <div className="slide-box">
              <Image
                src={src.image_url}
                alt={`Slide ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        ))}
      </Slider>
    </SliderWrapper>
  );
};

export default CenterSlider;
