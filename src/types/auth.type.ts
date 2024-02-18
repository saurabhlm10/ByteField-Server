export interface IRegisterParams {
  email: string;
  username: string;
  password?: string;
  hashedPassword?: string;
}

export interface ILoginParams {
  email: string;
  password: string;
}
