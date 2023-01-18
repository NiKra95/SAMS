import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ApplicationDashboardDTO, LineChartOptions, PieChartOptions } from '../dashboard.model';
import each from 'foreach-object';

@Component({
  selector: 'app-application-dashboard',
  templateUrl: './application-dashboard.component.html',
  styleUrls: ['./application-dashboard.component.scss']
})
export class ApplicationDashboardComponent implements OnInit {

  months: string[] = [];
  montlyIncrements: number[] = [];
  montlyProgress: number[] = [];

  @ViewChild("chart") chart: ChartComponent;
  public userTypesChart: Partial<PieChartOptions>;
  public companyStatChart: Partial<LineChartOptions>;

  @Input()
  model: ApplicationDashboardDTO;
  
  constructor() { }

  ngOnInit(): void {
    this.userTypesChart = {
      chart: {
        width: 700,
        type: "pie"
      },
      title: {
        text: `User Types`,
        align: 'center',
        margin: 25
      },
      colors: [
        "#34568b",
        "#800080",
        "#80ff00"
      ],
      series: [this.model.numberOfApplicationAdmins,  this.model.numberOfCompanyAdmins, this.model.numberOfEmployees],
      labels: ["Application Admins", "Company Admins", "Company Employees"],
      dataLabels: {
        enabled: true
      }
    };

    let monthlyCompanyStat = this.model.monthlyCompanyStat;
    each(monthlyCompanyStat, (value, key, monthlyCompanyStat) => {
      this.months.push(key);
      this.montlyIncrements.push(value)
    });

    let monthlyCompanyProgress = this.model.monthlyCompanyProgress;
    each(monthlyCompanyProgress, (value, key, monthlyCompanyProgress) => {
      this.montlyProgress.push(value)
    });
    
    this.companyStatChart = {
      series: [
        {
          name: "Company Numbers",
          data: this.montlyProgress
        },
        {
          name: "Montly Increment",
          data: this.montlyIncrements
        },
      ],
      chart: {
        width: 800,
        height: 550,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      title: {
        text: "Company Statistics (last six months)",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: this.months
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val) {
                return val;
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };

  }

}
