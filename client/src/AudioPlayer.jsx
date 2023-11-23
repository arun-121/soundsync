import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
const AudioPlayer = () => {
  const [audioFile, setAudio] = useState(null);
  useEffect(() => {
    async function fetchAudio() {
      try {
        const res = await fetch("http://localhost:3000/audio", {
          headers: { Range: "bytes=0-100000" },
        });
        console.log(res.headers);
        if (res.ok) {
          const blob = await res.blob();
          setAudio("http://localhost:3000/audio");
          console.log(URL.createObjectURL(blob));
        } else {
          console.log("error ");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAudio();
  }, []);

  return (
    <>
      <div>
        <audio src={audioFile} controls preload></audio>
      </div>
    </>
  );
};
export default AudioPlayer;
