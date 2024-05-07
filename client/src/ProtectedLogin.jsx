import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthContext } from "./components/context/AuthProvider";
import { Navigate } from "react-router-dom";
import { auth } from "./config/configuration";
const ProtectedLogin = ({ children }) => {
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();

  useEffect(() => {
    const authId = localStorage.getItem("authId");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.accessToken === authId) {
        setIsLoggedIn(true);
      }
    });

    return () => unsubscribe();
  }, [setIsLoggedIn]);

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default ProtectedLogin;
