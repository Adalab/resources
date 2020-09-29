// Instructions:
// - Open Airtable> "Evalución final 1"
// - Open Apps > Install the app "Script"
// - Edit tableName and viewName lines
// - Copy this code and run

const tableName = 'Evaluación final 1';
const viewName = 'Resultados';

// filter table fields by is not formula type
const table = base.getTable(tableName);
const fields = table.fields.filter(field => field.type !== 'formula');

// get view fields id
const view = table.getView(viewName);
const records = await view.selectRecordsAsync();
const recordsIds = records.recordIds;

// get and iterate records
const queryResult = await table.selectRecordsAsync();
recordsIds.forEach(recordId => {
  const record = queryResult.getRecord(recordId);
  // iterate table fields
  fields.forEach(field => {
    const cell = record.getCellValue(field.id);
    const fieldName = field.name
      .replace('Antes de la sesión', 'Ejercicio de evaluación')
      .replace('Durante la sesión', 'Entrevista técnica');
    if (Array.isArray(cell) && typeof cell[0] === 'string') {
      output.markdown('**' + fieldName + '**: ' + cell[0]);
    } else if (Array.isArray(cell) && typeof cell[0] === 'object') {
      output.markdown('**' + fieldName + '**: ' + cell[0].name);
    } else if (typeof cell === 'string') {
      output.markdown('**' + fieldName + '**: ' + cell);
    } else if (cell !== null) {
      output.markdown('**' + fieldName + '**: ' + cell.name);
    }
  });
  output.markdown('* * *');
});
