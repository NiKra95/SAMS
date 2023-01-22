import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';
import { EmployeeDTO } from '../../users.model';
import { UsersService } from '../../users.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';

@Component({
  selector: 'app-index-employees',
  templateUrl: './index-employees.component.html',
  styleUrls: ['./index-employees.component.scss']
})
export class IndexEmployeesComponent implements OnInit {

  constructor(private usersService: UsersService,
    public securityService: SecurityService,
    private dialog: MatDialog) { }

columnsToDisplay = ['firstName', 'lastName', 'email', 'designation', 'annualLeave', 'details'];
dataSource: MatTableDataSource<EmployeeDTO>;
totalAmountOfRecords;
currentPage = 1;
pageSize = 5;

  ngOnInit(): void {
    this.loadData();
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  loadData() {
    let companyId = parseInt(this.securityService.getCompanyID());
      this.usersService.getCompanyEmployees(this.currentPage, this.pageSize, companyId).subscribe((response: HttpResponse<EmployeeDTO[]>) => {
        this.dataSource = new MatTableDataSource(response.body);
        this.dataSource.sort = this.sort;
        this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
      });
  }

  updatePagination(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  openDialog(index: string): void {
    const dialogRef = this.dialog.open(EmployeeDetailsComponent, {
      width: '36%',
      data: this.dataSource.data[index],
    });
  }
  
  openEditSettingsDialog(index: string): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '25%',
      data: this.dataSource.data[index],
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    });
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
        this.usersService.deleteEmployee(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Employee has been deleted.',
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
