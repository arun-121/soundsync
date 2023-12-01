import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "./components/SideBar.jsx";
import GroupRoom from "./components/GroupRoom.jsx";
import AudioPlayer from "./components/AudioPlayer.jsx";

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
  return (
    <>
      <Routes>
        <Route path="/" element={<AudioPlayer />}></Route>
        <Route path="/sidebar" element={<SideBar />}></Route>
        <Route path="/room" element={<GroupRoom />}></Route>
      </Routes>
    </>
  );
}
