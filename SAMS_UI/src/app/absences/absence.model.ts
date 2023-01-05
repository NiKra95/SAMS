export enum AbsenceType {
    "Annual Leave",
    "Sick Leave",
    "Religious Holidays",
    "Unpaid Leave",
    "Special Leave"
}

export enum AbsenceStatus {
    Pending,
    Approved,
    Denied
}

export interface AbsenceDTO {
    id: number,
    employeeId: string;
    absenceType: AbsenceType;
    startDate: Date;
    endDate: Date;
    durationInDays: number;
    description: string;
    absenceStatus: AbsenceStatus;
}

export interface AbsenceCreationDTO {
    employeeId: string;
    absenceType: string;
    startDate: Date;
    endDate: Date;
    durationInDays: number;
    description: string;
    absenceStatus: string;
}

export interface CompanyAbsenceDTO {
    id: number,
    employeeId: string;
    employeeName: string;
    employeeMaximumAnnualLeave: number;
    employeeRemainingAnuualLeave: number;
    absenceType: AbsenceType;
    startDate: Date;
    endDate: Date;
    durationInDays: number;
    description: string;
    absenceStatus: AbsenceStatus;
}

export interface ApprovedUserAbsenceDTO {
    absenceType: AbsenceType;
    startDate: Date;
    endDate: Date;
}

export interface ApprovedAbsencesInCompanyDTO {
    employeeFullName: string;
    absenceType: AbsenceType;
    startDate: Date;
    endDate: Date;
}