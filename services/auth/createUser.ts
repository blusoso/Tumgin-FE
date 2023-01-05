import axios from "axios";
import { ErrorResponse } from "../type/globalServiceType";

export enum LOGIN_WITH {
  SITE = "site",
  GOOGLE = "google",
  FACEBOOK = "facebook",
}

export type BaseUser = {
  username: string;
  email: string;
  gender?: number;
};

export type UserCreate = {
  id?: number;
  password?: string;
  profile_img?: string;
  login_with?: string;
  is_consent: boolean;
} & BaseUser;

export type CreateUserRequest = {
  user: UserCreate;
};

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export type UserResponse = {
  id: number;
  profile_img?: string;
  role: Role;
  is_active: boolean;
  login_with?: LOGIN_WITH;
  created_at: Date;
  updated_at?: Date;
} & BaseUser &
  ErrorResponse;

const createUser = async (
  request: UserCreate
): Promise<UserResponse | undefined> => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/signup`,
      request
    );

    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export default createUser;
