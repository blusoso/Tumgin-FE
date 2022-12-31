import axios from "axios";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

import { COOKIE_NAME, setAccessTokenCookie } from "@/utils/cookies";

export const isAccessTokenExpired = () => {
  const accessToken: any = getCookie(COOKIE_NAME.ACCESS_TOKEN);
  try {
    const decodedToken: any = jwt.decode(accessToken, { complete: true });
    const exp = decodedToken?.payload?.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    return currentTime > exp;
  } catch (error) {
    return true;
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken: any = getCookie(COOKIE_NAME.REFRESH_TOKEN);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
      {
        refresh_token: refreshToken,
      }
    );

    const { data } = response;
    if (data.error) {
      throw new Error(data.error);
    } else {
      setAccessTokenCookie(data.access_token);
      return data.access_token;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
}

const protectedRequest = async (path: string, method: Method, data?: any) => {
  if (isAccessTokenExpired()) {
    const refreshedToken = await refreshAccessToken();
    if (refreshedToken == null) {
      return null;
    }
  }

  const accessToken: any = getCookie(COOKIE_NAME.ACCESS_TOKEN);

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
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default protectedRequest;
