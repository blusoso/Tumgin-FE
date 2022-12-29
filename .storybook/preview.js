import React from "react";

import "../styles/globals.css";
import { ThemeProvider as StyledComponentThemeProvider } from "styled-components";
import { styledComponentsTheme } from "../styles/theme/styledComponentsTheme";

export const decorators = [
  (Story) => (
    <StyledComponentThemeProvider theme={styledComponentsTheme}>
      <Story />
    </StyledComponentThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
