import axios from "axios";

export type BaseUser = {
  username: string;
  email: string;
  gender: number;
};

export type UserCreate = {
  password: string;
  is_consent: boolean;
} & BaseUser;

export type CreateUserRequest = {
  user: UserCreate;
};

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export enum LOGIN_WITH {
  SITE = "site",
  GOOGLE = "google",
  FACEBOOK = "facebook",
}

export type userResponse = {
  id: number;
  profile_img?: string;
  role: Role;
  is_active: boolean;
  login_with?: LOGIN_WITH;
  created_at: Date;
  updated_at?: Date;
} & BaseUser;

const createUser = async (
  request: CreateUserRequest
): Promise<userResponse | undefined> => {
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
