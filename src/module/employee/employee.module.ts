import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';

import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    EmployeeListComponent
  ]
})
export class EmployeeModule { }
