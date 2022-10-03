import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilites/utils';
import { LoginRequest, LoginResult } from '../security.model';
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
    // loginResult?: LoginResult;

  ngOnInit(): void {
    if(this.securityService.isAuthenticated()){
      this.router.navigate(['/home']);
    }
  }

  login(loginRequest: LoginRequest)
  {
    this.securityService.login(loginRequest).subscribe(loginResult => {
      if(loginResult.success && loginResult.token) {
        this.securityService.saveToken(loginResult);
      }
      this.router.navigate(['/']);
    }, error => {
      this.errors = parseWebAPIErrors(error);
    });
  }
}
