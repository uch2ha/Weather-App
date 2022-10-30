import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MainPage from '../components/mainPage/MainPage';
import '@testing-library/jest-dom';

//! The fake data is slightly different from those received by API
//? API: weather.description: 'few clouds' and name: 'helsinki'
//? Fake Data: weather.description: 'Few Clouds' name: 'Helsinki'
const fakeData = {
  coord: {
    lon: 24.9355,
    lat: 60.1695,
  },
  weather: [
    {
      id: 801,
      main: 'Clouds',
      description: 'Few Clouds',
      icon: '02d',
    },
  ],
  base: 'stations',
  main: {
    temp: 5.36,
    feels_like: 1.28,
    temp_min: 4.69,
    temp_max: 6.13,
    pressure: 1010,
    humidity: 62,
  },
  visibility: 10000,
  wind: {
    speed: 6.17,
    deg: 310,
  },
  clouds: {
    all: 20,
  },
  dt: 1667130606,
  sys: {
    type: 2,
    id: 2011913,
    country: 'FI',
    sunrise: 1667108234,
    sunset: 1667140226,
  },
  timezone: 7200,
  id: 658225,
  name: 'Helsinki',
  cod: 200,
};
// replaces the fetch response with fake data
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(fakeData),
  })
);

describe('Integration tests', () => {
  // before each test cleans the local storage to avoid duplicates cities
  beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
  });

  it('Checking the presence of information on the main page', async () => {
    render(<MainPage />);

    const inputElement = screen.getByPlaceholderText(/Enter the city name/i);
    const searchBtn = screen.getByText(/Search/i);
    const geolocationBtn = screen.getByTestId('t_geolocation_btn');

    expect(inputElement).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(geolocationBtn).toBeInTheDocument();
  });

  it('Test input field functionality', async () => {
    render(<MainPage />);

    const searchBtn = screen.getByText(/Search/i);
    const inputElement = screen.getByPlaceholderText(/Enter the city name/i);
    expect(inputElement).toHaveTextContent('');

    // enter value in the input field
    fireEvent.change(inputElement, {
      target: { value: 'Helsinki' },
    });

    await waitFor(() => {
      expect(inputElement.value).toBe('Helsinki');
    });

    // click search button
    fireEvent.click(searchBtn);

    await waitFor(() => {
      expect(inputElement.value).toBe('');
    });
  });

  it('Checking the presence of information on the card front side', async () => {
    render(<MainPage />);
    const searchBtn = screen.getByText(/Search/i);
    // click the search btn to add Helsinki city from fake data
    fireEvent.click(searchBtn);

    const cityNameElement = await screen.findByText(fakeData.name);
    const pressureElement = await screen.findByText(
      `${fakeData.main.pressure} Pa`
    );
    const descriptionElement = await screen.findByText(
      fakeData.weather[0].description
    );

    expect(cityNameElement).toBeInTheDocument();
    expect(pressureElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it('Test the card flip functionality', async () => {
    render(<MainPage />);
    const searchBtn = screen.getByText(/Search/i);
    // click the search btn to add Helsinki city from fake data
    fireEvent.click(searchBtn);

    const pressureElement = await screen.queryByText(
      `${fakeData.main.pressure} Pa`
    );
    const descriptionElement = await screen.queryByText(
      fakeData.weather[0].description
    );
    const flipDivElement = await screen.findByTestId('t_flipped_container');

    // flips the card from front to back side
    fireEvent.click(flipDivElement);

    expect(pressureElement).not.toBeInTheDocument();
    expect(descriptionElement).not.toBeInTheDocument();
  });

  it('Checking the presence of information on the card back side', async () => {
    render(<MainPage />);
    const searchBtn = screen.getByText(/Search/i);
    // click the search btn to add Helsinki city from fake data
    fireEvent.click(searchBtn);

    const flipDivElement = await screen.findByTestId('t_flipped_container');

    // flips the card from front to back side
    fireEvent.click(flipDivElement);

    const minTempElement = await screen.findByText(
      `Min ${fakeData.main.temp_min.toFixed(0)}° C`
    );
    const maxTempElement = await screen.findByText(
      `Max ${fakeData.main.temp_max.toFixed(0)}° C`
    );
    const feelsLikeTempElement = await screen.findByText(
      `Feels like ${fakeData.main.feels_like.toFixed(0)}° C`
    );
    const humidityElement = await screen.findByText(
      `Humidity ${fakeData.main.humidity}%`
    );
    const visibilityElement = await screen.findByText(
      `Visibility ${fakeData.visibility / 1000}/10 km`
    );
    const windElement = await screen.findByText(
      `Wind ${fakeData.wind.speed} m/s`
    );

    expect(minTempElement).toBeInTheDocument();
    expect(maxTempElement).toBeInTheDocument();
    expect(feelsLikeTempElement).toBeInTheDocument();
    expect(humidityElement).toBeInTheDocument();
    expect(visibilityElement).toBeInTheDocument();
    expect(windElement).toBeInTheDocument();
  });

  it('Test delete btn functionality', async () => {
    render(<MainPage />);
    const searchBtn = screen.getByText(/Search/i);
    // click the search btn to add Helsinki city from fake data
    fireEvent.click(searchBtn);

    const cityNameBeforeDeleteElement = await screen.findByText(fakeData.name);
    expect(cityNameBeforeDeleteElement).toBeInTheDocument();

    const deleteBtnElement = await screen.findByTestId('t_btn_delete');
    // delete city card
    fireEvent.click(deleteBtnElement);

    const cityNameAfterDeleteElement = await screen.queryByText(fakeData.name);
    expect(cityNameAfterDeleteElement).not.toBeInTheDocument();
  });
});
