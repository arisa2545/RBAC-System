export interface IProfileResponse {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  permissions: Array<string>;
  created_at: Date;
  updated_at: Date;
}
