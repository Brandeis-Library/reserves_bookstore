# _{reserves_bookstore}_

#### _{App to convert data from Brandeis bookstore class books list to a more readable format for the acquistions department.}_

#### By _**{Chris Underwood, Library Application Developer, Brandeis University}**_

## Description

_{App to convert data from Brandeis bookstore class books list to a more readable format for the acquistions department. The purpose is to help ACQ be more effient to see what items are physical and which are electronic as ACQ tends to want to purchase physical items for reserves. A quick link is also provided to see what the current status is.

The app currently saves the data into final.csv.

To get the data ready for the end user, three final things must be done to to the csv file: 1) save the file as xslx, 2) covert the ISBN field to number format with 0 decimal places, and 3) =HYPERLINK(I2,"Link") for the link in column j. Remember to copy it all the way down so you get links for everything.}_

## Setup/Installation Requirements

* _Make sure you have Node.js installed globally
* _Clone or fork the files to a location of your choice
* _Go to the folder/location of the download or where you have moved the files
* _Run npm i
* _Bring your Excel file into the root of the directory
* _Change the column headings to reflect TestData.xlsx
* _If you have different column headings, you will need to make matching changes to the program to add/change the data labels.
* _Run node index.js in the command line
* _View final.csv to see the completed data.


_{Leave nothing to chance! You want it to be easy for potential users, employers and collaborators to run your app. Do I need to run a server? How should I set up my databases? Is there other code this application depends on? We recommend deleting the project from your desktop, re-cloning the project from GitHub, and writing down all the steps necessary to get the project working again.}_


## Known Bugs

_Not all of the desired formatting is covered in the Node processing. This is covered in more detail in the Description section._

## Contact Information

_{libsys-group at brandeis dot edu}_

## Technologies Used

{node.js, exlibris alma usr api, axios, xml, xslm, xmldom, xpath, Excel }


## License

_{MIT License

Copyright (c) [2020][brandeis university library]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.}*

Copyright (c) 2020 {Chris Underwood, Library Applicaiton Developer, Brandeis University}


