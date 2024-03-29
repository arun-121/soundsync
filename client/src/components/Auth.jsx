import { createContext, useContext, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../config/configuration";
import Lottie from "lottie-react";
import anim2 from "../assets/anim2.json";
import { useAuthContext } from "./context/AuthProvider";
const Auth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuthContext();
  const handleSignin = () => {
    setLoading(true);
    setError(null);
    signInWithPopup(auth, provider)
      .then((data) => {
        auth.currentUser
          .getIdToken()
          .then((d) => {
            localStorage.setItem("authId", d);
            navigate("/");
          })
          .catch((e) => console.log(e))
          .finally(() => setLoading(false));
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        setError(error.message); // Set error message to be displayed in UI
        setLoading(false);
      });
  };

  return (
    <div className="bg-gradient-to-r from-violet-200 via-blue-500 to-cyan-500 min-h-screen flex justify-center items-center">
      <div className="bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-8">
        <div className="text-center">
          <h1
            className="text-7xl font-bold text-blue-950"
            style={{
              textShadow:
                "0 0 2px rgba(255, 255, 255, 0.7), 0 0 1px rgba(255, 255, 255, 0.7), 0 0 5px rgba(255, 255, 255, 0.7)",
              marginTop: "70px",
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
