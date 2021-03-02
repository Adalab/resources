import _ from 'lodash';

const downloadGroup = (data, newData) => {
  const columnTitle = getColumnTitle(newData.columnId);
  const students = _.orderBy(data.students, newData.columnId);
  let fileContent = 'Preasignar nombre de sala,Dirección de correo electrónico\n';
  _.each(students, student => {
    fileContent += `${columnTitle} ${student[newData.columnId]},${student.email}\n`;
  });
  downloadFile('Breakout rooms.csv', fileContent);
};

const getColumnTitle = columnId => {
  return columnId.startsWith('team') ? 'Equipo' : 'Pareja';
};

const downloadFile = (fileName, fileContent) => {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
  element.setAttribute('download', fileName);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export default {
  downloadGroup
};
