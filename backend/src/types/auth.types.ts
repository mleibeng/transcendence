export interface UserCredentials {
    email:string;
    password: string;
}

export interface RegisterCredentials extends UserCredentials {
    username: string;
    displayName: string;
}

export interface JWTPayload {
    userID: string;
    email: string;
    role: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
