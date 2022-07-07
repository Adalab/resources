const get = key => {
  return localStorage.getItem(key) || '';
};

const set = (key, value) => {
  localStorage.setItem(key, value);
};

const exportObject = {
  get,
  set
};

export default exportObject;
