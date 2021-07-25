import { useCallback, useEffect, useState } from "react";
import axios from "axios";
const Weather = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState({
    currently: "loading",
    message: "Loading Weather...",
  });
  const degToCompass = (num) => {
    var val = Math.floor(num / 22.5 + 0.5);
    var arr = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return arr[val % 16];
  };
  const axiosHook = useCallback((loc) => {
    const api_key = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${loc.capital},${loc.name}&appid=${api_key}&units=imperial`;
    axios
      .get(url)
      .then((response) => {
        const rD = response.data;
        const obj = {
          temp: rD.main.temp,
          icon: `http://openweathermap.org/img/wn/${rD.weather[0].icon}@2x.png`,
          desc: rD.weather[0].description,
          name: rD.weather[0].main,
          wind: {
            dir: degToCompass(rD.wind.deg),
            speed: rD.wind.speed,
          },
        };
        setWeather(obj);
        const statusMsg = `Weather has loaded for ${loc.capital}, ${loc.name}`;
        // console.log(statusMsg, {response});
        setStatus({
          currently: "loaded",
          message: statusMsg,
          //   response
        });
      })
      .catch(function (error) {
        const statusMsg = `Failed to retrieve weather data for ${loc.capital}, ${loc.name}`;
        console.log(statusMsg, { error });
        setStatus({
          currently: "error",
          message: statusMsg,
          //   error
        });
      });
  }, []);
  useEffect(() => axiosHook(location), [axiosHook, location]);
  let content = <div>{status.message}</div>;
  if (status.currently === "loaded") {
    content = (
      <>
        <h3>Weather in {location.capital||location.name}</h3>
        <p>
          {Math.round(weather.temp)}f {weather.name}
        </p>
        <img src={weather.icon} alt={weather.desc} />
        <p>
          Wind: {Math.round(weather.wind.speed)}mph direction {weather.wind.dir}
        </p>
      </>
    );
  }
  return <div className="weather-card">{content}</div>;
};

export default Weather;
