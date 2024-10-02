"use strict";

const search = document.getElementById("input");
search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    weatherData(search.value);
    search.value = "";
  }
});

const city = document.querySelector(".city");
const dayTime = document.querySelector(".day");
const condition = document.getElementById("condition");
const currentTemp = document.getElementById("current-temp");
const min = document.getElementById("min");
const max = document.getElementById("max");
const wind = document.getElementById("wind-speed");
const humid = document.getElementById("humidity");
const img = document.getElementById("image");

const weatherData = (cityName) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${"b8f298ca30292a8c82beada2c25efbd7"}&units=metric`
  )
    .then((response) => {
      if (!response.ok) throw new Error(`${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      currentTemp.innerHTML = `${Math.trunc(data.main.feels_like)}°C`;
      city.innerHTML = `${data.name}, ${data.sys.country}`;
      const today = new Date();
      const f = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kathmandu",
        dateStyle: "full",
        timeStyle: "short",
      });
      dayTime.innerHTML = f.format(today);
      condition.innerHTML = data.weather[0].description;
      min.innerHTML = `${Math.trunc(data.main.temp_min)}°C`;
      max.innerHTML = `${Math.trunc(data.main.temp_max)}°C`;
      wind.innerHTML = `${Math.trunc(data.wind.speed)} m/s`;
      humid.innerHTML = `${Math.trunc(data.main.humidity)}%`;
      img.src = `${
        "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      }`;
    })
    .catch((err) => alert("City not matched in out database check again and input correct city aacordingly!"));
};

weatherData("Kathmandu");
