// import { createContext, useCallback, useMemo, useState } from "react";

// import { tokenStorage } from "../../services/auth/tokenStorage";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {

//     const [token, setToken] = useState(

//         tokenStorage.getToken()

//     );

//     const [user, setUser] = useState(

//         tokenStorage.getUser()

//     );

//     const login = useCallback(({ token, user }) => {

//         console.log("LOGIN TOKEN =", token);

//         tokenStorage.setToken(token);

//         console.log(
//             "AFTER SAVE =",
//             localStorage.getItem("accessToken")
//         );

//         tokenStorage.setUser(user);

//         setToken(token);

//         setUser(user);

//     }, []);

//     const logout = useCallback(() => {

//         tokenStorage.clear();

//         setToken(null);

//         setUser(null);

//     }, []);

//     const value = useMemo(() => ({

//         token,

//         user,

//         isAuthenticated: !!token,

//         login,

//         logout

//     }), [token, user, login, logout]);

//     return (

//         <AuthContext.Provider value={value}>

//             {children}

//         </AuthContext.Provider>

//     );

// }

// export default AuthContext;


import { createContext } from "react";

const AuthContext = createContext(null);

export default AuthContext;