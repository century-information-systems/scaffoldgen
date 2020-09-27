const fs = require('fs')

//read blueprint
let data = fs.readFileSync('blueprint.json');

let paresedData = JSON.parse(data);
let genereatedMoudule = 'import { NgModule } from \'@angular/core\';' +
    '\nimport { CommonModule } from \'@angular/common\';' +
    '\nimport { SharedModule } from \'../shared.module\';' +
    '\nimport { FormsModule } from \'@angular/forms\';' +
    '\nimport { NgSelectModule } from \'@ng-select/ng-select\';' +
    '\nimport { MatStepperModule, MatIconModule, MatTableModule, MatSortModule, MatPaginatorModule } from \'@angular/material\';' +
    '\nimport { DxSelectBoxModule, DxTextAreaModule, DxDateBoxModule, DxFormModule, DxDataGridModule, DxSpeedDialActionModule, DxPivotGridModule } from \'devextreme-angular\';';

let imports = [];
let declarations = [];
// go through each module
paresedData.modules.forEach(module => {
    console.log(module);
    // imports
    let routingModule = `${capitaliseFirstWord(module.name)}RoutingModule`;
    let componentImport = `\nimport { ${routingModule } } from \'./${ module.name}-routing.module\';`;
    imports.push(routingModule);

    module.components.forEach(component => {
        let cmp = `${capitaliseFirstWord(component.name)}Component`;
        // imports
        componentImport += `\nimport { ${cmp} } from \'/${component.name}.component\';`;
        declarations.push(cmp);
    });

    genereatedMoudule += componentImport;

    genereatedMoudule += `\n@NgModule({
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


    genereatedMoudule += `\nexport class ${capitaliseFirstWord(module.name)}Module { }`



    fs.writeFile(`${module.name}.module.ts`, genereatedMoudule, (err) => {

        // In case of a error throw err. 
        if (err) throw err;
    })
});

function capitaliseFirstWord(word) {
    return word.replace(/-/g, str => '')
        // Convert words to lower case and add hyphens around it (for stuff like "&")
        .replace(/^./g, a => a.toUpperCase());
}