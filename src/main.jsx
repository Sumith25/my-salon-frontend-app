import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider as OidcAuthProvider } from "react-oidc-context"; // ✅ Correct name

import { AuthProvider } from "./context/AuthContext"; // ✅ Your custom context for user object

const cognitoAuthConfig = {
  authority: "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_W0ytLMKwS", // ✅ Your actual User Pool ID
  client_id: "1f6ch58jioma5ireu11astd3m1",
  redirect_uri: "http://localhost:5173",
  response_type: "code",
  scope: "openid email phone",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <OidcAuthProvider {...cognitoAuthConfig}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </OidcAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
