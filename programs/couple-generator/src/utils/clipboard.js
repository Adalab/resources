import group from './group';

const copy = (data, type) => {
  if (type === 'excel') {
    navigator.clipboard.writeText(copyToExcel(data));
  } else {
    navigator.clipboard.writeText(copyToJson(data));
  }
};

const copyToExcel = data => {
  let clipboardText = '';
  data.students.forEach(student => {
    const clipboardArray = [];
    clipboardArray.push(student.teacher);
    clipboardArray.push(student.name);
    group.parseToArray(data, 'team').forEach(group => clipboardArray.push(student[group.id]));
    group.parseToArray(data, 'pair').forEach(group => clipboardArray.push(student[group.id]));
    clipboardText += clipboardArray.join('\t') + '\n';
  });
  return clipboardText;
};

const copyToJson = data => {
  const invalidKeys = [
    'id',
    'randomLevel',
    'repetitions',
    'teacherId',
    'maxTeamNumbers',
    'maxPairNumbers',
    'maxLevelNumbers',
    'blockedColumns'
  ];
  const jsonReplacer = (key, value) => {
    if (invalidKeys.includes(key)) {
      return undefined;
    } else {
      return value;
    }
  };
  return JSON.stringify(data, jsonReplacer, 2);
};

export default {
  copy
};
