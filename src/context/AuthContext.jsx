import React, { createContext, useContext } from 'react';
import { useAuth } from 'react-oidc-context';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = useAuth();
    const login = () => auth.signinRedirect();
    const logout = () => auth.signoutRedirect();

    return (
        <AuthContext.Provider
            value={{
                user: auth.user,
                isAuthenticated: auth.isAuthenticated,
                accessToken: auth.user?.access_token || null,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// ✅ This must be exported!
export const useAuthContext = () => useContext(AuthContext);
