"use strict";

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
  fetch(getUrl())
    .then(response => response.json())
    .then(data => paintData(data));
};

const paintData = data => {
  const gifInfo = data.data[0].images.downsized_large;
  imgEl.src = gifInfo.url;
  imgEl.width = Math.round(parseInt(gifInfo.width) * 1.5);
  imgEl.height = Math.round(parseInt(gifInfo.height) * 1.5);
};

sendRequest();
