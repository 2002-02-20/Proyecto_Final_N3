const apiKey = "44b87d1411406ee4957748c0d2847b36"

function climaXCordernadas (lat, lon) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

function climaSemanalCordenadas (lat, lon) {
  return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

function clima (place) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

function climaSemanal (place) {
  return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

export {
  clima,
  climaSemanal,
  climaXCordernadas,
  climaSemanalCordenadas
}
