
export interface CompanyDTO {
    name: string;
    address: string;
    country: string;
    website: string;
    logo: string;
}

export interface CompanyCreationDTO {
    name: string;
    address: string;
    country: string;
    website: string;
    logo: File;
}