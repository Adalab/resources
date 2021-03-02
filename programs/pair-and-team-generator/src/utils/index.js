import _ from 'lodash';
import clipboard from './clipboard';
import config from './config';
import column from './column';
import download from './download';
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
  clipboard,
  config,
  column,
  download,
  group,
  level,
  repetitions,
  student
};
