import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyDTO } from '../company.model';
import { CompanyService } from '../company.service';
import { CompanyDetailsComponent } from '../company-details/company-details.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-companies',
  templateUrl: './index-companies.component.html',
  styleUrls: ['./index-companies.component.scss']
})
export class IndexCompaniesComponent implements OnInit {

  constructor(private companyService: CompanyService,
              private dialog: MatDialog) { }

  columnsToDisplay = ['name', 'country', 'address', 'creationDate', 'details'];
  dataSource: MatTableDataSource<CompanyDTO>;
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadData();
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  loadData(){
    this.companyService.get(this.currentPage, this.pageSize).subscribe((response: HttpResponse<CompanyDTO[]>) => {
      this.dataSource = new MatTableDataSource(response.body);
      this.sort.sort(({ id: 'creationDate', start: 'desc'}) as MatSortable);
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
    const dialogRef = this.dialog.open(CompanyDetailsComponent, {
      width: '25%',
      data: this.dataSource.data[index],
    });
  }

  delete(companyId: string): void {
    Swal.fire({
      title: 'Are you want to Delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if(result.value) {
        this.companyService.delete(parseInt(companyId)).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Company has been deleted.',
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
