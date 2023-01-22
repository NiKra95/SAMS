import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationAdminDTO} from '../../users.model';
import { UsersService } from '../../users.service';
import {MatDialog} from '@angular/material/dialog';
import { AppAdminDetailsComponent } from '../app-admin-details/app-admin-details.component';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-application-admins',
  templateUrl: './index-application-admins.component.html',
  styleUrls: ['./index-application-admins.component.scss']
})
export class IndexApplicationAdminsComponent implements OnInit {

  constructor(private usersService: UsersService,
              private securityService: SecurityService,
              private dialog: MatDialog) { }

  columnsToDisplay = ['firstName', 'lastName', 'email', 'details'];
  dataSource: MatTableDataSource<ApplicationAdminDTO>;
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadData();
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  loadData(){
    this.usersService
      .getApplicationAdmins(this.currentPage, this.pageSize)
      .subscribe((response: HttpResponse<ApplicationAdminDTO[]>) => {
        this.dataSource = new MatTableDataSource(response.body);
        this.dataSource.sort = this.sort;
        this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
    })
  }

  updatePagination(event: PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }     

  openDialog(index: string): void {
    const dialogRef = this.dialog.open(AppAdminDetailsComponent, {
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
        this.usersService.deleteApplicationAdmin(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Application Admin has been deleted.',
            'success'
          )
          this.loadData();
        });
      } else if(result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('Cancelled', '' ,'error');
        this.loadData();
      }
    })
  }
}
