import React, { useEffect, useState } from 'react';
import ErrorMessages from '../errorMessages/ErrorMessages';
import ScrollableCityCards from '../scrollableCityCards/ScrollableCityCards';
import './MainPage.css';

const MainPage = () => {
  const [data, setData] = useState([]);
  const [cityName, setCityName] = useState('');
  const [otherError, setOtherError] = useState(false);
  const [duplicateCitiesError, setDuplicateCitiesError] = useState(false);

  // fetch weather data from backend
  const getWeatherDataFromAPIbyCityname = (city) => {
    return fetch(`http://localhost:9000/api/weatherbycity?city=${city}`)
      .then((response) => response.json())
      .then((responseData) => {
        setOtherError(false);
        return responseData;
      })
      .catch(() => setOtherError(true));
  };

  // update weather data
  const setCityWeatherData = async () => {
    let check_for_duplicate = false;
    setDuplicateCitiesError(false);

    // checks if a city with the same name has already been added
    data?.map((city) => {
      if (city.name.toLowerCase() === cityName) {
        setDuplicateCitiesError(true);
        check_for_duplicate = true;
        setCityName('');
      }
    });

    if (!check_for_duplicate) {
      let cityData = '';

      cityData = await getWeatherDataFromAPIbyCityname(cityName);

      if (cityData) {
        setData((prev) => {
          // checking to avoid application errors
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
      {/* component with error messages */}
      <ErrorMessages
        otherError={otherError}
        duplicateCitiesError={duplicateCitiesError}
      />
      {/* search bar  */}
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
      {/* scrollable city cards component */}
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
