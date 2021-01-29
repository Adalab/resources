const getToken = () => {
  return localStorage.getItem('token') || '';
};

const setToken = token => {
  localStorage.setItem('token', token);
};

const exportObject = {
  getToken,
  setToken
};

export default exportObject;
