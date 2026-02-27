export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    role: string;
  };
}
