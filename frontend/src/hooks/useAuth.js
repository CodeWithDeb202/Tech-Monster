// import { useContext } from "react";

// import AuthContext from "../context/Auth/AuthContext";

// export default function useAuth(){

//     return useContext(AuthContext);

// }


import { useContext } from "react";
import AuthContext from "../context/Auth/AuthContext";

export default function useAuth() {
    return useContext(AuthContext);
}