import { STATUS_CODE } from "./../../services/http/httpStatusCode";
import axios from "axios";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

import { COOKIE_NAME, setAccessTokenCookie } from "@/utils/cookies";

export const isAccessTokenExpired = () => {
  const accessToken: any = getCookie(COOKIE_NAME.ACCESS_TOKEN);
  const refreshToken: any = getCookie(COOKIE_NAME.REFRESH_TOKEN);

  try {
    const decodedToken: any = jwt.decode(accessToken, { complete: true });
    const exp = decodedToken?.payload?.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    return currentTime > exp || (refreshToken && !accessToken);
  } catch (error) {
    return true;
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken: any = getCookie(COOKIE_NAME.REFRESH_TOKEN);

    if (refreshToken) {
      const request = { refresh_token: String(refreshToken) };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/refresh`,
        request
      );

      const { data } = response;
      if (data.error) {
        throw new Error(data.error);
      } else {
        return data.access_token;
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const makeProtectedRequest = async (
  path: string,
  method: METHOD,
  data?: any
) => {
  let accessToken: any = "";

  if (isAccessTokenExpired()) {
    accessToken = await refreshAccessToken();
    if (accessToken) {
      setAccessTokenCookie(accessToken);
    }
  } else {
    accessToken = getCookie(COOKIE_NAME.ACCESS_TOKEN);
  }

  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}`,
      method: method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    });

    if (response) {
      return { status: STATUS_CODE.OK, data: response.data };
    }

    return { status: STATUS_CODE.NOT_FOUND, data: "" };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default makeProtectedRequest;
