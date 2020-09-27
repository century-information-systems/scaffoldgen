import {
    capitaliseFirstWord,
    removeHyphen,
    splitByWord,
    writeToFile
} from "./helper.js";

export function generateComponent(module) {
    let output = '';
    let imports = 'import { Component, OnInit, ViewChild} from \'@angular/core\';\
    \nimport { HttpService } from \'src/app/services/http.service\';' +
        `\nimport { ${module.name}Url } from '../${module.name}-url';` +
        '\nimport swal from \'sweetalert2\';';

    // output += imports;

    module.components.forEach(component => {
        output = imports;
        output += `
        \n@Component({
            selector: 'app-${component.name}',
            templateUrl: './${component.name}.component.html',
            styleUrls: ['./${component.name}.component.scss']
          \n})`;

        output += `\nexport class ${capitaliseFirstWord(component.name)}Component implements OnInit {
            data = [];
            displayedColumns: string[] = [];
            obj = { };
            displayForm = false;
            operation = "Add";
            title = "${splitByWord(component.name).map(m => capitaliseFirstWord(m)).join(' ')}";

            constructor(protected http: HttpService) {
                this.loadItem = this.loadItem.bind(this);
            }
            ngOnInit() {
                this.http.get(${module.name}Url.${removeHyphen(component.name)}.list)
                  .subscribe(success=>{
                    this.data = success.data;
                  }, error=>
                  {console.log(error);});
                }
            showForm()
            {
                this.displayForm = true;
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            }
              
            hideForm(){this.displayForm = false;}
        
            addItem() {
                this.resetForm();
                this.showForm();
            }
            processForm()
            {
                let url = ${module.name}Url.${removeHyphen(component.name)}.add;
                if(this.operation=="Update"){
                    url = ${module.name}Url.${removeHyphen(component.name)}.update;
                    this.save(url);
                }
                else
                    this.add(url);
                //e.preventDefault();
            }
            save(url)
        {
        this.http.put(url,this.obj)
            .subscribe(success=>{
            this.data= success.data;
            swal.fire("Process Complete", success.message,'success');
            this.resetForm();
            }, error=>
            {
            console.log(error);
            swal.fire("Process Unsuccessful", error.error.message,'error');
            });
        }
        add(url)
        {
        this.http.post(url,this.obj)
            .subscribe(success=>{
            this.data= success.data;
            swal.fire("Process Complete", success.message,'success');
            this.resetForm();
            }, error=>
            {
            console.log(error);
            swal.fire("Process Unsuccessful", error.error.message,'error');
            });
        }
    
        loadItem(id)
        {
        this.obj = this.data.find(item => item.id == id.row.data.id);
        this.operation ="Update";
        this.showForm();
        }
        resetForm()
    {
      this.obj = {  };
      this.hideForm();
      this.operation="Add";
    }
  
    \n}`
        generateComponentTest(module.name, component);
        writeToFile(`output/${module.name}/${component.name}`, `${component.name}.component.scss`, '')
        writeToFile(`output/${module.name}/${component.name}`, `${component.name}.component.html`, '')
        writeToFile(`output/${module.name}/${component.name}`, `${component.name}.component.ts`, output)
    });
}

function generateComponentTest(moduleName, component) {
    let output = 'import { async, ComponentFixture, TestBed } from \'@angular/core/testing\';' +
        `\nimport { ${capitaliseFirstWord(component.name)}Component } from './${component.name}.component';`;

    output += `
    describe('${capitaliseFirstWord(component.name)}Component', () => {
        let component: ${capitaliseFirstWord(component.name)}Component;
        let fixture: ComponentFixture<${capitaliseFirstWord(component.name)}Component>;
      
        beforeEach(async(() => {
          TestBed.configureTestingModule({
            declarations: [ ${capitaliseFirstWord(component.name)}Component ]
          })
          .compileComponents();
        }));
      
        beforeEach(() => {
          fixture = TestBed.createComponent(${capitaliseFirstWord(component.name)}Component);
          component = fixture.componentInstance;
          fixture.detectChanges();
        });
      
        it('should create', () => {
          expect(component).toBeTruthy();
        });
      });`;

    writeToFile(`output/${moduleName}/${component.name}`, `${component.name}.component.specs.ts`, output)

}