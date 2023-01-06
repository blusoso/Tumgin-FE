import axios from "axios";
import { ErrorResponse } from "../type/globalServiceType";
import { STATUS_CODE } from "../http/httpStatusCode";

export type LoginRequest = {
  email: string;
  password?: string;
  login_with?: string;
};

export type LoginData = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type LoginResponse = {
  status: number;
  data: LoginData;
};

const login = async (
  request: LoginRequest
): Promise<LoginResponse | ErrorResponse | undefined> => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
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

export default login;
