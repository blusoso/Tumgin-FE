import React, { useEffect, useState } from "react";
import CookiePopup from "../Modal/CookiePopup/CookiePopup";
import Footer from "../Footer/Footer";
import { useRouter } from "next/router";
import styled from "styled-components";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";
import useDetectTablet from "@/utils/detectDevice/useDetectTablet";

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
