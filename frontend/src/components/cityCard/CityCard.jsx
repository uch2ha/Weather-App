import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import './CityCard.css';

const CityCard = ({ city, main, weather, wind, deleteCity, id }) => {
  const [isMoreInfo, setIsMoreInfo] = useState(true);

  const fromFtoC = (F) => {
    return (((F - 32) * 5) / 9).toFixed(0);
  };

  const icon = '02';

  return (
    <div className='card-container'>
      <div
        className={['flipped-container', isMoreInfo ? 'front' : 'back'].join(
          ' '
        )}
        onClick={() => setIsMoreInfo((prev) => !prev)}
      >
        <div className='city-name'>
          <p>{city}</p>
        </div>
        <div className='info-container'>
          {isMoreInfo ? (
            <>
              <p className='info-item'>{main.temp.toFixed(0)}° C</p>
              <p className='info-item'>{main.pressure}° C</p>

              <div className='img-container'>
                <img
                  className='img'
                  alt='weather_icon'
                  src={require(`../../public/img/${icon}.svg`)}
                />
              </div>

              <p className='description'>{weather[0].description}</p>
            </>
          ) : (
            <>
              <p className='info-item'>Min {main.temp_min.toFixed(0)}° C</p>
              <p className='info-item'>Max {main.temp_max.toFixed(0)}° C</p>
              <p className='info-item'>Humidity {main.humidity}</p>
              <p className='info-item last'>Wind {wind.speed} m/s</p>
            </>
          )}
        </div>
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
