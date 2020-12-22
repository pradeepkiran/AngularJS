import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Employee',
  templateUrl: './Employee.component.html'
})
export class EmployeeComponent {
  public employees: EmployeeName[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<EmployeeName[]>(baseUrl + 'EmployeeName').subscribe(result => {
      this.employees = result;
    }, error => console.error(error));
  }
}

interface EmployeeName {
  Id: number;
  name: string;
  designation: string;
  lastname: string;
}
