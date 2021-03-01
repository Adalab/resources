import _ from 'lodash';
import utils from '../utils/index';

export default props => {
  const handleSelect = ev => {
    props.handleData('changeGroup', {
      studentId: props.student.id,
      groupId: props.groupId,
      value: ev.target.value
    });
  };

  const renderNumber = () => {
    return props.value;
  };

  const renderSelect = () => {
    return (
      <select className="select" value={props.value} onChange={handleSelect}>
        <option></option>
        {renderSelectOptions()}
      </select>
    );
  };

  const renderSelectOptions = () => {
    const maxGroupNumbers = utils.group.getMaxGroupNumbers(props.data, props.groupName);
    return _.range(0, maxGroupNumbers).map(index => {
      return <option key={index}>{index + 1}</option>;
    });
  };

  const renderTdClassName = () => {
    const isRepeated = props.student.repetitions[props.groupId];
    return isRepeated ? 'cell cell-group bg-danger' : 'cell cell-group';
  };

  return (
    <td className={renderTdClassName()}>
      {utils.column.isBlocked(props.data, props.groupId) ? renderNumber() : renderSelect()}
    </td>
  );
};
