"use strict";

// gif

const imgEl = document.querySelector(".js-gif");

const getUrl = () => {
  return (
    "//api.giphy.com/v1/gifs/search?" +
    "api_key=CNdqoaNxaFfWp6xIvfiSgWGz9n1z4a6T" +
    "&q=ok" +
    "&limit=1" +
    "&offset=" +
    Math.floor(Math.random() * 100) +
    "&rating=G" +
    "&lang=es"
  );
};

const sendRequest = () => {
  if (imgEl) {
    fetch(getUrl())
      .then(response => response.json())
      .then(data => paintData(data));
  }
};

const paintData = data => {
  const gifInfo = data.data[0].images.downsized_large;
  imgEl.src = gifInfo.url;
  imgEl.width = Math.round(parseInt(gifInfo.width) * 1.5);
  imgEl.height = Math.round(parseInt(gifInfo.height) * 1.5);
};

sendRequest();

// date

const setDate = () => {
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
  ];
  const date = new Date();
  const month = months[date.getMonth()];
  const dateText = `${date.getDate()} de ${month} de ${date.getFullYear()}`;
  const dateEl = document.querySelector(".js-date");
  dateEl.innerHTML = dateText;
};

setDate();
