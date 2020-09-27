import {
    createRequire
} from "module";
const require = createRequire(
    import.meta.url);
const fs = require("fs");

export function capitaliseFirstWord(word) {
    return (
        word
        .replace(/-/g, (str) => "")
        // Convert words to lower case and add hyphens around it (for stuff like "&")
        .replace(/^./g, (a) => a.toUpperCase())
    );
}

export function removeHyphen(word) {
    return word.replace(/-/g, (str) => "");
}

export function splitByWord(string) {
    return string.match(/\w+/g);
}

export function writeToFile(path, filename, content) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    fs.writeFile(path + "/" + filename, content, (err) => {
        // In case of a error throw err.
        if (err) throw err;
    });
}

export function readJsonFile(filename) {
    let data = fs.readFileSync(filename);
    return JSON.parse(data);
}