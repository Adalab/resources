var colName = 0;
var colWeek1 = 2;
var colWeek2 = 3;
var colWeek3 = 4;
var colWeek4 = 6;
var colWeek5 = 7;
var colWeek6 = 8;
var colWeek7 = 10;
var colWeek8 = 11;
var colWeek9 = 12;
var colResultOthers = 'N';
var colResultCouple = 'O';
var colResultRepeated = 'P';
var rowFirst = 2;

function start() {
  setDataBySheet('Mañana');
  setDataBySheet('Tarde');
}

function setDataBySheet(sheet) {
  var sheets = getSheets(sheet);
  var rawData = getSheetsData(sheets);
  var data = sanitazeSheetsData(rawData)[0];
  setCouples(data);
  setOthers(data);
  setRepeated(data);
  showResults(data, sheet);
}

function getSheets(sheetName) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets().filter(function (sheet) {
    return sheet.getSheetName() === sheetName;
  });
}

function getSheetsData(sheets) {
  return sheets.map(function (sheet) {
    return sheet.getDataRange().getValues();
  });
}

function sanitazeSheetsData(sheets) {
  var result = [];
  for (var sheet = 0; sheet < sheets.length; sheet += 1) {
    result.push([]);
    for (var row = rowFirst; row < sheets[sheet].length; row += 1) {
      result[sheet].push({
        name: sheets[sheet][row][colName],
        raw: [
          sheets[sheet][row][colWeek1],
          sheets[sheet][row][colWeek2],
          sheets[sheet][row][colWeek3],
          sheets[sheet][row][colWeek4],
          sheets[sheet][row][colWeek5],
          sheets[sheet][row][colWeek6],
          sheets[sheet][row][colWeek7],
          sheets[sheet][row][colWeek8],
          sheets[sheet][row][colWeek9]
        ]
      })
    }
  }
  return result;
}

function setCouples(data) {
  data.forEach(function (user) {
    user.couples = [];
    user.raw.forEach(function (coupleNumber, weekIndex) {
      if (coupleNumber) {
        var couples = getCouplesByWeek(data, user, coupleNumber, weekIndex);
        user.couples = user.couples.concat(couples);
      }
    });
  });
}

function getCouplesByWeek(data, currentUser, coupleNumber, weekIndex) {
  return data.filter(function (user) {
    return user.name !== currentUser.name && user.raw[weekIndex] === coupleNumber;
  })
    .map(function (user) {
      return user.name;
    });
}

function setOthers(data) {
  var names = getAllNames(data);
  data.forEach(function (user) {
    user.others = getOthers(names, user);
  })
}

function getAllNames(data) {
  return data.map(function (user) {
    return user.name
  })
}

function getOthers(names, user) {
  return names.filter(function (name) {
    return user.couples.indexOf(name) < 0 && user.name !== name;
  })
}

function setRepeated(data) {
  data.forEach(function (user) {
    user.repeatedCouple = unique(user.couples).length < user.couples.length;
  });
}

function unique(arr) {
  return arr.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}

function showResults(data, sheetName) {
  var sheets = getSheets(sheetName);
  return sheets.forEach(function (sheet) {
    data.forEach(function (user, userNumber) {
      var resultCoupleCell = colResultCouple + (rowFirst + 1 + userNumber);
      sheet.getRange(resultCoupleCell).setValue(user.couples.join(', '));
      var resultOthersCell = colResultOthers + (rowFirst + 1 + userNumber);
      sheet.getRange(resultOthersCell).setValue(user.others.join(', '));
      var resultRepeatedCell = colResultRepeated + (rowFirst + 1 + userNumber);
      sheet.getRange(resultRepeatedCell).setValue(user.repeatedCouple);
    });
  });
}
