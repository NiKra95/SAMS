import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanySettingsDTO } from 'src/app/companies/company.model';
import { CompanyService } from 'src/app/companies/company.service';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';
import { EmployeeCreationDTO } from '../../users.model';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(private securityService: SecurityService,
              private companyService: CompanyService,
              private usersService: UsersService,
              private router: Router) { }

  model: CompanySettingsDTO;

  ngOnInit(): void {
    let companyId = parseInt(this.securityService.getCompanyID());
    this.companyService.getMinimumAnnualLeaveDaysInCompany(companyId).subscribe((response: CompanySettingsDTO) => {
      this.model = response;
    });
  }

  saveChanges(employeeCreationDTO: EmployeeCreationDTO){
    employeeCreationDTO.companyId = parseInt(this.securityService.getCompanyID());
    this.usersService.createEmployee(employeeCreationDTO).subscribe(() => {
      Swal.fire('Success', 'The new Company Admin has been added.', 'success').then(() => {
        this.router.navigate(['/employees']);
      });
    });
  }

}
