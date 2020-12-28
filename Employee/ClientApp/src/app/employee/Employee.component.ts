import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-Employee',
  templateUrl: './Employee.component.html'
})
export class EmployeeComponent implements OnInit {
  public employees: EmployeeName[];
  employeeForm: any;
  dataSaved = false;
  employeeIdUpdate = null;
  massage = null;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private formbulider: FormBuilder) {  }

  ngOnInit() {
    this.employeeForm = this.formbulider.group({
      Designation: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      LastName: ['', [Validators.required]], 
    });
    this.loadAllEmployees();
  }

  loadAllEmployees() {
    this.http.get<EmployeeName[]>(this.baseUrl + 'EmployeeName').subscribe(result => {
      console.log(result);
      this.employees = result;
    }, error => console.error(error));
  }

  loadEmployeeToEdit(employeeId: number) {
    this.http.get<EmployeeName>(this.baseUrl + 'EmployeeName/' + employeeId).subscribe(result => {
      this.massage = null;
      this.dataSaved = false;
      this.employeeIdUpdate = result.id;
      this.employeeForm.controls['Name'].setValue(result.name);
      this.employeeForm.controls['LastName'].setValue(result.lastname);
      this.employeeForm.controls['Designation'].setValue(result.designation);
    });

  }

  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    this.CreateEmployee(employee);
    this.employeeForm.reset();
  }

  CreateEmployee(employee: EmployeeName) {
    if (this.employeeIdUpdate == null) {
      this.http.post<EmployeeName>(this.baseUrl + 'EmployeeName', employee).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record saved Successfully';
        this.loadAllEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
      }
      );
    }
    else {
      console.log("in update method");
      console.log(this.employeeIdUpdate);
      this.http.put<EmployeeName>(this.baseUrl +  'EmployeeName/' + this.employeeIdUpdate, employee).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record saved Successfully';
        this.loadAllEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
      }
      );

    }
  }
  

  deleteEmployee(employeeId: number) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.http.delete(this.baseUrl + 'EmployeeName/' + employeeId).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Deleted Succefully';
        this.loadAllEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();

      });
    }
  }

  resetForm() {
    this.employeeForm.reset();
    this.massage = null;
    this.dataSaved = false;
  }
}

interface EmployeeName {
  id: number;
  name: string;
  designation: string;
  lastname: string;
}
