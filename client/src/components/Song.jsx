import { Download } from "lucide-react";
import { getAudioElement } from "./util";
import { toast } from "react-toastify";
const Song = ({ name, icon, audio, artist, callback }) => {
  let audioElement = getAudioElement();
  function toastCall() {
    toast.success(`Playing  ${name} 🎧`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  return (
    <>
      <div
        onClick={() => {
          callback();
        }}
        style={{
          color: "white",
          background: "rgba(0, 0, 0, 0.25)",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.40) 0px 5px 5px",
          // marginRight: "6px",

          flex: "1",
          minWidth: "150px",
          maxWidth: "200px",
        }}
        className="bg-transparent drop-shadow-2xl  m-2   p-3 cursor-pointer  "
      >
        <div className="h-[100%] flex flex-col hover:transition duration-500 hover:scale-105 ">
          <img
            onClick={() => {
              audioElement.src = `http://localhost:3000/audio/` + audio;
              audioElement.play();
              toastCall();
            }}
            src={"http://127.0.0.1:3000/" + icon}
            alt=""
            width="180px"
            height="180px"
            style={{ borderRadius: "10px" }}
          />
          <div className="flex flex-col w-[100%] " style={{ flex: 1 }}>
            <div style={{ flex: 1 }}>
              <h2
                style={{ textShadow: "4px 3px 34px rgba(142,255,251,1)" }}
                className="font-custom text-black"
              >
                {name}
              </h2>
            </div>
            <div className="flex justify-between">
              <p
                style={{ textShadow: "4px 3px 34px rgba(0,0,0,1)" }}
                className="font-medium"
              >
                {artist}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Song;
