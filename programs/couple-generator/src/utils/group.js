import _ from 'lodash';
import level from './level';

const change = (data, newData) => {
  const student = data.students.find(student => student.id === newData.studentId);
  const value = parseInt(newData.value);
  if (isNaN(value)) {
    delete student[newData.groupId];
  } else {
    student[newData.groupId] = parseInt(newData.value);
  }
};

const generate = (data, newData) => {
  level.setRandomLevel(data);
  level.sortByRandomLevel(data);
  generateGroups(data, newData.groupId, newData.groupName);
  logLevelAverage(data, newData.groupId);
};

const getMaxGroupNumbers = (data, groupName) => {
  return data[`max${_.capitalize(groupName)}Numbers`];
};

const parseToArray = (data, groupName) => {
  return _.range(1, getGroupModules(data, groupName) + 1).map(index => {
    return {
      id: `${groupName}-${index}`,
      index,
      name: groupName
    };
  });
};

// helpers

const generateGroups = (data, groupId, groupName) => {
  const bestStudents = [];
  const worstStudents = [];
  const maxGroupNumbers = getMaxGroupNumbers(data, groupName);
  for (let index = 0; data.students.length > 0; index += 1) {
    const number = (index % maxGroupNumbers) + 1;
    const bestStudent = data.students.shift();
    const worstStudent = data.students.pop();
    bestStudent[groupId] = number;
    worstStudent[groupId] = number;
    bestStudents.push(bestStudent);
    worstStudents.push(worstStudent);
  }
  data.students = bestStudents.concat(worstStudents);
};

const getGroupModules = (data, groupName) => {
  return data[`${groupName}Modules`];
};

const getGroupName = groupId => {
  const groupNameEndPosition = groupId.includes('-') ? groupId.indexOf('-') : Infinity;
  return groupId.substr(0, groupNameEndPosition);
};

const logLevelAverage = (data, groupId) => {
  const groupName = getGroupName(groupId);
  const studentsGroupedByColumn = _.groupBy(data.students, groupId);
  _.forEach(studentsGroupedByColumn, (students, number) => {
    console.log(`${groupName} ${number} level: ${_.sumBy(students, 'level') / students.length}`);
  });
};

export default {
  change,
  generate,
  getMaxGroupNumbers,
  parseToArray
};
