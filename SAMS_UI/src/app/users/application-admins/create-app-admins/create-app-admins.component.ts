import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApplicationAdminCreationDTO } from '../../users.model';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-create-app-admins',
  templateUrl: './create-app-admins.component.html',
  styleUrls: ['./create-app-admins.component.scss']
})
export class CreateAppAdminsComponent implements OnInit {

  constructor(private usersService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
  }

  saveChanges(appAdminCreationDTO: ApplicationAdminCreationDTO){
    this.usersService.createApplicationAdmin(appAdminCreationDTO).subscribe(() => {
      Swal.fire('Success', 'The new Application Admin has been added.', 'success').then(() => {
        this.router.navigate(['/application-admins']);
      });
    });
  }

}
