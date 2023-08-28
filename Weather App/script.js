"use strict";

const inputDesk = document.querySelector(".input-desk");
const inputMobile = document.querySelector(".input-mobile");
const searchBtn = document.querySelector(".btn-desk");
const mobileSearchBtn = document.querySelector(".btn-mobile");
const containerSection = document.querySelector(".content-section");
const cityCurrentData = document.querySelector(".city-currentdata");
const cityInfo = document.querySelector(".city-info");
const cards = document.querySelector(".cards");
const overlay = document.querySelector(".overlay");
const openMobileModal = document.querySelector(".mobile-search");
const modalMobile = document.querySelector(".input-wrapper");

// fetch Data from the API
const fetchWeatherData = async function (city) {
  try {
    const request = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=7329886698114be6808152119232708&q=${city}&days=4&aqi=no&alerts=no`
    );

    // throw error if the request is rejected (when input is invalid)
    if (!request.ok)
      throw new Error("Problem getting the City, Check the input!");
    const response = await request.json();

    const cityCurrData = `   <div class="city-currentdata">
    <div class="data">
      <h2><span>${response.location.name} </span>(${response.location.localtime}) <span></h2>
      <p>Tempearature: <span>${response.current.temp_c} 'C</span></p>
      <p>Wind: <span>${response.current.wind_mph} m/s</span></p>
      <p>Humidity: <span>${response.current.humidity}%</span></p>
    </div>
    <div class="weather-condition">
    <img
    src="${response.current.condition.icon}"
    alt="rain icon"
    class="city-icon"
    />
    <p class="condition">${response.current.condition.text}</p>
    </div>
    </div>`;

    const fourDaysData = `
    <div class="forecast-cards">
      <div class="card">
        <p class="date">(${response.forecast.forecastday[0].date})</p>
        <img
          src="${response.forecast.forecastday[0].day.condition.icon}"
          alt="rain icon"
          class="card-icon"
        />
        <p>Temp: <span>${response.forecast.forecastday[0].day.maxtemp_c}</span></p>
        <p>Wind: <span>${response.forecast.forecastday[0].day.maxwind_mph}</span></p>
        <p>Humidity: <span>${response.forecast.forecastday[0].day.avghumidity}</span></p>
      </div>
      <div class="card">
        <p class="date">(${response.forecast.forecastday[1].date})</p>
        <img
          src="${response.forecast.forecastday[1].day.condition.icon}"
          alt="rain icon"
          class="card-icon"
        />
        <p>Temp: <span>${response.forecast.forecastday[1].day.maxtemp_c}</span></p>
        <p>Wind: <span>${response.forecast.forecastday[1].day.maxwind_mph}</span></p>
        <p>Humidity: <span>${response.forecast.forecastday[1].day.avghumidity}</span></p>
      </div>
      <div class="card">
      <p class="date">(${response.forecast.forecastday[2].date})</p>
      <img
        src="${response.forecast.forecastday[2].day.condition.icon}"
        alt="rain icon"
        class="card-icon"
      />
      <p>Temp: <span>${response.forecast.forecastday[2].day.maxtemp_c}</span></p>
      <p>Wind: <span>${response.forecast.forecastday[2].day.maxwind_mph}</span></p>
      <p>Humidity: <span>${response.forecast.forecastday[2].day.avghumidity}</span></p>
    </div>
    <div class="card">
    <p class="date">(${response.forecast.forecastday[3].date})</p>
    <img
      src="${response.forecast.forecastday[3].day.condition.icon}"
      alt="rain icon"
      class="card-icon"
    />
  <p>Temp: <span>${response.forecast.forecastday[3].day.maxtemp_c}</span></p>
    <p>Wind: <span>${response.forecast.forecastday[3].day.maxwind_mph}</span></p>
    <p>Humidity: <span>${response.forecast.forecastday[3].day.avghumidity}</span></p>
  </div>
    </div>
    `;

    cityInfo.innerHTML = cityCurrData;
    cards.innerHTML = fourDaysData;
  } catch (err) {
    alert(err.message);
  }
};

// Functionality for desktop search button
searchBtn.addEventListener("click", function () {
  const cityName = inputDesk.value.toLowerCase().trim();
  fetchWeatherData(cityName);
  inputDesk.value = "";
});

// open Modal window for the user to enter details (mobile version)
openMobileModal.addEventListener("click", function () {
  overlay.classList.remove("hide");
  modalMobile.classList.remove("hide");
});

// Functionality for mobile search button
mobileSearchBtn.addEventListener("click", function () {
  const cityName = inputMobile.value.toLowerCase().trim();
  fetchWeatherData(cityName);
  inputMobile.value = "";
  overlay.classList.add("hide");
  modalMobile.classList.add("hide");
});

// Close the modal when the user clicks on the overlay
overlay.addEventListener("click", function () {
  overlay.classList.add("hide");
  modalMobile.classList.add("hide");
});
