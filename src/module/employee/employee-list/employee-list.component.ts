import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '@data/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  @Input() employees: Employee[];
  @Input() selectedEmployee: Employee;
  @Output() employSelectionEmit: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() employDeletionEmit: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }
  onSelect(employee: Employee): void {
    this.employSelectionEmit.emit(employee);
  }
  onDelete(employeeId: number): void {
    this.employDeletionEmit.emit(employeeId);
  }
}
