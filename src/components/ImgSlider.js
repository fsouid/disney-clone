import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ImgSlider = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <Carousel {...settings}>
      <Wrap>
        <a
          href="/assets/slider-badging.jpg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assets/slider-badging.jpg" alt="slider-badging" />
        </a>
      </Wrap>
      <Wrap>
        <a
          href="/assets/slider-badag.jpg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assets/slider-badag.jpg" alt="slider-badag" />
        </a>
      </Wrap>
      <Wrap>
        <a
          href="/assets/slider-scale.jpg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assets/slider-scale.jpg" alt="slider-scale" />
        </a>
      </Wrap>
      <Wrap>
        <a
          href="/assets/slider-scales.jpg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assets/slider-scales.jpg" alt="slider-scales" />
        </a>
      </Wrap>
    </Carousel>
  );
};

const Carousel = styled(Slider)`
  margin-top: 20px;

  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;
    transition: opacity 0.3s ease 0s;

    &:hover {
      opacity: 1;
    }
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
  }

  .slick-next {
    right: -75px;
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  a {
    border-radius: 4px;
    box-shadow:
      rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;

    img {
      width: 100%;
      height: 100%;
    }

    &:hover {
      padding: 0;
      border: 4px solid rgba(249, 249, 249, 0.8);
    }
  }
`;

export default ImgSlider;
