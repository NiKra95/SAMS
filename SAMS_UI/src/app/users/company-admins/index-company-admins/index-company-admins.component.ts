import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';
import { CompanyAdminDTO} from '../../users.model';
import { UsersService } from '../../users.service';
import { CompanyAdminDetailsComponent } from '../company-admin-details/company-admin-details.component';

@Component({
  selector: 'app-index-company-admins',
  templateUrl: './index-company-admins.component.html',
  styleUrls: ['./index-company-admins.component.scss']
})
export class IndexCompanyAdminsComponent implements OnInit {

  constructor(private usersService: UsersService,
              public securityService: SecurityService,
              private dialog: MatDialog) { }

  columnsToDisplay = ['firstName', 'lastName', 'email', 'companyName', 'details'];
  dataSource: MatTableDataSource<CompanyAdminDTO>;
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 5; 
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(){
    let userRole = this.securityService.getRole();

    switch(userRole) {
      case 'applicationAdmin': {
        this.usersService.getCompanyAdmins(this.currentPage, this.pageSize, 0).subscribe((response: HttpResponse<CompanyAdminDTO[]>) => {
          this.dataSource = new MatTableDataSource(response.body);
          this.dataSource.sort = this.sort;
          this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
        });
        break;
      }
      case 'companyAdmin': {
        let companyId = parseInt(this.securityService.getCompanyID());
        this.usersService.getCompanyAdmins(this.currentPage, this.pageSize, companyId).subscribe((response: HttpResponse<CompanyAdminDTO[]>) => {
          this.dataSource = new MatTableDataSource(response.body);
          this.dataSource.sort = this.sort;
          this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
        });
        break;
      }
    }
  }

  updatePagination(event: PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  openDialog(index: string): void {
    const dialogRef = this.dialog.open(CompanyAdminDetailsComponent, {
      width: '25%',
      data: this.dataSource.data[index],
    });
  }

  isDeleteButtonDisabled(id: string) {
    if(id == this.securityService.getUserID()) {
      return true;
    }
    return false;
  }

  delete(id: string): void {
    Swal.fire({
      title: 'Are you want to Delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if(result.value) {
        this.usersService.deleteCompanyAdmin(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Company Admin has been deleted.',
            'success'
          )
          this.loadData();
        });
      } else if(result.dismiss === Swal.DismissReason.cancel) {
        this.loadData();
      }
    })
  }

}
