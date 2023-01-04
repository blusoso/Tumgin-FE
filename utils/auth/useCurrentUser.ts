import { authState } from "@/recoils/index";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import getCurrentUser from "services/auth/getCurrentUser";
import { COOKIE_NAME } from "../cookies";

const useCurrentUser = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const fetchCurrentUser = async () => {
    const response = await getCurrentUser();
    if (response) {
      setAuth({ ...auth, user: response });
    }
  };

  useEffect(() => {
    const accessToken: any = getCookie(COOKIE_NAME.ACCESS_TOKEN);
    const refreshToken: any = getCookie(COOKIE_NAME.REFRESH_TOKEN);

    if (accessToken && refreshToken) {
      fetchCurrentUser();
    }
  }, []);

  return auth;
};

export default useCurrentUser;
