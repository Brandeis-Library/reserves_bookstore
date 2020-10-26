const fs = require('fs');
XLSX = require('xlsx');

(async function () {
  const workbook = XLSX.readFile('TestData.xlsx');
  //console.log('workbook ---------- ', workbook);
  const sheetNames = workbook.SheetNames;
  const sheetIndex = 1;

  var df = XLSX.utils.sheet_to_json(
    workbook.Sheets[sheetNames[sheetIndex - 1]]
  );

  // Truncate to_Be_Purchased before appending
  fs.truncateSync('./to_Be_Purchased.csv');

  // write headers for to_Be_Purchased.csv
  fs.createWriteStream('./to_Be_Purchased.csv', { flags: 'a' }).write(`ISBN`);

  // Truncate already_Owned before appending
  fs.truncateSync('./already_Owned.csv');

  // write headers for already_Owned.csv
  fs.createWriteStream('./already_Owned.csv', { flags: 'a' }).write(`ISBN`);

  // Do a forEach loop over each object in the df array and write to a file.

  // Send a request to Alma (API or SRU) to determine if we Brandeis has an item.
  // https://developers.exlibrisgroup.com/alma/integrations/sru/

  // Consider getting rid of the IFEE if it is not needed.

  console.log('data ----------------------- ', df);
  console.log('Can you see me now?');
})();
