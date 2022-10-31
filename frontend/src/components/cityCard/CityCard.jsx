import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import './CityCard.css';

const CityCard = ({
  city,
  main,
  weather,
  wind,
  visibility,
  deleteCity,
  id,
}) => {
  //useState for card flip
  const [isFrontSide, setIsFrontSide] = useState(true);

  return (
    <div className='card-container'>
      {/* card flip container */}
      <div
        data-testid='t_flipped_container'
        className={['flipped-container', isFrontSide ? 'front' : 'back'].join(
          ' '
        )}
        onClick={() => setIsFrontSide((prev) => !prev)}
      >
        <div
          //if city name length is more than 9 make it smaller font-size
          className={['city-name', city.length >= 9 ? 'long-name' : ''].join(
            ' '
          )}
        >
          <p>{city}</p>
        </div>
        <div className='info-container'>
          {isFrontSide ? (
            // front side of card
            <>
              <p className='info-item first'>{main.temp.toFixed(0)}° C</p>
              <p className='info-item'>{main.pressure} Pa</p>

              <div className='img-container'>
                <img
                  className='img'
                  alt='weather_icon'
                  src={require(`../../public/img/${weather[0].icon.slice(
                    0,
                    2
                  )}.svg`)}
                />
              </div>

              <p className='description'>{weather[0].description}</p>
            </>
          ) : (
            // back side of card with more information
            <>
              <p className='info-item-back'>
                Min {main.temp_min.toFixed(0)}° C
              </p>
              <p className='info-item-back'>
                Max {main.temp_max.toFixed(0)}° C
              </p>
              <p className='info-item-back'>
                Feels like {main.feels_like.toFixed(0)}° C
              </p>
              <p className='info-item-back'>Humidity {main.humidity}%</p>
              <p className='info-item-back'>
                Visibility {visibility / 1000}/10 km
              </p>
              <p className='info-item-back last'>Wind {wind.speed} m/s</p>
            </>
          )}
        </div>
        {/* help text on the right side of the card */}
        <div className='help-text-container'>
          {isFrontSide ? (
            <p className='help-text-front'>Click for more information</p>
          ) : (
            <p className='help-text-back'>Click for less information</p>
          )}
        </div>
      </div>
      {/* btn for delete the city */}
      <button
        data-testid='t_btn_delete'
        className='btn-delete'
        onClick={() => deleteCity(id)}
      >
        <div className='btn-div'>
          <MdClose color='white' />
        </div>
      </button>
    </div>
  );
};

export default CityCard;
