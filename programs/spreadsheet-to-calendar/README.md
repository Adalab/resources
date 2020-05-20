# Conversor de Spreadsheet a Calendar

## Paso 1: Limpiar el formato del spreadsheet

Crear un nuevo spreadsheet con el siguiente formato

| turn   | startTime | endTime | 11/10/2019                                                     | 14/10/2019                                               | 15/10/2019                           |
| ------ | --------- | ------- | -------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------ |
| Mañana | 8:00      | 10:10   | Intro al espacio de trabajoSP 1.1 Intro a la web               | SP 1.2 Mi primera página web                             | SP 1.3Modelo de cajas y herramientas |
| Mañana | 10:30     | 12:00   | DP 1.2 Herramientas 1                                          | DP 1.3 Scrum Master: planning & working agreements       | Proyecto                             |
| Mañana | 12:15     | 14:00   | DP 1.1 Intro a agile y SCRUM                                   | Presentación proyecto y planning                         | DP 1.4 Herramientas 2                |
| Tarde  | 15:00     | 16:45   | Intro al espacio de trabajoSP 1.1Intro a la web (15.00- 17.10) | SP 1.2Mi primera página web (15.00-17.10)                | DP 1.4 Herramientas 2                |
| Tarde  | 17:00     | 19:10   | DP 1.1 Intro a agile y SCRUM (17.30- 19.15)                    | DP 1.3 SCRUM planning y working agreements (17.30-19.00) | SP 1.3Modelo de cajas y herramientas |
| Tarde  | 19:30     | 21:00   | DP 1.2 Herramientas 1 (19.30- 21.00)                           | Presentación proyecto y planning (19.15-21.00)           | Proyecto                             |

## Paso 2: Convertir a JSON

- Descargar el spreadsheet en formato CSV
- Convertir a JSON a través de https://www.csvjson.com/csv2json
- Guardar en `./calendars/input.json`

## Paso 3: Elegir turno

- Editar `./config.js` > `turn`

```javascript
module.exports.turn = "Mañana";
// module.exports.turn = 'Tarde';
```

## Paso 4: Generar el nuevo CSV

```bash
npm start
```

Warnings: si solo salen warnings en consola haciendo referencia a elementos como `turn`, `Mañana`, `Tarde` y horas sueltas es que los datos de entrada están bien. Si hay warnings que tengan el título del algún evento, ese evento está mal formateado.

## Paso 5: Importar el CSV en Google Calendar

- https://support.google.com/calendar/answer/37118?hl=es

## Paso 6: Repasar eventos

- Revisar eventos conjuntos de tarde y mañana
- Duplicar los eventos conjuntos en el calendario de la tarde
