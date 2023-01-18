import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilites/utils';
import { LoginRequest, AuthenticationResult } from '../security.model';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private securityService: SecurityService,
    private router: Router) { }

    errors: string[] = [];

  ngOnInit(): void {
    if(this.securityService.isAuthenticated()){
      if(this.securityService.getRole() == 'employee')
        this.router.navigate(['/home']);
      else
      this.router.navigate(['/dashboard']);
    }
  }

  login(loginRequest: LoginRequest)
  {
    this.securityService.login(loginRequest).subscribe(loginResult => {
      if(loginResult.success && loginResult.token) {
        this.securityService.saveToken(loginResult);
        window.location.reload();
      }
      this.router.navigate(['/']);
    }, error => {
      this.errors = parseWebAPIErrors(error);
    });
  }

}
