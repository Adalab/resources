"use strict";

// local storage

const getFromLocalStorage = () => {
  const rawData = localStorage.getItem("data") || "{}";
  const data = JSON.parse(rawData);
  return {
    title: data.title || "",
    subtitle: data.subtitle || "",
    tasks: data.tasks || []
  };
};

const setToLocalStorage = () => {
  const data = {
    title: document.querySelector(".js-edit-title").value,
    subtitle: document.querySelector(".js-edit-subtitle").value,
    tasks: [...document.querySelectorAll(".js-edit-task")]
      .map((task, idx) => ({
        name: task.value,
        active: document.querySelectorAll(".js-task-check")[idx].checked
      }))
      .filter(task => task.name !== "")
  };
  localStorage.setItem("data", JSON.stringify(data));
};

// paint

const paintData = () => {
  const data = getFromLocalStorage();
  paintText("title", data.title);
  paintText("subtitle", data.subtitle);
  paintTasksList(data.tasks);
  paintTasksEdit(data.tasks);
};

const paintText = (selector, text) => {
  document.querySelector(".js-" + selector).innerHTML = text;
  document.querySelector(".js-edit-" + selector).value = text;
};

const paintTasksList = tasks => {
  let tasksHtmlCode = "";
  for (const task of tasks) {
    tasksHtmlCode += `<li>`;
    tasksHtmlCode += `<div class="task">`;
    tasksHtmlCode += `<input class="task__check js-task-check" type="checkbox" `;
    tasksHtmlCode += task.active ? "checked" : "";
    tasksHtmlCode += `>`;
    tasksHtmlCode += `<label class="task__label">${task.name}</label>`;
    tasksHtmlCode += `</div>`;
    tasksHtmlCode += `</li>`;
  }
  document.querySelector(".js-tasks").innerHTML = tasksHtmlCode;
};

const paintTasksEdit = tasks => {
  let tasksHtmlCode = "";
  for (const task of tasks) {
    tasksHtmlCode += paintDataTask(task);
  }
  // tasksHtmlCode += paintDataTask({ name: "" });
  document.querySelector(".js-edit-tasks").innerHTML = tasksHtmlCode;
};

const paintDataTask = (task = "") => {
  let taskHtmlCode = "";
  taskHtmlCode += `<li>`;
  taskHtmlCode += `<input type="text" class="js-edit-task edit__input" value="${task.name}" active=${task.active}>`;
  taskHtmlCode += `</li>`;
  return taskHtmlCode;
};

// listen events

const ensureData = () => {
  setToLocalStorage();
  paintData();
  listenElements();
};

const listenElements = () => {
  document
    .querySelector(".js-edit-title")
    .addEventListener("keyup", ensureData);
  document
    .querySelector(".js-edit-subtitle")
    .addEventListener("keyup", ensureData);
  document
    .querySelectorAll(".js-edit-task")
    .forEach(item => item.addEventListener("blur", ensureData));
  document
    .querySelectorAll(".js-task-check")
    .forEach(item => item.addEventListener("change", ensureData));
};

// logo

const toggleEditModal = () => {
  document.querySelector(".js-edit").classList.toggle("hidden");
};
document.querySelector(".js-logo").addEventListener("click", toggleEditModal);

paintData();
listenElements();
