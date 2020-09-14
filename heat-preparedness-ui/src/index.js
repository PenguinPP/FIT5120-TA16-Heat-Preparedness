import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

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
    white: "#FFFFFF",
    primary: {
      main: "#4a2968",
      dark: "#dcc2df",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF6D00",
    },
    cross: {
      main: "#ff4d29",
    },
    tick: {
      main: "#009700",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
