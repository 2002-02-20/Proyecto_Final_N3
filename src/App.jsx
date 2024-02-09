import "./App.css";
import {
  climaSemanal,
  climaSemanalCordenadas,
  clima,
  climaXCordernadas,
} from "./components/Api/WeatherApi";
import { useState, useEffect } from "react";
import { WeakWeather } from "./components/WeakWeather";
import { Footer } from "./components/Footer";
import { HightlightsMedidas } from "./components/HightlightsMedidas";
import { ChangeTemperature } from "./components/ChangeTemperature";
import { Status } from "./components/Status";
import { addPlaceToLocalStorage } from "./components/LocalStorage";

function App() {
  const [fahrenheit, setFahrenheit] = useState(false);
  const [forecastData, setForecastData] = useState({});
  const [keys, setKeys] = useState([]);
  const [mph, setMph] = useState(false);

  const [weatherData, setWeatherData] = useState({
    temp: 0,
    dateFormat: "",
    windStatus: 0,
    humidity: 0,
    airPressure: 0,
    visibilityInMiles: 0,
    weather: "",
    locationName: "",
  });

  const changeWeather = (data) => {
    const { weather, main, visibility, wind, name } = data;
    const date = new Date();
    const dateOptions = { weekday: "short", day: "numeric", month: "short" };

    setWeatherData({
      weather: weather.main ?? "Shower",
      temp: Math.round(main?.temp ?? 0),
      dateFormat: date.toLocaleDateString("en-US", dateOptions),
      windStatus: Math.round(wind?.speed ?? 0),
      humidity: Math.round(main?.humidity ?? 0),
      airPressure: main?.pressure ?? 0,
      visibilityInMiles: visibility ? visibility / 1609.34 : 0,
      weather: weather[0]?.main ?? "Shower",
      locationName: name,
    });
    const progreso = document.getElementById("progress");
    const windStatus = document.getElementById("windStatus");
    progreso.style.width = Math.round(main?.humidity ?? 0) + "%";
    windStatus.style.transform = `rotate(${wind.deg}deg)`;
  };

  const changeForecast = (data) => {
    const dailyForecast = [];

    data.list.forEach((segment) => {
      const fechaTexto = segment.dt_txt;
      const fecha = new Date(fechaTexto);
      const dia = fecha.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      if (!dailyForecast[dia]) {
        dailyForecast[dia] = {
          minTemp: segment.main.temp,
          maxTemp: segment.main.temp,
          weather: segment.weather[0].main,
        };
      } else {
        dailyForecast[dia].minTemp = Math.min(
          dailyForecast[dia].minTemp,
          segment.main.temp
        );
        dailyForecast[dia].maxTemp = Math.max(
          dailyForecast[dia].maxTemp,
          segment.main.temp
        );
      }
    });
    const dayKeys = Object.keys(dailyForecast);
    setForecastData(dailyForecast);
    setKeys(dayKeys);
  };

  const cords = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        climaXCordernadas(lat, lon).then((data) => changeWeather(data));
        climaSemanalCordenadas(lat, lon).then((data) => changeForecast(data));
      });
    }
  };

  const buscarPlace = (place) => {
    addPlaceToLocalStorage(place);

    clima(place).then((data) => changeWeather(data));
    climaSemanal(place).then((data) => changeForecast(data));
  };

  /*  const inputSearch = (place) => {
    addPlaceToLocalStorage(place);
    getWeather(place).then((data) => changeWeather(data));
    getForecast(place).then((data) => changeForecast(data));
  }; */

  useEffect(() => {
    clima("ecuador").then((data) => changeWeather(data));
    climaSemanal("ecuador").then((data) => changeForecast(data));
  }, []);

  const changeGradosF = () => {
    setFahrenheit(true);
    setMph(true);
  };

  const changeGradosC = () => {
    setFahrenheit(false);
    setMph(false);
  };

  return (
    <>
      <main className="md:flex max-w-8xl mx-auto">
        <Status
          weatherData={weatherData}
          buscarPlace={buscarPlace}
          cords={cords}
          fahrenheit={fahrenheit}
        />
        <ChangeTemperature
          changeGradosF={changeGradosF}
          changeGradosC={changeGradosC}
        />
        <section className="md:flex-1 md:pl-[400px] md:m-20">
          <WeakWeather
            forecastData={forecastData}
            keys={keys}
            fahrenheit={fahrenheit}
          />
          <HightlightsMedidas weatherData={weatherData} mph={mph} />
          <Footer />
        </section>
      </main>
    </>
  );
}

export default App;
