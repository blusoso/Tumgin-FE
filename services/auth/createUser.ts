import axios from "axios";
import { ErrorResponse } from "../type/globalServiceType";
import { STATUS_CODE } from "../http/httpStatusCode";

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
} & BaseUser;

export type UserResponseWithStatus = {
  status: number;
  data: UserResponse;
};

const createUser = async (
  request: UserCreate
): Promise<UserResponseWithStatus | ErrorResponse | undefined> => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/signup`,
      request
    );

    return { status: STATUS_CODE.OK, data: result.data };
  } catch (error: any) {
    return {
      status: error.response.status,
      statusText: error.response.statusText,
      detail: error.response.data.detail,
    };
  }
};

export default createUser;
