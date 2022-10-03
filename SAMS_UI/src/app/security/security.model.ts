export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResult {
    success: boolean,
    message: string,
    token: string;
    expiration: Date;
}

export interface userDTO {
    id: string;
    email: string;
}


export interface RegistrationRequest {
    email: string;
    password: string;
}

export interface Gender {
    value: string;
    viewValue: string;
}