import { setCookie } from "cookies-next";
import { convertDaysToSeconds, convertMinsToSeconds } from "./time";

export enum COOKIE_NAME {
  USER_DATA = "user_data",
  COOKIE_CONSENT = "cookie_consent",
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
}

export enum COOKIE_AGE {
  ACCESS_TOKEN = convertMinsToSeconds(30),
  REFRESH_TOKEN = convertDaysToSeconds(30),
}

export const setAccessTokenCookie = (accessToken: string) => {
  setCookie(COOKIE_NAME.ACCESS_TOKEN, accessToken, {
    maxAge: COOKIE_AGE.ACCESS_TOKEN,
  });
};

export const setRefreshTokenCookie = (refreshToken: string) => {
  setCookie(COOKIE_NAME.REFRESH_TOKEN, refreshToken, {
    maxAge: COOKIE_AGE.REFRESH_TOKEN,
  });
};

// TODO: Use this below instead when up to production (HTTPS)
// TODO: Re-check cookie when change to HTTPS

// export const setAccessTokenCookie = (accessToken: string) => {
//   setCookie(COOKIE_NAME.ACCESS_TOKEN, accessToken, {
//     maxAge: COOKIE_AGE.ACCESS_TOKEN,
//     httpOnly: true,
//     secure: true,
//   });
// };

// export const setRefreshTokenCookie = (refreshToken: string) => {
//   setCookie(COOKIE_NAME.REFRESH_TOKEN, refreshToken, {
//     maxAge: COOKIE_AGE.REFRESH_TOKEN,
//     httpOnly: true,
//     secure: true,
//   });
// };
