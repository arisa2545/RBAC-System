export interface ILoginFormValues {
    username: string;
    password: string;
}

export interface ILoginPayload {
    username: string;
    password: string;
}

export interface ILoginResponse {
    access_token: string;
}