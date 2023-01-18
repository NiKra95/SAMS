import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { SecurityService } from 'src/app/security/security.service';
import { ChartOptions, EmployeeHomePageDTO } from '../home.model';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-employee-home-page',
  templateUrl: './employee-home-page.component.html',
  styleUrls: ['./employee-home-page.component.scss']
})
export class EmployeeHomePageComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input()
  model: EmployeeHomePageDTO;

  constructor(private homeService: HomeService,
              private securityService: SecurityService) {}

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        width: 620,
        type: "pie"
      },
      title: {
        text: `Annual Leave (${this.model.maximumAnnualLeaveDays} days)`,
        align: 'center',
        margin: 25
      },
      colors: [
        "#e4732d",
        "#6bda45"
      ],
      series: [this.model.maximumAnnualLeaveDays - this.model.remainingAnnualLeaveDays, this.model.remainingAnnualLeaveDays],
      labels: ["Used", "Remaining"],
      dataLabels: {
        enabled: false
      }
    };
  }
}

