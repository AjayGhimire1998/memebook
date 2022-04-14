import { createContext, useState } from "react";


// const INITIAL_STATE = {
//     currentUser: null,
// };

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(false);
    console.log("AuthContext Provider")
    return (
        <AuthContextProvider value={[currentUser, setCurrentUser]}>
            {children}    
        </AuthContextProvider>
    );
};

