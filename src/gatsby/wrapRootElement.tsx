import React from "react";
import { WrapRootElementBrowserArgs } from "gatsby";
import { ThemeProvider } from "@material-ui/core";

import AmplifyClient from "../context/amplifyClient";
import { AuthProvider } from "../context/authContext";
import { customMuiTheme } from "../context/muiTheme";

export const wrapRootElement = ({ element }: WrapRootElementBrowserArgs) => (
  <ThemeProvider theme={customMuiTheme}>
    <AmplifyClient>
      <AuthProvider>{element}</AuthProvider>
    </AmplifyClient>
  </ThemeProvider>
);
