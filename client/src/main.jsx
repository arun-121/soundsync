import React, { useEffect, useState } from "react";
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

import { auth } from "./config/configuration.js";
import { onAuthStateChanged } from "firebase/auth";
import Protected from "./Protected.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);

function App() {
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("navigated");
    const authId = localStorage.getItem("authId");
    const unsubscribe = onAuthStateChanged(auth, (d) => {
      if (d) {
        if (d.accessToken != authId) navigate("/login");
      }
    });

    return () => unsubscribe();
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
        <Route
          path="/"
          element={
            <Protected>
              <AudioPlayer />
            </Protected>
          }
        />
        <Route path="/login" element={<Auth />} />

        <Route path="/sidebar" element={<SideBar />} />
        <Route
          path="/room"
          element={
            <Protected>
              <GroupRoom />
            </Protected>
          }
        />
      </Routes>
    </>
  );
}
