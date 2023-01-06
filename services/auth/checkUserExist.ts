import axios from "axios";
import { UserResponse } from "./createUser";
import { ErrorResponse } from "../type/globalServiceType";
import { STATUS_CODE } from "../http/httpStatusCode";

export enum USER_EXITED_MESSAGE {
  NOT_EXIT = "ไม่พบ Email นี้ในระบบ",
  EXITED = "Email นี้เคยใช้ไปแล้ว",
}

export type CheckUserExistRequest = {
  email: string;
};

export type CheckUserExistResponse = {
  status: number;
  data: UserResponse;
};

const checkUserExist = async (
  request: CheckUserExistRequest
): Promise<CheckUserExistResponse | ErrorResponse | undefined> => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/check-user-exist`,
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

export default checkUserExist;
