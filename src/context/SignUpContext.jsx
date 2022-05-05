import { useState, createContext} from "react";

const SignUpContext = createContext();

function SignUpContextProvider({ children }) {
  const [error, setError] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordIsValidError, setPasswordIsValidError] = useState(true);

  const [signError, setSignError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPasword] = useState("");
  const [confirmError, setConfirmError] = useState(true);

  return (
    <SignUpContext.Provider
      value={{
        error,
        setError,
        showPassword,
        setShowPassword,
        showConfirmPass,
        setShowConfirmPass,
        passwordIsValid,
        setPasswordIsValid,
        passwordIsValidError,
        setPasswordIsValidError,
        signError,
        setSignError,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPasword,
        confirmError,
        setConfirmError,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
}
export { SignUpContext, SignUpContextProvider };
