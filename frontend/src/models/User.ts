export interface User {
  email: string;

  nickName: string;

  firstName: string;

  lastName: string;
}

export interface LoginResult {
  user: User;

  token: string;

  expireAt: string;
}

export interface SignUpRequest {
  email: string;

  firstName: string;

  lastName: string;

  nickName: string;

  password: string;
}
