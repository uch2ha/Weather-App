import React, { useEffect, useState } from 'react';
import { MdMyLocation } from 'react-icons/md';
import ErrorMessages from '../errorMessages/ErrorMessages';
import ScrollableCityCards from '../scrollableCityCards/ScrollableCityCards';
import './MainPage.css';

const MainPage = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [cityName, setCityName] = useState('');
  const [otherError, setOtherError] = useState(false);
  const [duplicateCitiesError, setDuplicateCitiesError] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  let preventManyTimeCallLocationFn = 0; // don't let u call fn "setCityWeatherDataByCityLocation()" more than 1 time per fetch

  // LocalStorage functionality
  // when u load the page the first time, check local storage for saved items
  useEffect(() => {
    if (firstLoad) {
      const item = localStorage.getItem('weather_data_ds_eficode');
      if (item !== undefined) {
        setWeatherData(JSON.parse(item));
      }
      setFirstLoad(false);
    }
  }, []);

  // every time (but not in the first load) when an item is removed or added to weatherData, updates local storage
  useEffect(() => {
    if (!firstLoad) {
      localStorage.setItem(
        'weather_data_ds_eficode',
        JSON.stringify(weatherData)
      );
    }
  }, [weatherData]);

  // fetch weather data from backend by city name
  const getWeatherDataFromAPIbyCityname = (city) => {
    return fetch(`http://localhost:9000/api/weatherbycity?city=${city}`)
      .then((response) => response.json())
      .then((responseData) => {
        // if city noy found throw an error
        if (Object.keys(responseData).length === 0) {
          setOtherError(true);
          setCityName('');
          return false;
        }
        setOtherError(false);
        return responseData;
      })
      .catch(() => {
        setCityName('');
        setOtherError(true);
      });
  };

  // fetch weather data from backend by location
  const getWeatherDataFromAPIbyLocation = (lon, lat) => {
    return fetch(
      `http://localhost:9000/api/weatherbycoordinates?lon=${lon}&lat=${lat}`
    )
      .then((response) => response.json())
      .then((responseData) => {
        setOtherError(false);
        return responseData;
      })
      .catch(() => setOtherError(true));
  };

  // update weather data with new city information
  const addCityInfoToWeatherData = (weatherInfo) => {
    setWeatherData((prev) => {
      // checking to avoid application errors
      if (prev === undefined || prev === null) {
        return [weatherInfo];
      }
      return [...prev, weatherInfo];
    });
  };

  // checks for the presence of the city in the weather data
  const checkWeatherDataAboutCityDuplicates = (city) => {
    let check_for_duplicate = false;
    setDuplicateCitiesError(false);
    weatherData?.forEach((item) => {
      if (item.name.toLowerCase() === city.toLowerCase()) {
        setDuplicateCitiesError(true);
        check_for_duplicate = true;
        setCityName('');
      }
    });
    return check_for_duplicate;
  };

  // trying to add new data by city name
  // if it is not already present in the weather data
  const setCityWeatherDataByCityName = async (city) => {
    if (!checkWeatherDataAboutCityDuplicates(city)) {
      const cityData = await getWeatherDataFromAPIbyCityname(city);
      if (cityData) {
        await addCityInfoToWeatherData(cityData);
        setCityName('');
      }
    }
  };

  // trying to add new data by city location
  // if it is not already present in the weather data
  const setCityWeatherDataByCityLocation = () => {
    preventManyTimeCallLocationFn += 1;

    // don't let u call fn "setCityWeatherDataByCityLocation()" more than 1 time per fetch
    if (preventManyTimeCallLocationFn !== 1) {
      return;
    }
    // get my geolocation
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;

      // fetch weather data from API and add it to the weather data
      // if it is not already present in the weather data
      await getWeatherDataFromAPIbyLocation(lon, lat).then((cityData) => {
        if (!checkWeatherDataAboutCityDuplicates(cityData.name)) {
          addCityInfoToWeatherData(cityData);
        }
      });

      // update value for the possibility use this Fn next time
      await setTimeout(() => {
        preventManyTimeCallLocationFn = 0;
      }, 0);
    });
  };

  const deleteCityFromData = (id) => {
    const newCityList = weatherData.filter((city) => city.id !== id);
    setWeatherData(newCityList);
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
          onChange={(e) => setCityName(e.target.value)}
          placeholder='Enter the city name'
          onKeyDown={(e) =>
            e.key === 'Enter' && setCityWeatherDataByCityName(cityName)
          }
        />
        <div className='btn-container'>
          <button
            className='btn-search'
            onClick={() => setCityWeatherDataByCityName(cityName)}
          >
            Search
          </button>
          <button
            className='btn-location'
            data-testid='t_geolocation_btn'
            onClick={() => setCityWeatherDataByCityLocation()}
          >
            <MdMyLocation size={30} />
          </button>
        </div>
      </div>
      {/* scrollable city cards component */}
      {weatherData?.length > 0 && (
        <ScrollableCityCards
          data={weatherData}
          deleteCityFromData={deleteCityFromData}
        />
      )}
    </div>
  );
};

export default MainPage;
