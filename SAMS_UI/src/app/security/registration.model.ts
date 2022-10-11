import { CompanyCreationDTO } from "../companies/company.model";
import { CompanyService } from "../companies/company.service";
import { Gender } from "../users/users.model";

export interface CompanyAdminDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: Gender;
    dateOfBirth: Date;
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

export interface RegistrationRequest {
    // companyAdmin: CompanyAdminCreationDTO;
    // company: CompanyCreationDTO;

    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    dateOfBirth: Date;

    companyName: string;
    companyAddress: string;
    companyCountry: string;
    companyWebsite: string;
    logo: File;

}

export interface RegistrationResponse {
    success: boolean,
    message: string,
    token: string;
    expiration: Date;
}