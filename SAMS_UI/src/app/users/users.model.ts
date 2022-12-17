export interface Gender {
    value: string;
    viewValue: string;
}

export enum GenderType {
    Unknown,
    Male,
    Female
}

export interface CurrentUserInfoDTO {
    fullName: string;
    designation: string;
    picture: string;
}

export interface UserDetailsDTO {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    gender: string;
    dateOfBirth: Date;
    picture: string;
}

export interface EditUserDetailsDTO {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    gender: string;
    dateOfBirth: Date;
    picture: File;
}

export interface ApplicationAdminCreationDTO {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    password: string;
    gender: string;
    dateOfBirth: Date;
    picture: File;
}

export interface ApplicationAdminDTO {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    gender: GenderType;
    dateofBirth: Date;
    picture: string;
}

export interface CompanyAdminCreationDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    dateOfBirth: Date;
    companyId: number;
}

export interface CompanyAdminDTO {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    gender: string;
    dateofBirth: Date;
    picture: string;
    companyName: string;
}

export interface CompanyAdminEditDTO {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    password: string;
    gender: string;
    dateOfBirth: Date;
    picture: File;
}


export interface EmployeeDTO {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    gender: string;
    dateofBirth: Date;
    picture: string;s
    designation: string;
    startWorkingDate: string;
    experienceInCompany: string;
    maximumAnnualLeave: string;
    remainingAnnualLeave: string;
}
export interface EmployeeCreationDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    designation: string;
    startWorkingDate: Date;
    maximumAnnualLeave: number;
    companyId: number;
}

export interface EmployeeEditDTO {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    password: string;
    gender: string;
    dateOfBirth: Date;
    picture: File;
}

export interface EmployeeSettingsEditDTO {
    fullName: string;
    email: string;
    startWorkingDate: Date;
    designation: string;
    experienceInCompany: number;
    maximumAnnualLeave: number;
    companyId: number;
}
