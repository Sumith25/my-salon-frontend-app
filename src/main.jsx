import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider as OidcAuthProvider } from "react-oidc-context"; // ✅ Correct name

import { AuthProvider } from "./context/AuthContext"; // ✅ Your custom context for user object

const cognitoAuthConfig = {
  authority: "https://ap-south-1w0ytlmkws.auth.ap-south-1.amazoncognito.com",
  client_id: "1f6ch58jioma5ireu11astd3m1",
  redirect_uri: "https://ap-south-1w0ytlmkws.auth.ap-south-1.amazoncognito.com/signup?client_id=1f6ch58jioma5ireu11astd3m1&response_type=code&scope=openid+email+phone&redirect_uri=https://d84l1y8p4kdic.cloudfront.net/",
  response_type: "code",
  scope: "phone openid email",
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
