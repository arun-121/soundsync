import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthContext } from "./components/context/AuthProvider";
const Protected = ({ children }) => {
  const { isLoggedIn } = useAuthContext();
  console.log("isLoggedIn:", isLoggedIn);
  if (isLoggedIn === false) {
    return <Navigate to={"/login"} />;
  }
  return children;
};
export default Protected;
