import { useEffect, useState, createContext, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(() => {
        return localStorage.getItem("isSignedIn") === "true";
    });

    useEffect(() => {
        localStorage.setItem("isSignedIn", isSignedIn);
    }, [isSignedIn]);

    return (
        <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export { AuthProvider };