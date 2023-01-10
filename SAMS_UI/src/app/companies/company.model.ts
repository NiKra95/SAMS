
export interface CompanyDTO {
    id: string,
    name: string;
    address: string;
    country: string;
    website: string;
    creationDate: Date;
    logo: string;
    numberOfEmployees: number;
    numberOfAdmins: number;
}

export interface CompanyCreationDTO {
    name: string;
    address: string;
    country: string;
    website: string;
    minimumAnnualLeaveDays: number;
    logo: File;
    creationDate: Date;
}

export interface CompanySettingsDTO {
    companyId: number,
    minimumAnnualLeaveDays: number;
}