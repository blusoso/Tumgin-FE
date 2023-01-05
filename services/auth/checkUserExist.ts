import axios from "axios";
import { UserResponse } from "./createUser";

export enum USER_EXITED_MESSAGE {
  NOT_EXIT = "ไม่พบ Email นี้ในระบบ",
  EXITED = "Email นี้เคยใช้ไปแล้ว",
}

export type CheckUserExistRequest = {
  email: string;
};

const checkUserExist = async (
  request: CheckUserExistRequest
): Promise<UserResponse | undefined> => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/check-user-exist`,
      request
    );

    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export default checkUserExist;
