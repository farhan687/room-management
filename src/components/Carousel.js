import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CardMedia } from 'material-ui/Card';
import config from '../config';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

const Carousel = ({ images }) => (
  <Slider {...settings}>
    {
      images.map(image => (
        <div key={image}>
          <CardMedia
            style={{ height: '300px' }}
            image={config.baseURL + image}
            title={image}
          />
        </div>
      ))
    }
  </Slider>
);

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
};

export default Carousel;
