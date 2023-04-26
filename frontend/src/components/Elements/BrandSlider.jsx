import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
// Assets
import BrandLogo01 from "../../assets/img/brands/audi.svg"
import BrandLogo02 from "../../assets/img/brands/bmw.svg";
import BrandLogo03 from "../../assets/img/brands/citroen.svg";
import BrandLogo04 from "../../assets/img/brands/dacia.svg";
import BrandLogo05 from "../../assets/img/brands/fiat.svg";
import BrandLogo06 from "../../assets/img/brands/ford.svg";
import BrandLogo07 from "../../assets/img/brands/kia.svg";
import BrandLogo08 from "../../assets/img/brands/mercedes.svg";
import BrandLogo09 from "../../assets/img/brands/opel.svg";
import BrandLogo10 from "../../assets/img/brands/skoda.svg";
import BrandLogo11 from "../../assets/img/brands/suzuki.svg";
import BrandLogo12 from "../../assets/img/brands/toyota.svg";

export default function BrandSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        <LogoWrapper className="flexCenter">
          <ImgStyle src={BrandLogo01} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <ImgStyle src={BrandLogo02} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <ImgStyle src={BrandLogo03} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <ImgStyle src={BrandLogo04} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <ImgStyle src={BrandLogo05} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <ImgStyle src={BrandLogo06} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <ImgStyle src={BrandLogo07} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <ImgStyle src={BrandLogo08} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <ImgStyle src={BrandLogo09} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <ImgStyle src={BrandLogo10} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <ImgStyle src={BrandLogo11} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <ImgStyle src={BrandLogo12} alt="client logo" />
        </LogoWrapper>
      </Slider>
    </div>
  );
}

const LogoWrapper = styled.div`
  width: 100%;
  height: 100px;
  cursor: pointer;
  :focus-visible {
    outline: none;
    border: 0px;
  }
`;
const ImgStyle = styled.img`
  width: 100%;
  height: 100%;
  padding: 10%;
`;