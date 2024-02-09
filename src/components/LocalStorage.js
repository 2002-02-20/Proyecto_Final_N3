const storageName = 'weatherPlaces'

function localStoragePlaces (place) {
  const getPlaces = window.localStorage.getItem(storageName)
  const places = JSON.parse(getPlaces) ?? []

  if (!places.includes(place)) {
    const newPlaces = [...places, place]
    window.localStorage.setItem(storageName, JSON.stringify(newPlaces))
  }
}

function guardadosLocalStorage () {
  const getPlaces = window.localStorage.getItem(storageName)
  return JSON.parse(getPlaces) ?? []
}

export {
  localStoragePlaces,
  guardadosLocalStorage
}
