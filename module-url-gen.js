import {
    writeToFile,
    removeHyphen
} from './helper.js';

export function generateUrl(module) {
    let output = '';
    let apiImport = '\nimport { API_URL } from \'../services/app-config\';';
    let urls = {}
    let componentUrls = `\nexport let ${module.name}Url = {`;
    module.components.forEach(component => {
        let noHypenName = removeHyphen(component.name);
        componentUrls += `
        ${noHypenName}: {
            add: API_URL + "${noHypenName}/add",
            update: API_URL + "${noHypenName}/update",
            list: API_URL + "${noHypenName}/list",
            get: API_URL + "${noHypenName}/get"
        },`
    });

    componentUrls += "\n};"

    output += apiImport;
    output += componentUrls;

    writeToFile(
        `output/${module.name}`,
        `${module.name}-url.ts`,
        output
    );
}