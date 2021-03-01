import _ from 'lodash';
import utils from '../utils/index';

export default props => {
  const handleSelect = ev => {
    props.handleData('changeLevel', {
      studentId: props.student.id,
      value: ev.target.value
    });
  };

  const renderNumber = () => {
    return <td className="cell cell-level">{props.value}</td>;
  };

  const renderSelect = () => {
    return (
      <td className="cell cell-level">
        <select className="select" value={props.value} onChange={handleSelect}>
          {renderSelectOptions()}
        </select>
      </td>
    );
  };

  const renderSelectOptions = () => {
    return _.range(props.data.maxLevelNumbers).map(index => {
      return <option key={index}>{index + 1}</option>;
    });
  };

  return utils.column.isBlocked(props.data, 'level') ? renderNumber() : renderSelect();
};
