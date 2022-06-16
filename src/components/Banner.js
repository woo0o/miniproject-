import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

// 이미지 삽입
import bannerImg from "../images/ff.jpg"
import bannerImg2 from "../images/gg.jpg"

import "swiper/css";
import "swiper/css/effect-fade";


const Banner = (props) => {
  const params = useLocation();

  if (params.pathname === "/") {
    return (
      <StyleBanner>
        <img className="banner-img" src={bannerImg2} alt="배너이미지" />
        <div className="banner-card" style={{ left: "5%" }} >
        </div>
      </StyleBanner >
    );
  } else {
    return (
      <StyleBanner type={"sub"} >
        <img className="banner-img" src={bannerImg} alt="배너이미지" />
        <div className="banner-card" style={{ left: "5%" }} >
        </div>
      </StyleBanner >
    );
  }
};
const StyleBanner = styled.div`
  margin-top: ${(props) => (props.type === "sub" ? "9.1rem;" : ";")};
  position: relative;
  overflow: hidden;
  max-height: ${(props) => (props.type === "sub" ? "40vw;" : "50vw;")};
  text-align: center;

  // 그림을 위로 땡겨 보여준다
  .banner-img {
    transform: translateY(-20%);
    
  }

  .banner-card {
    position: absolute;
    top: 35%;
    left: 10%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    transition: 0.2s;
    span {
      font-weight: 900;
      text-align: left;
      color: #ffffff;
      &:first-child {
        font-size: 4.2rem;
      }
      &:last-child {
        padding-left: 4rem;
        font-size: 3.2rem;
      }
    }
    span + span {
      margin-top: 2rem;
    }
  }
`;

export default Banner;
