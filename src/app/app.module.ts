import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EmployeeModule } from '@module/employee/employee.module';
import { RouterModule } from '@angular/router';
import { EmployeeComponent } from '@module/employee/employee.component'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EmployeeModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/employee-list', pathMatch: 'full' },
      { path: 'employee-list', component: EmployeeComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
