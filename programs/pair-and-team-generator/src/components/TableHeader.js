import _ from 'lodash';
import ButtonIcon from './ButtonIcon';
import utils from '../utils/index';
import '../stylesheets/TableHeader.scss';

export default props => {
  const renderTeacherCell = () => {
    return (
      <th className="cell cell-teacher">
        Profesora
        <div className="btn-icons-group">{renderSortIcon('teacherId')}</div>
      </th>
    );
  };

  const renderLevelCell = () => {
    return (
      <th className="cell cell-level">
        Nivel
        <div className="btn-icons-group">
          {renderSortIcon('level')}
          {renderBlockIcon('level')}
        </div>
      </th>
    );
  };

  const renderStudentCell = () => {
    return (
      <th className="cell cell-student">
        Alumna
        <div className="btn-icons-group">{renderSortIcon('level')}</div>
      </th>
    );
  };

  const renderGroupCells = (groupName, title) => {
    return utils.group.parseToArray(props.data, groupName).map(group => {
      return (
        <th key={group.id} className="cell cell-group">
          {title}
          {group.index}
          <div className="btn-icons-group">
            {renderSortIcon(group.id)}
            {renderBlockIcon(group.id)}
            {renderSyncIcon(group.id, groupName)}
            {renderDownload(group.id)}
          </div>
        </th>
      );
    });
  };

  const renderSyncIcon = (groupId, groupName) => {
    if (!utils.column.isBlocked(props.data, groupId)) {
      return (
        <ButtonIcon
          title="Generar esta columna"
          icon="sync"
          onClick={() => props.handleData('generateGroups', { groupId, groupName })}
        />
      );
    }
  };

  const renderBlockIcon = columnId => {
    return (
      <ButtonIcon
        title="Des / bloquear esta columna"
        icon={utils.column.isBlocked(props.data, columnId) ? 'lock' : 'unlock'}
        onClick={() => props.handleData('toggleBlockColumn', { columnId })}
      />
    );
  };

  const renderSortIcon = columnId => {
    return (
      <ButtonIcon
        title="Ordenar por esta columna"
        icon="chevron-down"
        onClick={() => props.handleData('sortColumn', { columnId })}
      />
    );
  };

  const renderDownload = columnId => {
    return (
      <ButtonIcon
        title="Descargar CSV para Zoom"
        icon="download"
        onClick={() => props.handleData('downloadGroup', { columnId })}
      />
    );
  };

  return (
    <thead className="thead">
      <tr>
        {renderTeacherCell()}
        {renderLevelCell()}
        {renderStudentCell()}
        {renderGroupCells('team', 'Equipo del módulo ')}
        {renderGroupCells('pair', 'Pareja del sprint ')}
      </tr>
    </thead>
  );
};
