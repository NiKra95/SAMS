import { Component, Input, OnInit } from '@angular/core';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-authorize-view',
  templateUrl: './authorize-view.component.html',
  styleUrls: ['./authorize-view.component.scss']
})
export class AuthorizeViewComponent implements OnInit {

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
  }

  @Input()
  role!: string;

  public isAuthorized(){
    if(this.role){ 

      var test = this.securityService.getRole();
      return test === this.role;
    }else{
      return this.securityService.isAuthenticated();
    }
  }

}
