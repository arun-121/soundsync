import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Auth from "./components/Auth.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import AuthProvider, {
  useAuthContext,
} from "./components/context/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import SideBar from "./components/SideBar.jsx";
import GroupRoom from "./components/GroupRoom.jsx";
import AudioPlayer from "./components/AudioPlayer.jsx";
import Slider from "./components/Slider.jsx";
import { auth } from "./config/configuration.js";
import { onAuthStateChanged } from "firebase/auth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const authId = localStorage.getItem("authId");
    if (!authId) {
      navigate("/login");
      return;
    }
    onAuthStateChanged(auth, (d) => {
      if (d?.accessToken != authId) {
        navigate("/login");
      }
      if (pathname == "/login" && d?.accessToken == authId) {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<AudioPlayer />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/test" element={<Slider />} />
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/room" element={<GroupRoom />} />
      </Routes>
    </>
  );
}
