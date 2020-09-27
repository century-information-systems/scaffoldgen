import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatStepperModule, MatIconModule, MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { DxSelectBoxModule, DxTextAreaModule, DxDateBoxModule, DxFormModule, DxDataGridModule, DxSpeedDialActionModule, DxPivotGridModule } from 'devextreme-angular';
import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from '/dashboard.component';
import { EmployeeComponent } from '/employee.component';
import { EmployeedataComponent } from '/employee-data.component';
import { EmployeeprofileComponent } from '/employee-profile.component';
@NgModule({
        imports: [
            CommonModule,
            EmployeeRoutingModule,
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
        declarations: [DashboardComponent,EmployeeComponent,EmployeedataComponent,EmployeeprofileComponent], 
    })
export class EmployeeModule { }