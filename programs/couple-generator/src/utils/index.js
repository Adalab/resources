import _ from 'lodash';
import config from './config';
import column from './column';
import group from './group';
import level from './level';
import repetitions from './repetitions';
import student from './student';

const init = data => {
  data.students = _.orderBy(data.students, ['teacher', 'name']);
  config.init(data);
  column.init(data);
  repetitions.init(data);
  student.init(data);
  return data;
};

export default {
  init,
  config,
  column,
  group,
  level,
  repetitions,
  student
};
