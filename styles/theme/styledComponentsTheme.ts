const mainTheme = {
  lightGrayColor: "#D9D9D9",
  grayColor: "#AEB5BF",
  lightGreenColor: "rgba(75, 164, 104, 0.1)",
  greenColor: "#4BA468",
  yellowColor: "#FFCF52",
  blackColor: "#1e1e1e",
  redColor: "#FF4040",
};

const borderRadius = {
  borderRadiusXl: "1.5rem",
  borderRadiusLg: "1rem",
  borderRadiusMd: "0.75rem",
  borderRadiusSm: "0.5rem",
};

const fontSize = {
  defaultFontSize: "1rem",
  fontSizeSm: "12px",
};

export const styledComponentsTheme = {
  ...mainTheme,
  ...borderRadius,
  ...fontSize,
};
