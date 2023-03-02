export interface UserResponseI {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponseI {
  user: UserResponseI;
  accessToken: string;
}

export interface AuthRequestBodyI {
  email: string;
  password: string;
}

export interface ErrorResponseI {
  status: number;
  message: string;
}
