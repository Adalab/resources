const initialColumnBlockStatus = true;

const init = data => {
  data.blockedColumns = data.blockedColumns || {};
  initLevelColumn(data);
  initGroupColumns(data, 'team', data.teamModules);
  initGroupColumns(data, 'pair', data.pairModules);
};

const initLevelColumn = data => {
  data.blockedColumns.level = initialColumnBlockStatus;
};

const initGroupColumns = (data, group, modules) => {
  for (let index = 1; index <= modules; index += 1) {
    const columnId = `${group}-${index}`;
    data.blockedColumns[columnId] =
      data.blockedColumns[columnId] === undefined
        ? initialColumnBlockStatus
        : data.blockedColumns[columnId];
  }
};

const isBlocked = (data, columnId) => {
  return data.blockedColumns[columnId];
};

const toggleBlock = (data, newData) => {
  data.blockedColumns[newData.columnId] = !data.blockedColumns[newData.columnId];
};

export default {
  init,
  isBlocked,
  toggleBlock
};
