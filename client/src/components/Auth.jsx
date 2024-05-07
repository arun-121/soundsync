import { createContext, useContext, useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, provider } from "../config/configuration";
import Lottie from "lottie-react";
import anim2 from "../assets/anim2.json";
import { useAuthContext } from "./context/AuthProvider";
import { onAuthStateChanged } from "firebase/auth";
const Auth = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuthContext();
  useEffect(() => {
    const authId = localStorage.getItem("authId");
    const unsubscribe = onAuthStateChanged(auth, (d) => {
      if (d) {
        if (d.accessToken === authId) setIsLoggedIn(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignin = () => {
    setLoading(true);
    setError(null);
    signInWithPopup(auth, provider)
      .then((data) => {
        localStorage.setItem("profile", data.user.photoURL);
        localStorage.setItem("name", data.user.displayName);
        localStorage.setItem("email", data.user.email);
        auth.currentUser
          .getIdToken()
          .then((d) => {
            localStorage.setItem("authId", d);

            setIsLoggedIn(true);
            navigate("/");
          })
          .catch((e) => console.log(e))
          .finally(() => setLoading(false));
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="bg-gradient-to-r from-violet-200 via-blue-500 to-cyan-500 h-[100vh] flex justify-center items-center">
      <div className="bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-8">
        <div className="text-center">
          <h1
            className=" text-responsive text-7xl font-bold text-blue-950"
            style={{
              textShadow:
                "0 0 2px rgba(255, 255, 255, 0.7), 0 0 1px rgba(255, 255, 255, 0.7), 0 0 5px rgba(255, 255, 255, 0.7)",
              marginTop: "70px",
              // margin: "10px",
            }}
          >
            SoundSync
          </h1>
          <p className="text-xlg  text-yellow-50 mb-8 font-custom p-4">
            Your Music, Your Way!
          </p>
          <button
            style={{ zIndex: "-1" }}
            className="bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
            onClick={handleSignin}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          {error && <p className="text-red-500">{error}</p>}{" "}
          <Lottie
            animationData={anim2}
            style={{
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "0px",
              width: "50%",
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
