import React from "react";
import { InputSearch } from "./InputSearch";
import { LocalizacionIcon, UbicacionIcon } from "./Icons";
import NubesFondo from "/Cloud-background.png";

export const Status = ({ weatherData, buscarPlace, cords, fahrenheit }) => {
  return (
    <>
      <section className="md:fixed md:top-0 md:bottom-0 md:left-0 md:w-[400px] relative  ">
        <article className="px-4  bg-base-color md:h-screen truncate w-full max-sm:h-[950px] sm:h-[990px] ">
        <InputSearch buscarPlace={buscarPlace} />
          <button
            className="absolute top-4 right-4 bg-gray-down rounded-full p-3 hover:bg-indigo-700 duration-700 transform hover:scale-110 transition ease-in-out"
            onClick={cords}
          >
            <LocalizacionIcon />
          </button>
          
          <div className="flex flex-col items-center relative ">
            <div className=" flex items-center justify-center lg:w-[580px] lg:h-[290px] md:w-[700px]  max-sm:w-[670px] sm:w-[840px] ">
              <img
                className="w-[180px] absolute"
                src={`/${weatherData.weather}.png`}
                alt={`/${weatherData.weather}`}
              />

              <img
                className="w-[100%] h-auto opacity-10 "
                src={NubesFondo}
                alt=""
              />
            </div>

            <p className="text-[144px] font-medium animate-pulse">
              {fahrenheit
                ? Math.floor(weatherData.temp * (9 / 5) + 32)
                : weatherData.temp}
              <span className="text-gray-basic text-5xl">
                {" "}
                {fahrenheit ? "°F" : "°C"}
              </span>
            </p>
            <p className="text-gray-basic text-4xl font-semibold pb-12">
              {weatherData.weather}
            </p>
            <div className="flex gap-4 text-gray-basic text-lg font-medium sm:pb-6">
              <span>Today</span>
              <span>•</span>
              <span>{weatherData.dateFormat}</span>
            </div>
            <div className="flex gap-3 py-3">
              <UbicacionIcon />
              <p className="text-gray-basic text-lg font-semibold">
                {weatherData.locationName}
              </p>
            </div>
          </div>
        </article>
      </section>
      <div className="hidden"></div>
    </>
  );
};
