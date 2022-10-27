import React from 'react';
import './ScrollableCityCards.css';
import CityCard from '../cityCard/CityCard';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const ScrollableCityCards = ({ data, deleteCityFromData }) => {
  // fn for scroll to left
  const slideLeft = () => {
    let slider = document.getElementById('scrollable');
    slider.scrollLeft = slider.scrollLeft - 400;
  };

  // fn for scroll to right
  const slideRight = () => {
    let slider = document.getElementById('scrollable');
    slider.scrollLeft = slider.scrollLeft + 400;
  };

  return (
    <div className='scrollable-container'>
      <MdChevronLeft className='arrow-btn' onClick={slideLeft} />
      <div id='scrollable' className='cities-cards-container'>
        {data?.map((city) => (
          <CityCard
            key={city?.id}
            city={city?.name}
            main={city?.main}
            weather={city?.weather}
            wind={city?.wind}
            visibility={city?.visibility}
            deleteCity={deleteCityFromData}
            id={city?.id}
          />
        ))}
      </div>
      <MdChevronRight className='arrow-btn' onClick={slideRight} />
    </div>
  );
};

export default ScrollableCityCards;
