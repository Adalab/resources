import _ from 'lodash';
import { useState } from 'react';
import CellLevel from './CellLevel';
import CellTeacher from './CellTeacher';
import CellGroup from './CellGroup';
import CellStudent from './CellStudent';
import Header from './Header';
import TableHeader from './TableHeader';
import utils from '../utils/index';
import initialData from '../data/data.json';
import '../stylesheets/App.scss';

console.clear();

const App = () => {
  const [data, setData] = useState(utils.init(initialData));
  const [order, setOrder] = useState('teacherId');
  const [showExportView, setShowExportView] = useState(false);
  console.log(data);

  const handleData = (action, newData) => {
    let result = _.cloneDeep(data);
    switch (action) {
      case 'changeLevel':
        utils.level.change(result, newData);
        setOrder('teacherId');
        break;
      case 'changeGroup':
        utils.group.change(result, newData);
        setOrder(newData.groupId);
        break;
      case 'generateGroups':
        utils.group.generate(result, newData);
        setOrder(newData.groupId);
        break;
      case 'sortColumn':
        setOrder(newData.columnId);
        break;
      case 'toggleBlockColumn':
        utils.column.toggleBlock(result, newData);
        break;
    }
    setData(result);
  };

  const renderTableBody = () => {
    const students = _.orderBy(data.students, [order, 'level', 'name']);
    utils.repetitions.setRepetitions(data);
    return students.map(student => {
      return (
        <tr key={student.name} className={renderRowClassName(student)}>
          <CellTeacher student={student} />
          <CellLevel
            student={student}
            data={data}
            value={student.level}
            showExportView={showExportView}
            handleData={handleData}
          />
          <CellStudent student={student} data={data} handleData={handleData} />
          {renderStudentCells(student, 'team')}
          {renderStudentCells(student, 'pair')}
        </tr>
      );
    });
  };

  const renderRowClassName = student => {
    return `table-row row-${student[order] % 2 ? 'odd' : 'even'}`;
  };

  const renderStudentCells = (student, column) => {
    return utils.group.parseToArray(data, column).map(group => {
      return (
        <CellGroup
          key={group.id}
          data={data}
          groupId={group.id}
          groupName={group.name}
          student={student}
          value={student[group.id]}
          showExportView={showExportView}
          handleData={handleData}
        />
      );
    });
  };

  return (
    <div className={showExportView ? 'export-view' : ''}>
      <Header showExportView={showExportView} toggleShowExportView={setShowExportView} />
      <table className="table">
        <TableHeader data={data} showExportView={showExportView} handleData={handleData} />
        {renderTableBody()}
      </table>
    </div>
  );
};

export default App;
