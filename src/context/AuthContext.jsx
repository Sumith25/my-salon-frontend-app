import { useAuth } from "react-oidc-context";
import { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={{
      user: auth.user,
      isAuthenticated: auth.isAuthenticated,
      accessToken: auth.user?.access_token || null,
      login: () => auth.signinRedirect(),
      logout: () => auth.signoutRedirect()
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
