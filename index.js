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
  try {
    // Ensure creation of alreadyOwned before truncating
    fs.appendFile('./already_Owned.csv', '', function (err) {
      if (err) throw err;
      console.log('Saved already_Owned!');
    });

    // Ensure creation of to_Be_Purchased before truncating
    fs.appendFile('./to_Be_Purchased.csv', '', function (err) {
      if (err) throw err;
      console.log('Saved to_be_Purchased!');
    });

    // Ensure creation of not_Relevant before truncating
    fs.appendFile('./not_Relevant.csv', '', function (err) {
      if (err) throw err;
      console.log('Saved not_Relevant!');
    });

    // Truncate to_Be_Purchased before appending
    fs.truncateSync('./to_Be_Purchased.csv');

    // Truncate already_Owned before appending
    fs.truncateSync('./already_Owned.csv');

    // Truncate not_Relevant before appending
    fs.truncateSync('./not_Relevant.csv');

    // write headers for to_Be_Purchased.csv
    fs.createWriteStream('./to_Be_Purchased.csv', { flags: 'as' }).write(
      `ISBN + \n`
    );

    // write headers for already_Owned.csv
    fs.createWriteStream('./already_Owned.csv', { flags: 'as' }).write(
      `ISBN  \n`
    );
    setTimeout(function () {
      // For each loop to go over each object in the sheet
      df.forEach(item => {
        //console.log('item.ISBN ----  ', item.ISBN);
        let iggy = item.ISBN;
        if (!iggy) {
          iggy = 'Not Applicable';
          fs.createWriteStream('./not_Relevant.csv', { flags: 'a' }).write(
            iggy + '\n'
          );
          return;
        }
        fs.createWriteStream('./already_Owned.csv', { flags: 'a' }).write(
          iggy + '\n'
        );
      });
    }, 3000);
  } catch (error) {
    console.log('ERROR -------- ', error);
  }
  // Do a forEach loop over each object in the df array and write to a file.

  // Send a request to Alma (API or SRU) to determine if we Brandeis has an item.
  // https://developers.exlibrisgroup.com/alma/integrations/sru/

  // Consider getting rid of the IFEE if it is not needed.

  //console.log('data ----------------------- ', df);
  console.log('Can you see me now?');
})();
