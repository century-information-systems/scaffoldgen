import fs, { writeFile } from "fs";
import path from "path";

import { splitByWord, writeToFile } from "./helper.js";
import WordsNinjaPack from "wordsninja";
// const WordsNinjaPack = require("wordsninja");
const WordsNinja = new WordsNinjaPack();
// await WordsNinja.loadDictionary(); // First load dictionary

let word = "EmployeeTermination";
// console.log(word.match(/\S+\s*/g));

let string = "EmployeeTermination";
// WordsNinja.addWords('Parsa');

let folderPath =
  "C:\\Users\\amnab\\Documents\\projects\\century\\teamapi-updated\\team-api\\src\\models";

let fileNames = [];
var potentialFolderNames = {};
const processFiles = async () => {
  await WordsNinja.loadDictionary(); // First load dictionary
  WordsNinja.addWords(["Kpi", "Cron"]); // Add one or more words

  //   var potentialFolderNames = [];
  let fileList = fs.readdirSync(folderPath);
  fileList.forEach((file) => {
    let filePath = path.join(folderPath, file);
    let extension = path.extname(filePath);
    let fileName = path.basename(filePath, extension);
    // console.log(path.basename(file));
    let fileStat = fs.statSync(filePath);

    if (fileStat.isFile()) {
      let newFolderName = WordsNinja.splitSentence(fileName)[0].toLowerCase();

      let keys = Object.keys(potentialFolderNames);
      if (keys.length > 0) {
        for (let key in potentialFolderNames) {
          // key = key.toLowerCase();
          let found =
            key.includes(newFolderName) || newFolderName.includes(key);
          if (found) {
            // addToList(newFolderName);
            // potentialFolderNames.push(newFolderName);
            // console.log("Found:", key, newFolderName);
            if (!potentialFolderNames[key].includes(filePath))
              potentialFolderNames[key].push(filePath);
          } else {
            if (
              potentialFolderNames[newFolderName] &&
              !potentialFolderNames[newFolderName].includes(filePath)
            ) {
              potentialFolderNames[newFolderName].push(filePath);
              // console.log("New folder name: ", newFolderName, "also found.");
            } else {
              // console.log("Not Found:", key, newFolderName);
              potentialFolderNames[newFolderName] = [filePath];
            }
          }
        }
      } else {
        // console.log("executed once");
        potentialFolderNames[newFolderName] = [filePath];
      }
      // let found = keys.find(
      //   (a) => a.includes(newFolderName) || newFolderName.includes(a)
      // );
    }
  });

  writeToFile(
    "output",
    "foldernames.json",
    JSON.stringify(potentialFolderNames)
  );
  // console.log(potentialFolderNames);
};

function addToList(name) {
  //   console.log(name);
  potentialFolderNames.push(name);
}

processFiles();
// let words = WordsNinja.splitSentence(string);
// console.log(words);
// console.log(potentialFolderNames);

function getFiles(path) {
  return fs.readdir;
}
