import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../security/security.service';
import { EmployeeHomePageDTO } from './home.model';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  model: EmployeeHomePageDTO;

  constructor(public securityService: SecurityService,
              public homeService: HomeService,
              private router: Router) { }

  ngOnInit(): void {
    if(this.securityService.getRole()) {
      if(this.securityService.getRole() == 'employee') {
        let userId = this.securityService.getUserID();
        this.homeService.getEmployeeHomePageData(userId).subscribe((employeeData: EmployeeHomePageDTO) => {
          this.model = employeeData;
        });
      }
      else {
        this.router.navigate(['/dashboard']);
      }
    }
  }

}
