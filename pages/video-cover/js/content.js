'use strict';

// start app

const startApp = () => {
  const data = getFromLocalStorage() || getDefaultData();
  data.tasks = data.tasks.length ? data.tasks : getDefaultData().tasks;
  setToLocalStorage(data);
  paintData(data);
  document.body.addEventListener('dblclick', ensureTime);
  document.body.addEventListener('click', ensureData);
  document.body.addEventListener('keyup', ensureData);
};

const removeStartingMode = () => {
  setTimeout(() => {
    document.querySelector('.starting-mode').classList.remove('starting-mode');
  }, 1000);
};

// data

const ensureData = ev => {
  checkBtns(ev);
  setToLocalStorage(getCurrentData());
};

const getDefaultData = () => {
  return {
    title: 'Título',
    subtitle: 'Subtítulo',
    tasks: [
      {
        checked: false,
        label: 'Primera tarea',
        time: getTime()
      }
    ]
  };
};

const getCurrentData = () => {
  const tasks = [];
  for (const task of document.querySelectorAll('.js-task')) {
    tasks.push({
      label: getElData('label', 'innerHTML', task),
      checked: getElData('checkbox', 'checked', task),
      time: getElData('time', 'innerHTML', task)
    });
  }
  return {
    title: getElData('title'),
    subtitle: getElData('subtitle'),
    tasks
  };
};

// paint

const paintData = data => {
  setElData('title', data.title);
  setElData('subtitle', data.subtitle);
  let tasksCode = '';
  for (let i = 0; i < data.tasks.length; i++) {
    tasksCode += `<li class="task js-task">`;
    tasksCode += `  <div class="btns">`;
    tasksCode += `    <input type="button" class="btn js-remove" data-index="${i}" value="-">`;
    tasksCode += `    <input type="button" class="btn js-add" data-index="${i}" value="+">`;
    tasksCode += `  </div>`;
    tasksCode += `  <input class="checkbox js-checkbox" type="checkbox" ${data.tasks[i].checked ? 'checked' : ''}>`;
    tasksCode += `  <label class="label js-label" contenteditable="true">${data.tasks[i].label}</label>`;
    tasksCode += `  <span class="time js-time" contenteditable="true">${data.tasks[i].time}</span>`;
    tasksCode += `</li>`;
  }
  setElData('tasks', tasksCode);
};

// time

const ensureTime = ev => {
  if (ev.target.classList.contains('js-time')) {
    ev.target.innerHTML = getTime();
  }
};

// buttons

const checkBtns = ev => {
  if (ev.type === 'click') {
    const index = parseInt(ev.target.dataset.index);
    const data = getCurrentData();
    if (ev.target.classList.contains('js-remove')) {
      data.tasks.splice(index, 1);
      setToLocalStorage(data);
      paintData(data);
    } else if (ev.target.classList.contains('js-add')) {
      data.tasks.splice(index + 1, 0, getDefaultData().tasks[0]);
      setToLocalStorage(data);
      paintData(data);
    }
  }
};

// helpers: local storage

const getFromLocalStorage = () => {
  const key = getQueryParam('ls', 'default');
  return JSON.parse(localStorage.getItem(key));
};

const setToLocalStorage = data => {
  const key = getQueryParam('ls', 'default');
  localStorage.setItem(key, JSON.stringify(data));
};

// helpers: window location

const getQueryParam = (key, defaultValue) => {
  const params = window.location.search.substr(1).split('&');
  for (let param of params) {
    param = param.split('=');
    if (param[0] === key) {
      return param[1];
    }
  }
  return defaultValue;
};

// helpers: elements

const getElData = (selector, prop = 'innerHTML', element) => {
  return (element || document).querySelector('.js-' + selector)[prop];
};

const setElData = (selector, value, prop = 'innerHTML') => {
  document.querySelector('.js-' + selector)[prop] = value;
};

// helpers: time

const getTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return `${hour}:${minutes < 10 ? '0' + minutes : minutes}`;
};

// start app

startApp();
removeStartingMode();
