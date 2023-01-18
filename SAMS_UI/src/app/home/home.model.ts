import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from "ng-apexcharts";

export type ChartOptions = {
    chart: ApexChart;
    title: ApexTitleSubtitle;
    colors: any;
    series: ApexNonAxisChartSeries;
    labels: any;
    dataLabels: ApexDataLabels;
  };

export interface EmployeeHomePageDTO {
    numberOfAbsences: number;
    pendingAbsences: number;
    approvedAbsences: number;
    deniedAbsences: number;
    maximumAnnualLeaveDays: number;
    remainingAnnualLeaveDays: number;
}