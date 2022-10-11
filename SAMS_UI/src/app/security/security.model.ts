export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthenticationResult {
    success: boolean,
    message: string,
    token: string;
    expiration: Date;
}

export interface userDTO {
    id: string;
    email: string;
}
