import {
    capitaliseFirstWord,
    readJsonFile,
    writeToFile
} from "./helper.js";
import {
    generateRoutingModule
} from "./routing-module-gen.js";
import {
    generateUrl
} from "./module-url-gen.js";
import {
    generateComponent
} from "./component.gen.js";

//read blueprint
let paresedData = readJsonFile("blueprint.json");

let anuglarImports =
    "import { NgModule } from '@angular/core';" +
    "\nimport { CommonModule } from '@angular/common';" +
    "\nimport { SharedModule } from '../shared.module';" +
    "\nimport { FormsModule } from '@angular/forms';" +
    "\nimport { NgSelectModule } from '@ng-select/ng-select';" +
    "\nimport { MatStepperModule, MatIconModule, MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';" +
    "\nimport { DxSelectBoxModule, DxTextAreaModule, DxDateBoxModule, DxFormModule, DxDataGridModule, DxSpeedDialActionModule, DxPivotGridModule } from 'devextreme-angular';";

// go through each module
paresedData.modules.forEach((module) => {
    let output = anuglarImports;
    let imports = [];
    let declarations = [];
    console.log(module);
    // imports
    let routingModule = `${capitaliseFirstWord(module.name)}RoutingModule`;
    let componentImport = `\nimport { ${routingModule} } from \'./${module.name}-routing.module\';`;
    imports.push(routingModule);

    module.components.forEach((component) => {
        let cmp = `${capitaliseFirstWord(component.name)}Component`;
        // imports
        componentImport += `\nimport { ${cmp} } from \'/${component.name}.component\';`;
        declarations.push(cmp);
    });

    output += componentImport;

    output += `\n@NgModule({
        imports: [
            CommonModule,
            ${imports},
            FormsModule,
            NgSelectModule,
            MatStepperModule,
            MatIconModule,
            DxSelectBoxModule,
            DxTextAreaModule,
            DxDateBoxModule,
            DxFormModule,
            DxDataGridModule,
            DxSpeedDialActionModule,
            DxPivotGridModule
        ],
        declarations: [${declarations}], 
    })`;

    output += `\nexport class ${capitaliseFirstWord(module.name)}Module { }`;
    generateRoutingModule(module);
    generateUrl(module);
    generateComponent(module);


    writeToFile(`output/${module.name}`, `${module.name}.module.ts`, output);
});