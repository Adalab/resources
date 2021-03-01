import _ from 'lodash';

// public

const init = data => {
  data.students = data.students.map((student, index) => {
    initStudentId(data, index);
    initStudentLevel(data, index);
    initStudentTeacherId(data, index);
    return student;
  });
};

// helpers

const initStudentId = (data, index) => {
  const student = data.students[index];
  student.id = student.id || `${index} ${student.name}`;
};

const initStudentLevel = (data, index) => {
  const student = data.students[index];
  student.level = student.level || 1;
};

const initStudentTeacherId = (data, index) => {
  const teachers = data.students.map(student => student.teacher);
  const uniqueTeachers = _.uniq(teachers);
  const student = data.students[index];
  student.teacherId = uniqueTeachers.indexOf(student.teacher);
};

export default {
  init
};
