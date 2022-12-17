import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/security/security.service';
import { EmployeeCreationDTO } from '../../users.model';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(private securityService: SecurityService,
    private usersService: UsersService,
    private router: Router) { }

  ngOnInit(): void {
  }

  saveChanges(employeeCreationDTO: EmployeeCreationDTO){
    employeeCreationDTO.companyId = parseInt(this.securityService.getCompanyID());
    this.usersService.createEmployee(employeeCreationDTO).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }

}
