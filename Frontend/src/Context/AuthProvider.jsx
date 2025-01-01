import react , { useContext, useState , createContext } from "react";
// import { createContext } from "vm";

export const AuthContext = createContext();

export default function AuthProvider({ children }){
    const initialAuthUser = localStorage.getItem("User")
    const [Search , setSearch] = useState("")
    const [searchResults , setSearchResults] = useState([])
    const [AuthUser , setAuthUser] = useState(
        initialAuthUser ? JSON.parse(initialAuthUser) : undefined
    )
    return(
        <AuthContext.Provider value={{AuthUser , setAuthUser , Search , setSearch, searchResults , setSearchResults}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);