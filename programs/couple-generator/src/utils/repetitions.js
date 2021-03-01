import _ from 'lodash';

const init = data => {
  _.each(data.students, student => {
    initStudentPairs(data, student);
  });
};

const setRepetitions = data => {
  _.each(data.students, student => {
    initStudentPairs(data, student);
    setStudentPairs(data, student);
    setStudentRepetitions(data, student);
  });
};

// helpers

const initStudentPairs = (data, student) => {
  student.repetitions = {};
};

const setStudentPairs = (data, student) => {
  for (let module = 1; module <= data.pairModules; module += 1) {
    setStudentModulePair(data, student, module);
  }
};

const setStudentModulePair = (data, student, module) => {
  const groupId = `pair-${module}`;
  const modulePairs = data.students.filter(
    pair => !!pair[groupId] && pair.id !== student.id && pair[groupId] === student[groupId]
  );
  student.repetitions[groupId] = _.map(modulePairs, 'id');
};

const setStudentRepetitions = (data, student) => {
  const newRetetitions = {};
  _.each(student.repetitions, (modulePairsIds, groupId) => {
    newRetetitions[groupId] = setStudentModuleRepetition(modulePairsIds, student.repetitions);
  });
  student.repetitions = newRetetitions;
};

const setStudentModuleRepetition = (modulePairsIds, allPairsIds) => {
  allPairsIds = _.flattenDeep(_.values(allPairsIds));
  for (const modulePairId of modulePairsIds) {
    const occurrences = allPairsIds.filter(allPairId => allPairId === modulePairId);
    if (occurrences.length > 1) {
      return true;
    }
  }
  return false;
};

export default {
  init,
  setRepetitions
};
