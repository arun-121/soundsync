import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Auth from "./components/Auth.jsx";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "./components/SideBar.jsx";
import GroupRoom from "./components/GroupRoom.jsx";
import AudioPlayer from "./components/AudioPlayer.jsx";
import Test from "./components/Test.jsx";
import Carousel from "./components/Carousel.jsx";
import Slider from "./components/Slider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Router>
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
      <Main />
    </Router>
  </>
);

function Main() {
  const navigate = useNavigate();
  const displayName = localStorage.getItem("displayName");
  useEffect(() => {
    if (!displayName) {
      navigate("/login");
    }
  }, [displayName, navigate, localStorage]);
  return (
    <>
      <Routes>
        <Route path="/" element={<AudioPlayer />}></Route>
        <Route path="/login" element={<Auth />}></Route>
        <Route path="/carousel" element={<Carousel />}></Route>
        <Route path="/test" element={<Slider />}></Route>
        <Route path="/sidebar" element={<SideBar />}></Route>
        <Route path="/room" element={<GroupRoom />}></Route>
      </Routes>
    </>
  );
}
