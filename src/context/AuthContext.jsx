import { createContext, useEffect, useState } from "react";

// const INITIAL_STATE = {
//     currentUser: null,
// };

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [userAvailable, setUserAvailable] = useState(false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const realAdmin = currentUser;
    if (realAdmin === "ajay@gmail.com") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={[
        currentUser,
        setCurrentUser,
        userAvailable,
        setUserAvailable,
        admin,
        setAdmin,
      ]}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
