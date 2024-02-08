import './App.css'
/* import { Search } from './Search' */
import {UbicacionIcon , LocalizacionIcon } from './components/Icons'
import NubesFondo from '/Cloud-background.png'
import {
  climaSemanal,
  climaSemanalCordenadas,
  clima,
  climaXCordernadas,
} from "./components/Api/WeatherApi";
import { useState, useEffect } from 'react';
import { InputSearch } from './components/InputSearch';
import { WeakWeather } from './components/WeakWeather';
import { HightlightsMedidas } from './components/HightlightsMedidas';



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
    
    clima(place).then((data) => changeWeather(data));
    climaSemanal(place).then((data) => changeForecast(data));
  };


  useEffect(() => {
    clima("ecuador").then((data) => changeWeather(data));
    climaSemanal("ecuador").then((data) => changeForecast(data));
  }, []);


  return (
    <>
   
     <section className="md:fixed md:top-0 md:bottom-0 md:left-0 md:w-[400px] relative ">

        <InputSearch buscarPlace={buscarPlace} />
        <article className="px-4 py-20 bg-base-color md:h-screen truncate w-full max-sm:h-[1100px] sm:h-[1100px]">
          <button
            className="absolute top-6 right-4 bg-gray-3 rounded-full p-3 "
            onClick={cords}
          >
            <LocalizacionIcon />
          </button>
          <div className="flex flex-col items-center relative ">

          <div className=" flex items-center justify-center lg:w-[600px] md:w-[600px]  max-sm:w-[820px] sm:w-[860px]">

          <img className="w-[180px] absolute m-[35px]" src={`/${weatherData.weather}.png`}  alt={`/${weatherData.weather}`} />  
      
          <img className="w-[100%] h-auto opacity-10 " src={NubesFondo} alt="" />
          </div>

            <p className="text-[144px] font-medium">
            {fahrenheit
                  ? Math.floor(weatherData.temp * (9 / 5) + 32)
                  : weatherData.temp}
              <span className="text-gray-2 text-5xl"> {fahrenheit ? "°F" : "°C"}</span>
            </p>
            <p className="text-gray-2 text-4xl font-semibold pb-12">
              {weatherData.weather}
            </p>
            <div className="flex gap-4 text-gray-2 text-lg font-medium pb-6">
              <span>Today</span>
              <span>•</span>
              <span>{weatherData.dateFormat}</span>
            </div>
            <div className="flex gap-3">
              <UbicacionIcon />
              <p className="text-gray-2 text-lg font-semibold">
                {weatherData.locationName}
              </p>
            </div>
          </div>
        </article>
       
      </section>
      <WeakWeather 
      forecastData={forecastData}
      keys={keys}  
      fahrenheit={fahrenheit}
      />
      <HightlightsMedidas
      weatherData={weatherData}
      mph={mph}
      />
    </>
  )
}

export default App
