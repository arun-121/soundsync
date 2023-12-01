import { getAudioElement } from "./util";
import { socket } from "./scoket.js";
import { useEffect, useState } from "react";

const GroupSong = ({ name, icon, audio, artist, room }) => {
  console.log(room);
  let audioElement = getAudioElement();

  useEffect(() => {
    socket.emit("play_music", {
      url: `http://localhost:3000/audio/` + audio,
      Room: room,
    });
    socket.on("start_playing", (url) => {
      audioElement.src = url;
      audioElement.play();
    });
  }, []);

  return (
    <>
      <div
        onClick={() => {}}
        style={{
          color: "white",
          background: "rgba(0, 0, 0, 0.25)",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.50) 0px 5px 5px",
          margin: "6px",
          flex: "1",
          minWidth: "150px",
          maxWidth: "200px",
        }}
        className="bg-transparent drop-shadow-2xl  p-3 cursor-pointer  relative"
      >
        <div>
          <img
            src={"http://127.0.0.1:3000/" + icon}
            alt=""
            width="180px"
            height="180px"
            style={{ borderRadius: "10px" }}
          />
          <h2 className="font-custom">{name}</h2>

          <p className="font-semibold text-black">{artist}</p>
        </div>
      </div>
    </>
  );
};

export default GroupSong;
