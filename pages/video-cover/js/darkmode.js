"use strict";

// start app

(() => {
  const startApp = () => {
    document
      .querySelector(".js_darkmode")
      .addEventListener("click", handleClickDarkmode);
  };

  const handleClickDarkmode = (ev) => {
    ev.preventDefault();

    const body = document.body;
    const darkmodeBtn = document.querySelector(".js_darkmode");

    if (body.classList.contains("darkmode")) {
      body.classList.remove("darkmode");
      darkmodeBtn.innerHTML = "Modo oscuro";
    } else {
      body.classList.add("darkmode");
      darkmodeBtn.innerHTML = "Modo claro";
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    startApp();
  });
})();
