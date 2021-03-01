import _ from 'lodash';

const change = (data, newData) => {
  const student = data.students.find(student => student.id === newData.studentId);
  student.level = parseInt(newData.value);
};

const setRandomLevel = data => {
  data.students.forEach(student => {
    student.randomLevel = student.level + Math.random() - 1;
  });
};

const sortByRandomLevel = data => {
  data.students = _.orderBy(data.students, 'randomLevel');
};

export default {
  change,
  sortByRandomLevel,
  setRandomLevel
};
