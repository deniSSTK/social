export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
}

export interface LoginUserRequest {
    emailOrUsername: string;
    password: string;
}