import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/security/security.service';
import { CompanyAdminCreationDTO } from '../../users.model';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-create-company-admin',
  templateUrl: './create-company-admin.component.html',
  styleUrls: ['./create-company-admin.component.scss']
})
export class CreateCompanyAdminComponent implements OnInit {

  constructor(private securityService: SecurityService,
              private usersService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
  }

  saveChanges(companyAdminCreationDTO: CompanyAdminCreationDTO){
    companyAdminCreationDTO.companyId = parseInt(this.securityService.getCompanyID());
    this.usersService.createCompanyAdmin(companyAdminCreationDTO).subscribe(() => {
      this.router.navigate(['/company-admins']);
    });
  }

}
