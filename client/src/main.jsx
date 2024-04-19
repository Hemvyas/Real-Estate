import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Auth0Provider} from "@auth0/auth0-react"
import { MantineProvider } from "@mantine/core";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
    >
      <Auth0Provider
        domain="dev-satxjv8si61r32f1.us.auth0.com"
        clientId="PWEcd7yE0nvqEYs91PYM0sC3Jf9wr2XB"
        authorizationParams={{
          redirect_uri: "http://localhost:5173",
        }}
        audience="https://dev-satxjv8si61r32f1.us.auth0.com/api/v2/"
        scope="openid profile email"
      >
        <App />
      </Auth0Provider>
    </MantineProvider>
  </React.StrictMode>
);
