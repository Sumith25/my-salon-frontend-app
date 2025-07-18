import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import { BrowserRouter } from "react-router-dom";

const cognitoAuthConfig = {
  authority: "https://salonapp.auth.ap-south-1.amazoncognito.com", // ✅ Your Hosted UI Domain
  client_id: "1f6ch58jioma5ireu11astd3m1",
  redirect_uri: "https://d84l1y8p4kdic.cloudfront.net", // ✅ Or http://localhost:3000 for local testing
  response_type: "code",
  scope: "openid email phone profile", // ✅ Full scopes
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider {...cognitoAuthConfig}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
