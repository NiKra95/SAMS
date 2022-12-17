import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { SecurityService } from './security/security.service';
import { MatDialog } from '@angular/material/dialog';
import { EditAppAdminComponent } from './users/application-admins/edit-app-admin/edit-app-admin.component';
import { EditCompanyAdminComponent } from './users/company-admins/edit-company-admin/edit-company-admin.component';
import { UsersService } from './users/users.service';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';
import { CurrentUserInfoDTO } from './users/users.model';
import { EditEmployeeComponent } from './users/employees/edit-employee/edit-employee.component';
import { EditUserDetailsComponent } from './users/common/edit-user-details/edit-user-details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(MatSidenav) 
  sidenav!: MatSidenav;
  public currentUserInfo: CurrentUserInfoDTO;

  constructor(private observer: BreakpointObserver,
              public securityService: SecurityService,
              public usersService: UsersService,
              private dialog: MatDialog) {
              
  }

  ngOnInit(): void {
    let userId = this.securityService.getFieldFromJWT('userID');
    if(userId) 
      this.usersService.getCurrentUserInfo(userId)
      .subscribe((currentUserInfo: CurrentUserInfoDTO) => {
        this.currentUserInfo = currentUserInfo;
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        if(res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    }, 0);
  }

  openEditAccountDialog() {
    let userId = this.securityService.getFieldFromJWT('userID');

    this.usersService.getUserDetails(userId).subscribe(userDetails => {
      const dialogRef = this.dialog.open(EditUserDetailsComponent, {
        width: '33%',
        data: userDetails
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        if(shouldReload)
          window.location.reload();
    });
    });
  }
}
