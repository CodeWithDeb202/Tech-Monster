import { useState, useCallback } from "react";
import AuthContext from "./AuthContext";
import * as authService from "../../services/api/authService";
import { tokenStorage } from "../../services/auth/tokenStorage";

function AuthProvider({ children }) {

    const [token, setToken] = useState(tokenStorage.getToken());

    const [user, setUser] = useState(tokenStorage.getUser());

    const login = ({ token, user }) => {

        tokenStorage.setToken(token);
        tokenStorage.setUser(user);

        setToken(token);
        setUser(user);

    };

    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } catch (err) {
            console.error(err);
        } finally {
            tokenStorage.clear();
            setToken(null);
            setUser(null);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated: !!token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };