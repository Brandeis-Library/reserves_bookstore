const fs = require('fs');
const XLSX = require('xlsx');
const axios = require('axios');
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;

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

    // Ensure creation of errors before truncating
    fs.appendFile('./errors.csv', '', function (err) {
      if (err) throw err;
      console.log('Saved errors.csv');
    });

    // Truncate to_Be_Purchased before appending
    fs.truncateSync('./to_Be_Purchased.csv');

    // Truncate already_Owned before appending
    fs.truncateSync('./already_Owned.csv');

    // Truncate not_Relevant before appending
    fs.truncateSync('./not_Relevant.csv');

    // Truncate errors before appending
    fs.truncateSync('./errors.csv');

    // write headers for to_Be_Purchased.csv
    fs.createWriteStream('./to_Be_Purchased.csv', { flags: 'as' }).write(
      `Documents, ISBN, Title, Author  \n`
    );

    // write headers for errors.csv
    fs.createWriteStream('./errors.csv', { flags: 'as' }).write(
      `Documents, ISBN, Title, Author  \n`
    );

    // write headers for already_Owned.csv
    fs.createWriteStream('./already_Owned.csv', { flags: 'a' }).write(
      `Class,Documents,ISBN,Title,Author,Year Pub,Req-Rec   \n`
    );

    // For each loop to go over each object in the sheet
    let classInfo;
    let arrayISBNS = df.map(async item => {
      const obj = {};
      //console.log('item.ISBN ----  ', item.ISBN);
      //console.log('item ----  ', item);

      obj.iggy = item.ISBN;
      obj.title = item.TITLE;
      obj.author = item.AUTHOR;
      obj.year = item.YEAR;
      obj.itemStatus = item.TERM_USE;

      if (item.COURSE.length > 0) {
        classInfo = item.COURSE;
      } else {
        obj.classInfo = classInfo;
      }

      if (!item.YEAR) {
        obj.year = 'N/A';
      }

      if (!item.ISBN) {
        obj.iggy = 'Not Applicable';
        fs.createWriteStream('./not_Relevant.csv', { flags: 'a' }).write(
          obj.iggy + '\n'
        );
      }
      return obj;
    });
    let basicObjs = await Promise.all(arrayISBNS);
    console.log('basicObjs-----', basicObjs);

    // try {

    //     console.log('item ----------------- ', item);
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
    try {
      const completedObjs = basicObjs.map(async item => {
        if (item.iggy !== 'Not Applicable') {
          const results = await axios.get(
            `https://na01.alma.exlibrisgroup.com/view/sru/01BRAND_INST?version=1.2&operation=searchRetrieve&recordSchema=marcxml&query=alma.isbn=${item.iggy}`
          );
          let data = results.data;
          //data = data.toString();
          //console.log('doc +++++++++++++++++  ', data);
          const doc = new dom().parseFromString(data, 'text/html');
          //console.log('doc +++++++++++++++++  ', doc);
          const select = xpath.useNamespaces({
            x: 'http://www.loc.gov/zing/srw/',
          });
          let nodes = select('//x:numberOfRecords/text()', doc);
          //console.log('nodes---- ', nodes);
          item.nodes = nodes[0].toString();
        }
      });
      let objsToPrint = await Promise.all(completedObjs);
      console.log('objsToPrint -------- ', objsToPrint);

      // fs.createWriteStream('./already_Owned.csv', { flags: 'a' }).write(
      //   classInfo +
      //     ',' +
      //     nodes +
      //     ',' +
      //     iggy +
      //     ',' +
      //     title +
      //     ',' +
      //     author +
      //     ',' +
      //     year +
      //     ',' +
      //     itemStatus +
      //     ',' +
      //     '\n'
      // );
    } catch (error) {
      console.log('Error inside call to Ex Libris  *************** ', error);
      fs.createWriteStream('./errors.csv', { flags: 'a' }).write(iggy + '\n');
    }

    //console.log('arrayISBNS ========== ', arrayISBNS);
  } catch (error) {
    console.log('ERROR -------- ', error);
  }
  // Do a forEach loop over each object in the df array and write to a file.

  // Send a request to Alma (API or SRU) to determine if we Brandeis has an item.
  // https://developers.exlibrisgroup.com/alma/integrations/sru/

  // Consider getting rid of the IFEE if it is not needed.

  //console.log('data ----------------------- ', df);
  //console.log('arrayISBNS ========== ', arrayISBNS);
  console.log('Can you see me now?');
})();
