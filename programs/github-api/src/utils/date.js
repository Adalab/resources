const format = date => {
  date = new Date(date);
  const day = date.getDate(date);
  const dayParsed = day < 10 ? '0' + day : day;
  const month = date.getMonth(date) + 1;
  const monthParsed = month < 10 ? '0' + month : month;
  const year = date.getFullYear(date);
  return `${dayParsed}/${monthParsed}/${year}`;
};

const exportObject = {
  format
};

export default exportObject;
