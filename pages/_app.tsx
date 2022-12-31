import "../styles/globals.css";

import React from "react";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider as StyledComponentThemeProvider } from "styled-components";

import { styledComponentsTheme } from "../styles/theme/styledComponentsTheme";

import Layout from "@/components/Layout/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  return (
    <RecoilRoot>
      <StyledComponentThemeProvider theme={styledComponentsTheme}>
        <GoogleOAuthProvider clientId={clientId}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GoogleOAuthProvider>
      </StyledComponentThemeProvider>
    </RecoilRoot>
  );
};

export default App;
