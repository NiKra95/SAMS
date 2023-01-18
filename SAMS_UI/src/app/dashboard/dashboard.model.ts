import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexLegend, ApexMarkers, ApexNonAxisChartSeries, ApexStroke, ApexTitleSubtitle, ApexXAxis, ApexYAxis } from "ng-apexcharts";

export type PieChartOptions = {
    chart: ApexChart;
    title: ApexTitleSubtitle;
    colors: any;
    series: ApexNonAxisChartSeries;
    labels: any;
    dataLabels: ApexDataLabels;
  };

  export type LineChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    markers: ApexMarkers;
    tooltip: any; // ApexTooltip;
    yaxis: ApexYAxis;
    grid: ApexGrid;
    legend: ApexLegend;
    title: ApexTitleSubtitle;
  };

  export interface ApplicationDashboardDTO {
    numberOfUsers: number;
    numberOfApplicationAdmins: number;
    numberOfCompanyAdmins: number;
    numberOfEmployees: number;
    numberOfCompanies: number;
    monthlyCompanyStat: Map<string, number>;
    monthlyCompanyProgress: Map<string, number>;
}

export interface CompanyDashboardDTO {
    numberOfAdmins: number;
    numberOfEmployees: number;
    minimumAnnualLeaveDays: number;

    numberOfAbsences: number;
    pendingAbsences: number;
    approvedAbsences: number;
    deniedAbsences: number;

    annualLeaveCount: number;
    sickLeaveCount: number;
    religiousHolidaysCount: number;
    unpaidLeaveCount: number;
    specialLeaveCount: number;
}