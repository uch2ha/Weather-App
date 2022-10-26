import React, { useEffect, useState } from 'react';
import ErrorMessages from '../errorMessages/ErrorMessages';
import ScrollableCityCards from '../scrollableCityCards/ScrollableCityCards';
import './MainPage.css';

const MainPage = () => {
  const [data, setData] = useState([]);
  const [cityName, setCityName] = useState('');
  const [locationKeyError, setLocationKeyError] = useState(false);
  const [otherError, setOtherError] = useState(false);
  const [duplicateCitiesError, setDuplicateCitiesError] = useState(false);

  // const getLocationKeyFromAPI = () => {
  //   return fetch(LOCATION_KEY_API + '?apikey=' + API_KEY + '&q=' + cityName)
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       setLocationKeyError(false);
  //       return responseData[0].Key;
  //     })
  //     .catch(() => setLocationKeyError(true));
  // };

  const getWeatherDataFromAPIbyCityname = (city) => {
    return fetch('http://localhost:9000/api/weatherbycity?city=' + city)
      .then((response) => response.json())
      .then((responseData) => {
        setLocationKeyError(false);
        return responseData;
      })
      .catch(() => setLocationKeyError(true));
  };

  const setCityWeatherData = async () => {
    // let locationKey = await getLocationKeyFromAPI();
    data?.forEach((city) => {
      if (city.City === cityName) {
        // locationKey = undefined; // don't let add duplicates cities
        setDuplicateCitiesError(true);
        setCityName('');
      }
    });
    if (!duplicateCitiesError) {
      let cityData = '';

      cityData = await getWeatherDataFromAPIbyCityname(cityName);

      if (cityData) {
        setData((prev) => {
          if (prev === undefined || prev === null) {
            return [cityData];
          }
          return [...prev, cityData];
        });
        setCityName('');
      }
    }
  };
  const deleteCityFromData = (id) => {
    const newCityList = data.filter((city) => city.id !== id);
    setData(newCityList);
  };

  return (
    <div className='main-container'>
      <ErrorMessages
        otherError={otherError}
        locationKeyError={locationKeyError}
        duplicateCitiesError={duplicateCitiesError}
      />
      <div className='search-bar'>
        <input
          className='input-field'
          value={cityName}
          onChange={(e) => setCityName(e.target.value.toLowerCase())}
          placeholder='Enter the city name'
          onKeyDown={(e) => e.key === 'Enter' && setCityWeatherData()}
        />
        <button className='btn-search' onClick={() => setCityWeatherData()}>
          Search
        </button>
      </div>
      {data?.length > 0 && (
        <ScrollableCityCards
          data={data}
          deleteCityFromData={deleteCityFromData}
        />
      )}
    </div>
  );
};

export default MainPage;
