import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import * as serviceWorker from "./serviceWorker";
import { subscribeUser } from "./subscription";

const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiSvgIcon: {
      // Name of the rule
      fontSizeLarge: {
        // Some CSS
        fontSize: "5rem",
      },
    },
  },
  typography: {
    fontSize: 19,
  },
  palette: {
    primary: {
      light: "#785396",
      main: "#4a2968",
      dark: "#1f013d",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#ffa040",
      main: "#FF6D00",
      dark: "#c43e00",
      contrastText: "#000000",
    },
    tertiary: {
      main: "F8F4F9",
      contrastText: "#000000",
    },
    cross: {
      main: "#CE2D4F",
    },
    tick: {
      main: "#148F74",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
serviceWorker.register();
subscribeUser();
