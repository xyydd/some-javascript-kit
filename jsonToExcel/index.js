const fs = require('fs')
let converter = require('json-2-csv');
const data = require('./t.json');
// console.log(data.length);

const csv = converter.json2csv(data)
fs.writeFile('./data.csv', csv, err => {
  if (err) {
    console.log(err);
  }
})
