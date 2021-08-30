const path = require('path');

const fs = require('fs'); // file system

let fileOne = path.join(__dirname, 'files/one.txt');
// console.log(fileOne);

//blocking model/synchronous of reading files
let dataOne = fs.readFileSync(fileOne, 'utf-8');
let dataThree = fs.writeFileSync(
  path.join(__dirname, 'files/my.txt'),
  `my new data ${dataOne} 😊😊`
);
console.log(dataOne);

let fileTwo = path.join(__dirname, 'files/Two.txt');
let dataTwo = fs.readFileSync(fileTwo, 'utf-8');
console.log(dataTwo);

// const { data, getAge } = require('./first');

// let age = getAge(2000);
// console.log(data);
// console.log(age);

// for (let index = 0; data < data.length; data++) {
//   const element = data[index];
//   console.log(element);
// }

// data.forEach((element, index) => {
//   console.log(index + 1, element);
// });

// data.map((el, id) => {
//   console.log({ ...el, id });
// });
