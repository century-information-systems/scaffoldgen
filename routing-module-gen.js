import { writeToFile, capitaliseFirstWord } from "./helper.js";

export function generateRoutingModule(module) {
  let angularImports =
    "import { Routes, RouterModule } from '@angular/router';";
  let routes = [];
  let output = angularImports;
  module.components.forEach((component) => {
    let capitalisedCompName = capitaliseFirstWord(component.name);
    let cmp = `${capitalisedCompName}Component`;

    routes.push(
      `\n{path: '${component.name}', component: ${capitalisedCompName}Component, data: {breadcrumb: '${capitalisedCompName}'}}`
    );
    // imports
    let componentImport = `\nimport { ${cmp} } from \'/${component.name}.component\';`;
    output += componentImport;
  });

  output += `\nconst routes: Routes = [{
        path: '',
        data: {breadcrumb: '${capitaliseFirstWord(module.name)}'},
        children: [
            ${routes}
        ]}
    ];`;

  output +=
    "\n@NgModule({\
        imports: [RouterModule.forChild(routes)],\
        exports: [RouterModule]\
    })";
  output += `\nexport class ${capitaliseFirstWord(
    module.name
  )}RoutingModule {}`;

  writeToFile(
    `output/${module.name}`,
    `${module.name}-routing.module.ts`,
    output
  );
}
