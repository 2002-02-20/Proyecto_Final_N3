import React from "react";
import { InputSearch } from "./InputSearch";
import { LocalizacionIcon, UbicacionIcon } from "./Icons";
import NubesFondo from "/Cloud-background.png";

export const Status = ({ weatherData, buscarPlace, cords, fahrenheit }) => {
  return (
    <>
      <section className="md:fixed md:top-0 md:bottom-0 md:left-0 md:w-[400px] relative ">
        <InputSearch buscarPlace={buscarPlace} />
        <article className="px-4 bg-base-color md:h-screen truncate w-full max-sm:h-[950px] sm:h-[950px]">
          <button
            className="absolute top-6 right-4 bg-gray-3 rounded-full p-3 "
            onClick={cords}
          >
            <LocalizacionIcon />
          </button>
          <div className="flex flex-col items-center relative ">
            <div className=" flex items-center justify-center lg:w-[600px] md:w-[600px]  max-sm:w-[820px] sm:w-[860px]">
              <img
                className="w-[180px] absolute m-[35px]"
                src={`/${weatherData.weather}.png`}
                alt={`/${weatherData.weather}`}
              />

              <img
                className="w-[100%] h-auto opacity-10 "
                src={NubesFondo}
                alt=""
              />
            </div>

            <p className="text-[144px] font-medium">
              {fahrenheit
                ? Math.floor(weatherData.temp * (9 / 5) + 32)
                : weatherData.temp}
              <span className="text-gray-2 text-5xl">
                {" "}
                {fahrenheit ? "°F" : "°C"}
              </span>
            </p>
            <p className="text-gray-2 text-4xl font-semibold pb-12">
              {weatherData.weather}
            </p>
            <div className="flex gap-4 text-gray-2 text-lg font-medium sm:pb-6">
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
      <div className="hidden"></div>
    </>
  );
};
