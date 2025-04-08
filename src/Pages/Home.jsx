import React from 'react'
import './Home.css'
import { useState } from 'react'
import Clear from './../assets/clear.png'
import Clouds from './../assets/clouds.png'
import Drizzle from './../assets/drizzle.png'
import Humidity from './../assets/humidity.png'
import Mist from './../assets/mist.png'
import Rain from './../assets/rain.png'
import Search from './../assets/search.png'
import Snow from './../assets/snow.png'
import Wind from './../assets/wind.png'


const Home = () => {
    const [cityname, setCityName] = useState('');
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [weatherIcon, setWeatherIcon] = useState(Clear);
    const [temp, setTemp] = useState();
    const [humidity, setHumidity] = useState()
    const [wind, setWind] = useState()


    let apiKey = "88c22151468d8609cbdce07b808891ff";

    function submitCityName(e) {
        if (cityname.trim()) {
            setCityName('')
        }
        fetchData();
        setShow(true)
    }

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`)
            const data = await response.json();
            setTemp(data.main.temp)
            setHumidity(data.main.humidity)
            setWind(data.wind.speed)
            setData(data)

            if (data.weather[0].main == "Clouds") {
                setWeatherIcon(Clouds)
            } else if (data.weather[0].main == "Clear") {
                setWeatherIcon(Clear)
            } else if (data.weather[0].main == "Rain") {
                setWeatherIcon(Rain)
            } else if (data.weather[0].main == "Drizzle") {
                setWeatherIcon(Drizzle)
            } else if (data.weather[0].main == "Mist") {
                setWeatherIcon(Mist)
            }


        } catch (error) {
            console.log('Could not get the data')
        }
    }

    return (
        <div>

            <div className="card">
                <div className="search">
                    <input type="text" value={cityname} placeholder='Enter City Name' onChange={(e) =>
                        setCityName(e.target.value)} />
                    <button onClick={submitCityName} type="button">
                        <img src={Search} alt="" />
                    </button>
                </div>

                {/* <div className="error">
                    <p>Invalid City Name</p>
                </div> */}

                {show && data && (
                    <div className={"weather"}>
                        <img src={weatherIcon} alt="WeatherIcon" className="weather-icon" />
                        <h1 className="temp">{temp}°c</h1>
                        <h2 className="city">{data.name}</h2>
                        <div className="details">
                            <div className="col">
                                <img src="images/humidity.png" alt="" className="icon" />
                                <div>
                                    <p className="humidity">{humidity}%</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                            <div className="col">
                                <img src="images/wind.png" alt="" />
                                <div>
                                    <p className="wind">{wind}km/h</p>
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ====== */}
                {/* () is used for invoking functions, defining anonymous functions, grouping expressions, and wrapping JSX in React. */}

            </div>
        </div>
    )
}

export default Home

