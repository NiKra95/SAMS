import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SecurityService } from 'src/app/security/security.service';
import Swal from 'sweetalert2';
import { AbsenceDTO, AbsenceStatus, AbsenceType } from '../absence.model';
import { AbsenceService } from '../absence.service';
import { CreateAbsenceComponent } from '../create-absence/create-absence.component';
import { EditAbsenceComponent } from '../edit-absence/edit-absence.component';

@Component({
  selector: 'app-index-absences',
  templateUrl: './index-absences.component.html',
  styleUrls: ['./index-absences.component.scss']
})
export class IndexAbsencesComponent implements OnInit {

  constructor(private absenceService: AbsenceService,
              private securityService: SecurityService,
              private dialog: MatDialog) { }

  columnsToDisplay = ['absenceType', 'startDate', 'endDate', 'durationInDays', 'description', 'absenceStatus', 'actions'];
  dataSource: MatTableDataSource<AbsenceDTO>;
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadData();
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  loadData(){
    let userId = this.securityService.getUserID();
    this.absenceService.getUserAbsences(this.currentPage, this.pageSize, userId).subscribe((response: HttpResponse<AbsenceDTO[]>) => {
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

  openCreateAbsenceDialog(): void {
    const dialogRef = this.dialog.open(CreateAbsenceComponent, {
      width: '20%'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    });
  }

  openEditAbsenceDialog(index: string): void {
    const dialogRef = this.dialog.open(EditAbsenceComponent, {
      width: '20%',
      data: this.dataSource.data[index],
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    });
  }

  delete(id: number): void {
    Swal.fire({
      title: 'Are you want to Delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if(result.value) {
        this.absenceService.delete(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Absence request has been deleted.',
            'success'
          )
          this.loadData();
        });
      } else if(result.dismiss === Swal.DismissReason.cancel) {
        this.loadData();
      }
    })
  }

  editButtonStyle(absenceStatus: AbsenceStatus) {
    if(absenceStatus == AbsenceStatus.Pending)
      return 'edit-button';
    return null;
  }

  isEditAndDeleteButtonDisabled(absenceStatus: AbsenceStatus) {
    if(absenceStatus != AbsenceStatus.Pending)
      return true;
    return false;
  }
}
