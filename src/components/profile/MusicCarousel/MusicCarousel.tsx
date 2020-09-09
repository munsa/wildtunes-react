import React, {useEffect} from 'react';
import './MusicCarousel.css';
import Carousel from 'react-multi-carousel';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'react-multi-carousel/lib/styles.css';
import getArtistsString from '../../../shared/utils/StringUtils'
import RecordingCard from '../../song/RecordingCard/RecordingCard';

const MusicCarousel = ({recordings}) => {
  return (
    <div className='carousel-container'>
      <Carousel
        additionalTransfrom={0}
        arrows
        centerMode={true}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={true}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 3,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
          }
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {recordings.map((r, j) => (
          <div key={j}>
            <RecordingCard recording={r}/>
          </div>
        ))}
      </Carousel>
    </div>
  )
};

MusicCarousel.propTypes = {
};


export default MusicCarousel;
