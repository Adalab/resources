'use strict';

const fs = require('fs');
const _ = require('lodash');
const { parse } = require('json2csv');
const config = require('./config');
const source = require('./calendars/input.json');

// getters

const getName = name => {
  const nameTimes = getTimesFromName(name);
  if (!_.isEmpty(nameTimes)) {
    // remove text inside parentheses
    name = name.replace(/ *\([^)]*\) */g, '');
  }
  // remove break lines and extra spaces
  return _.trim(name.replace(/\n/g, ' ').replace(/ {2}/g, ' '));
};

const getDate = date => {
  date = date.split('/');
  return `${date[1]}/${date[0]}/${date[2]}`;
};

const getTime = (schedule, rowNumber, type, name) => {
  const times = getTimesFromName(name);
  return _.isEmpty(times) ? schedule[rowNumber][type] : times[type];
};

const getTimesFromName = name => {
  const bracketsTime = name.match(/\(([^)]+)\)/);
  if (bracketsTime) {
    let times = bracketsTime[1].replace(/[^0-9-:.]+/g, '');
    if (!_.isEmpty(times)) {
      times = times.replace(/\./g, ':');
      const [startTime, endTime] = times.split('-');
      return { startTime, endTime };
    }
  }
  return {};
};

const getTurn = (schedule, rowNumber) => {
  return schedule[rowNumber].turn;
};

const isValidEvent = (name, date, turn) => {
  if (!date.includes('/') && date.split('/').length !== 3) {
    // eslint-disable-next-line no-console
    console.log('Date format warning:', date, name, turn);
  } else {
    return !_.isEmpty(name) && turn === config.turn;
  }
};

// schedule

const getSchedule = () => {
  const result = {};
  _.each(source, (row, rowNumber) => {
    result[rowNumber] = {
      turn: row.turn,
      startTime: row.startTime,
      endTime: row.endTime
    };
  });
  return result;
};

// events & csv

const getEvents = schedule => {
  const result = [];
  _.each(source, (rowData, rowNumber) => {
    _.each(rowData, (name, date) => {
      if (isValidEvent(name, date, getTurn(schedule, rowNumber))) {
        result.push({
          [config.headers.subject]: getName(name),
          [config.headers.startDate]: getDate(date),
          [config.headers.startTime]: getTime(schedule, rowNumber, 'startTime', name),
          [config.headers.endDate]: getDate(date),
          [config.headers.endTime]: getTime(schedule, rowNumber, 'endTime', name)
        });
      }
    });
  });
  return result;
};

const getCsv = events => {
  return parse(events, {
    fields: _.values(config.headers)
  });
};

const exportToFile = csv => {
  fs.writeFileSync(config.outputPath, csv);
};

const schedule = getSchedule();
const events = getEvents(schedule);
const csv = getCsv(events);
exportToFile(csv);
