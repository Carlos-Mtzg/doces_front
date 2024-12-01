import { createContext, useReducer } from "react";
import { authManager } from './auth-manager';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authManager, { signed: false });

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
export { AuthContext };
export default AuthContext;