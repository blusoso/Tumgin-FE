import React, { useEffect, useState } from "react";
import CookiePopup from "../Modal/CookiePopup/CookiePopup";
import Footer from "../Footer/Footer";
import { useRouter } from "next/router";
import styled from "styled-components";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";
import useDetectTablet from "@/utils/detectDevice/useDetectTablet";
import { useRecoilState } from "recoil";
import { authState } from "@/recoils/index";
import getCurrentUser from "@/services/auth/getCurrentUser";
import { getCookie } from "cookies-next";
import { COOKIE_NAME } from "@/utils/cookies";

export const Main = styled.main``;

type LayoutProps = {
  children: JSX.Element;
};

export enum PATH_NAME {
  HOME = "/",
  SEARCH = "/search",
  PRIVACY_POLICY = "/privacy-policy",
  TERMS_OF_SERVICE = "/terms-of-service",
  RECIPE = "/recipe/[id]/[slug]",
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { pathname } = router;
  const isMobile = useDetectMobile();
  const isTablet = useDetectTablet();
  const [auth, setAuth] = useRecoilState(authState);

  const accessToken: any = getCookie(COOKIE_NAME.ACCESS_TOKEN);
  const refreshToken: any = getCookie(COOKIE_NAME.REFRESH_TOKEN);

  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    switch (pathname) {
      case PATH_NAME.HOME:
      case PATH_NAME.SEARCH:
      case PATH_NAME.PRIVACY_POLICY:
      case PATH_NAME.TERMS_OF_SERVICE:
      case PATH_NAME.RECIPE:
        setShowFooter(true);
        break;
      default:
        setShowFooter(false);
        break;
    }
  }, [pathname]);

  const fetchCurrentUser = async () => {
    const response = await getCurrentUser();
    if (response) {
      setAuth({ ...auth, user: response });
    }
  };

  useEffect(() => {
    if (accessToken && refreshToken) {
      fetchCurrentUser();
    }
  }, []);

  return (
    <>
      <Main
        className={`container relative mx-auto ${
          isMobile || isTablet ? "my-4" : "mt-1 mb-6"
        }`}
      >
        {children}
      </Main>
      <CookiePopup />
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;
