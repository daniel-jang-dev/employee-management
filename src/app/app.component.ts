import { Component, OnInit } from '@angular/core';
import { Employee } from '@data/employee';
import { Position } from '@data/position';
import { EmployeeService } from '@service/employee.service';
import { PositionService } from '@service/position.service';
import { PersonalInformationFormGroup } from '@forms/personal-information.form-group';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  employees: Employee[] = [];
  positions: Position[] = [];
  selectedEmployee: Employee = null;
  personalInformationForm: PersonalInformationFormGroup;
  nextEmployeeId: number;

  constructor(
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.personalInformationForm = new PersonalInformationFormGroup();
    this.getInitialData();
  }

  getInitialData(): void {
    forkJoin([
      this.employeeService.getEmployees(),
      this.positionService.getPositions(),
    ]).subscribe((results) => {
      this.employees = results[0];
      this.positions = results[1];

      if (this.employees.length) {
        this.employees.forEach((employee) => {
          this.addPositionName(employee);
        });
        this.onSelect(this.employees[0]);
        const lastEmployee = this.employees[this.employees.length - 1];
        this.nextEmployeeId = lastEmployee.employeeId + 1;
      } else {
        this.nextEmployeeId = 1000;
      }
    });
  }

  addPositionName(employee) {
    const position = this.positions.find(
      (e) => e.positionId === employee.positionId
    );
    if (position) {
      employee['positionName'] = position.positionName;
    }
  }

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
    this.personalInformationForm.patchValue(this.selectedEmployee);
  }

  /* --------------------------------- BUTTON --------------------------------- */

  onAddNew(): void {
    this.selectedEmployee = null;
    this.personalInformationForm.reset();
  }

  onSave(): void {
    // VALIDATION
    if (!this.personalInformationForm.valid) {
      return;
    }

    // UPDATE
    if (this.selectedEmployee) {
      const { employeeId } = this.selectedEmployee;
      const targetEmployee: Employee = this.employees.find(
        (employee) => employee.employeeId === employeeId
      );
      const updatedValue: Employee = this.personalInformationForm.value;
      Object.keys(updatedValue).forEach((key) => {
        targetEmployee[key] = updatedValue[key];
      });
      this.addPositionName(targetEmployee);
      this.openSnackBar('UPDATED');

      // INSERT
    } else {
      const newEmploy: Employee = this.personalInformationForm.value;
      newEmploy.employeeId = this.nextEmployeeId;
      this.addPositionName(newEmploy);
      this.employees.push(newEmploy);
      this.onSelect(newEmploy);
      this.nextEmployeeId++;
      this.openSnackBar('ADDED');
    }
  }

  // DELETE
  onDelete(employeeId: number): void {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].employeeId === employeeId) {
        this.employees.splice(i, 1);
        break;
      }
    }
    this.openSnackBar('DELETED');
    if (this.employees.length) {
      this.onSelect(this.employees[0]);
    } else {
      this.onAddNew();
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'CLOSE', { duration: 2000 });
  }
}
