"use strict";

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
