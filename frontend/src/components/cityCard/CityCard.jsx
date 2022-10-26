import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import './CityCard.css';

const CityCard = ({ city, main, weather, deleteCity, id }) => {
  const [isDayData, setIsDayData] = useState(true);

  const fromFtoC = (F) => {
    return (((F - 32) * 5) / 9).toFixed(0);
  };

  const icon = '02';

  return (
    <div className='card-container'>
      <div
        className={['flipped-container', isDayData ? 'day' : 'night'].join(' ')}
        onClick={() => setIsDayData((prev) => !prev)}
      >
        <p className='city-name'>{city}</p>
        {isDayData ? (
          <p className='day-night-title'>Day</p>
        ) : (
          <p className='day-night-title'>Night</p>
        )}
        {isDayData ? (
          <p className='temperature'>{main.temp_max}° C</p>
        ) : (
          <p className='temperature'>{main.temp_min}° C</p>
        )}

        <div className='img-container'>
          <img
            className='img'
            alt='weather_icon'
            src={require(`../../public/img/${icon}.svg`)}
          />
        </div>

        <p className='description'>{weather.description}</p>
      </div>
      <button className='btn-delete' onClick={() => deleteCity(id)}>
        <div className='btn-div'>
          <MdClose color='white' />
        </div>
      </button>
    </div>
  );
};

export default CityCard;
