import { useState, useEffect } from "react";
import { CloseIcon, RightIcon, LupaIcon } from "./Icons";
import { guardadosLocalStorage } from "./LocalStorage";

export function InputSearch({ buscarPlace }) {
  const [abrirMenu, setAbrirMenu] = useState(false);
  const [buscarCiudad, setBuscarCiudad] = useState("");
  const [places, setPlaces] = useState(null);
  const toggleMenu = () => {
    if (abrirMenu) {
      document.body.classList.remove("no-scrollbar");
    } else {
      document.body.classList.add("no-scrollbar");
    }
    setAbrirMenu((prev) => !prev);
  };

  const search = (event) => {
    event.preventDefault();
    buscarPlace(buscarCiudad);
    toggleMenu()
    setBuscarCiudad('')
    setPlaces(guardadosLocalStorage());

  };

  const selectAndClose = (place) => {
    buscarPlace(place);
    toggleMenu();
  };

  useEffect(() => {
    setPlaces(guardadosLocalStorage());
  }, []);
  return (
    <header className="bg-base-color">
      <div className="py-4">
        <button className="py-3 px-5 bg-gray-3 hover:bg-indigo-700 duration-700 transform hover:scale-110 transition ease-in-out" onClick={toggleMenu}>
          Seach for places
        </button>
      </div>

      <nav
        className={`${
          abrirMenu ? "fixed" : "hidden"
        } top-0 left-0 right-0 bottom-0 md:w-[400px] bg-base-color text-center items-center justify-center z-50 overflow-auto no-scrollbar p-3`}
      >
        <button className="flex ml-auto p-4 " onClick={toggleMenu}>
          <CloseIcon />
        </button>
        <form className="flex gap-3" onSubmit={search}>
          <div className="flex items-center gap-3 border w-full border-gray-base pl-3 p-1 hover:bg-indigo-700 duration-700">
            <LupaIcon />
            <input
              className="bg-transparent w-full py-2 focus:outline-none "
              placeholder="City"
              type="text"
              value={buscarCiudad}
              onChange={(event) => setBuscarCiudad(event.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-3 px-5 py-3 hover:bg-indigo-700  duration-700">
            Search
          </button>
        </form>
        <div className="flex flex-col py-10 gap-3">
          {places?.map((place) => (
            <button
              className="flex w-full px-3 py-6 border hover:border border-transparent hover:border-gray-base group hover:border-gray-1 duration-700 hover:bg-indigo-800"
              key={place}
              onClick={() => selectAndClose(place)}
            >
              <p>{place}</p>
              <span className="ml-auto hidden group-hover:block">
                <RightIcon />
              </span>
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
