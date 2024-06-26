import { useEffect, useState } from "react";
import { getAudioElement } from "./util";
import { Play, Pause } from "lucide-react";
import Searchbar from "./SearchBar";
import Song from "./Song";
import SideBar from "./SideBar";
import { usePlayingContext } from "./context/PlayingContextProvider";

function Progressbar() {
  console.log("re rendered");
  const [duration, setDuration] = useState(0);
  const [currenttime, setCurrentTime] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [currsec, setCurrSec] = useState(0);
  const [currmin, setCurrMin] = useState(0);

  let audioElement = getAudioElement();
  audioElement.onDurationChange = (e) => {
    setDuration(e);
    setMin(Math.floor(e / 60));
    setSec(Math.floor(e % 60));
  };
  audioElement.onUpdateTime = (e) => {
    setCurrentTime(e);
    setCurrMin(Math.floor(e / 60));
    setCurrSec(Math.floor(e % 60));
  };

  return (
    <>
      <div className="flex justify-center items-center ">
        <div>
          <span className="mr-5">{`${currmin}:${
            currsec < 10 ? "0" : ""
          }${currsec}`}</span>
        </div>
        <div style={{ width: "80%" }}>
          <input
            style={{ cursor: "pointer", width: "100%", marginTop: "5px" }}
            type="range"
            min="0"
            max={duration}
            value={currenttime}
            onChange={(e) => {
              audioElement.currentTime = e.target.value;
            }}
            className="flex-1 "
          />
        </div>
        <div>
          <span className="ml-5">{`${min}:${sec < 10 ? "0" : ""}${sec}`}</span>
        </div>
      </div>
    </>
  );
}

const AudioPlayer = () => {
  console.log("audio player ");
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const { isPlaying, setIsPlaying } = usePlayingContext();
  window.audioElement = getAudioElement();
  function handlePlayPause() {
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioElement.play();
      setIsPlaying(!isPlaying);
    }
  }
  useEffect(() => {
    function fetchData() {
      fetch("http://localhost:3000/songData")
        .then((r) => r.json())
        .then((data) => {
          setData(data);
          setfilteredData(data);
        });
    }

    fetchData();
  }, []);

  return data.length != 0 ? (
    <>
      <div className="flex gap-3 bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 ">
        <SideBar />
        <div style={{ position: "relative" }}>
          <Searchbar />

          <div>
            <div
              className=" win-height flex flex-wrap gap-5  noScrollBar mr-1"
              style={{ flex: "1", overflowX: "scroll", height: "78vh" }}
            >
              {filteredData.map((e, i) => (
                <Song
                  audioElement
                  {...e}
                  key={i}
                  callback={() => {
                    setIsPlaying(true);
                  }}
                />
              ))}
            </div>
            <div
              className="font-custom bg-gradient-to-r from-indigo-500 p-4 text-white-950"
              style={{
                textAlign: "center",
                height: "10vh",
              }}
            >
              <div
                onClick={handlePlayPause}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isPlaying ? <Pause /> : <Play />}
              </div>
              <div>
                <Progressbar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <h1>loading...</h1>
    </>
  );
};
export default AudioPlayer;
