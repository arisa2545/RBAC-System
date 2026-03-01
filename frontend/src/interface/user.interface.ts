export interface IGetAllUserResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export interface IGetUserDetailResponse {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}
