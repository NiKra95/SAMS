import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SecurityService } from 'src/app/security/security.service';
import { AbsenceDetailsComponent } from '../absence-details/absence-details.component';
import { CompanyAbsenceDTO, AbsenceStatus, AbsenceType } from '../absence.model';
import { AbsenceService } from '../absence.service';

@Component({
  selector: 'app-index-company-absences',
  templateUrl: './index-company-absences.component.html',
  styleUrls: ['./index-company-absences.component.scss']
})
export class IndexCompanyAbsencesComponent implements OnInit {

  constructor(private absenceService: AbsenceService,
    private securityService: SecurityService,
    private dialog: MatDialog) { }

  columnsToDisplay = ['employeeName', 'absenceType', 'startDate', 'endDate', 'durationInDays', 'absenceStatus', 'actions'];
  dataSource: MatTableDataSource<CompanyAbsenceDTO>;
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadData();
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  loadData(){
    let companyId = parseInt(this.securityService.getCompanyID());
    this.absenceService.getCompanyAbsences(this.currentPage, this.pageSize, companyId).subscribe((response: HttpResponse<CompanyAbsenceDTO[]>) => {
    this.dataSource = new MatTableDataSource(response.body);
    this.sort.sort(({ id: 'startDate', start: 'desc'}) as MatSortable);
    this.sort.direction = 'desc';
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
    const dialogRef = this.dialog.open(AbsenceDetailsComponent, {
      width: '25%',
      data: this.dataSource.data[index],
    });
  }

  approveRequest(absenceId: number) {
    this.absenceService.approveAbsenceRequest(absenceId).subscribe(() => {
      this.loadData();
    });
  }

  denyRequest(absenceId: number) {
    this.absenceService.denyAbsenceRequest(absenceId).subscribe(() => {
      this.loadData();
    });
  }

  approveButtonStyle(absenceStatus: AbsenceStatus) {
    if(absenceStatus == AbsenceStatus.Pending)
      return 'approve-button';
    return null;
  }

  isApprovedAndDenyButtonDisabled(absenceStatus: AbsenceStatus) {
    if(absenceStatus != AbsenceStatus.Pending)
      return true;
    return false;
  }
}
