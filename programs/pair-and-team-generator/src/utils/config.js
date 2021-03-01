import _ from 'lodash';

const init = data => {
  initMaxTeamNumber(data);
  initMaxPairNumber(data);
  initMaxLevelNumber(data);
};

const initMaxTeamNumber = data => {
  data.maxTeamNumbers = Math.floor(data.students.length / data.numberOfPeopleInATeam);
};

const initMaxPairNumber = data => {
  data.maxPairNumbers = Math.floor(data.students.length / data.numberOfPeopleInAPair);
};

const initMaxLevelNumber = data => {
  const studentsGroupedByTeacher = _.groupBy(data.students, 'teacher');
  const lengthsInString = _.keys(_.groupBy(studentsGroupedByTeacher, 'length'));
  const lengths = _.map(lengthsInString, _.parseInt);
  data.maxLevelNumbers = _.max(lengths);
};

export default {
  init
};
