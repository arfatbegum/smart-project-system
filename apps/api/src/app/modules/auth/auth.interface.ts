export type ILoginUser = {
  email: string;
  password: string;
};

export type TJwtPayload = {
  userId: string;
  email: string;
  role: string;
};

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}