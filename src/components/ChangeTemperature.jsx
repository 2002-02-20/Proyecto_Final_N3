import React, { useState } from "react";

export const ChangeTemperature = ({ changeGradosF, changeGradosC }) => {
  const [black, setBlack] = useState("#585676");
  const [white, setWhite] = useState("#A09FB1");

  const paintTemperature = () => {
    setBlack(white);
    setWhite(black);
  };

  return (
    <div className="absolute top-4 right-[75px] hidden md:block ">
      <button
        type="button"
        className="rounded-full  h-[40px] w-[40px] font-bold text-silver bg-[#585676] undefined mx-3"
        onClick={() => {
          changeGradosC();
          paintTemperature();
        }}
        style={{ backgroundColor: white }}
      >
        °C
      </button>
      <button
        type="button"
        className="rounded-full  h-[40px] w-[40px] font-bold text-silver  bg-[#585676] undefined "
        onClick={() => {
          changeGradosF();
          paintTemperature();
        }}
        style={{ backgroundColor: black }}
      >
        °F
      </button>
    </div>
  );
};
