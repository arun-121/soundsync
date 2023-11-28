import { getAudioElement } from "./util";
const GroupSong=( name, icon, audio, artist,)=>{
    let audioElement = getAudioElement();
    return (
      <>
        <div
          onClick={() => {
            audioElement.src = `http://localhost:3000/audio/` + audio;
            audioElement.play();
            // callback();
          }}
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
          className="bg-transparent drop-shadow-2xl  p-3 cursor-pointer hover:scale-90 delay-100 hover:bg-gray-900 duration-100 relative"
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
  
            <p>{artist}</p>
          </div>
        </div>
      </>
    );
  };
  
}
export default GroupSong;