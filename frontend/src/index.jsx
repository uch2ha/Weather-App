import React from 'react';
import ReactDOM from 'react-dom';
import './public/style.css';

const baseURL = process.env.ENDPOINT || 'http://localhost:9000/api';

const getWeatherFromApi = async (city) => {
    try {
        const response = await fetch(`${baseURL}/weatherbycity?city=${city}`);
        return response.json();
    } catch (error) {
        console.error(error);
    }

    return {};
};

class Weather extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            icon: '',
            timeStamp: '',
            location: 'Helsinki',
            error: '',
        };
    }

    async componentWillMount() {
        this.getWeather();
    }

    async getWeather() {
        const [weatherData] = await Promise.all([
            getWeatherFromApi(this.state.location),
        ]);
        if (weatherData) {
            console.log('Weather data:', weatherData);
            this.setState({
                icon: weatherData.weather[0].icon.slice(0, -1),
                updatedAt: new Date().toISOString(),
                error: '',
            });
        } else {
            this.setState({ error: 'Unbable to fetch weather' });
        }
    }

    render() {
        const { icon, location, updatedAt } = this.state;

        return (
            <div>
                <div className='icon'>
                    <h2>Curent weather zxc{location}</h2>
                    {icon && (
                        <img
                            width={200}
                            height={200}
                            alt='weather_icon'
                            src={require(`./public/img/${icon}.svg`)}
                        />
                    )}
                    {updatedAt && <p>{updatedAt}</p>}
                    <button onClick={() => this.getWeather()}>Update</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Weather />, document.getElementById('app'));
