import "../styles/globals.css";
import React from "react";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import { ThemeProvider as StyledComponentThemeProvider } from "styled-components";
import { styledComponentsTheme } from "../styles/theme/styledComponentsTheme";

import Layout from "@/components/Layout/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <StyledComponentThemeProvider theme={styledComponentsTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StyledComponentThemeProvider>
    </RecoilRoot>
  );
};

export default App;
