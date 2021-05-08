import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '@data/employee';
import { EMPLOYEES } from '@data/mock-employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  getEmployees(): Observable<Employee[]> {
    return of(EMPLOYEES);
  }
}
