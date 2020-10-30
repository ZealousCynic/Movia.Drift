export interface LoginDto {
  email: string;
  passWord: string;
}

export interface ReturnTokenDto {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}
