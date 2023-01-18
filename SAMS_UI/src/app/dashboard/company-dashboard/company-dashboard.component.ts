import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { SecurityService } from 'src/app/security/security.service';
import { CompanyDashboardDTO, PieChartOptions } from '../dashboard.model';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public absenceStatusChart: Partial<PieChartOptions>;
  public absenceTypeChart: Partial<PieChartOptions>;

  @Input()
  model: CompanyDashboardDTO;
  
  constructor(private securityService: SecurityService,
              private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.absenceStatusChart = {
      chart: {
        width: 520,
        type: "pie"
      },
      title: {
        text: `Absence Status`,
        align: 'center',
        margin: 25
      },
      colors: [
        "#00ff00",
        "#ffbf00",
        "#ff0000"
      ],
      series: [this.model.approvedAbsences,  this.model.pendingAbsences, this.model.deniedAbsences],
      labels: ["Approved", "Pending", "Denied"],
      dataLabels: {
        enabled: true
      }
    };

    this.absenceTypeChart = {
      chart: {
        width: 550,
        type: "pie"
      },
      title: {
        text: `Approved Absence Types`,
        align: 'center',
        margin: 25
      },
      colors: [
        "#0000ff",
        "#ffa500",
        "#008000",
        "#800080",
        "#ff0000"
      ],
      series: [this.model.annualLeaveCount, this.model.sickLeaveCount, this.model.religiousHolidaysCount,
               this.model.unpaidLeaveCount, this.model.specialLeaveCount],
      labels: ["Annual Leave", "Sick Leave", "Religious Holidays", "Unpaid Leave", "Special Leave"],
      dataLabels: {
        enabled: true
      }
    };
  }

}
