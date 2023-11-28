import { useEffect, useRef, useState } from "react";
import { socket } from "./scoket.js";
import Song from "./Song.jsx";
import SideBar from "./SideBar.jsx";
const GroupRoom = () => {
  const queryRef = useRef();
  const [query, setQuery] = useState(null);
  const [data, setData] = useState(null); //chat data
  const [Songdata, setSongData] = useState(null);
  const roomref = useRef();
  const msgref = useRef();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
  }, []);
  function handleMsg() {
    socket.emit("chat", {
      val: msgref.current.value,
      Room: roomref.current.value,
    });
  }
  useEffect(() => {
    function fetchData() {
      fetch("http://localhost:3000/songData")
        .then((r) => r.json())
        .then((data) => {
          setSongData(data);
          // console.log(data);
        });
    }

    fetchData();
  }, []);

  function handleRoom() {
    socket.emit("join_room", { Room: roomref.current.value });
  }
  socket.on("receive", (data) => {
    setData(data);
  });

  return (
    <>
      <div className="font-custom w-[100%] h-[100vh] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600  ">
        <div className="flex justify-center ">
          <div>
            <input
              placeholder="search here"
              className="bg-slate-200 m-5 w-[500px] h-[30px] rounded-md p-5 outline-none"
              type="text"
              ref={queryRef}
            />
          </div>
          <div>
            <button
              className=" bg-slate-200 m-5 w-[100px] h-[40px] rounded-md "
              type="button"
              onClick={() => {
                setQuery(queryRef.current.value);
              }}
            >
              search
            </button>
          </div>
        </div>

        <div className="">
          <label htmlFor="room">Enter Room id:</label>
          <input type="number" name="room" id="" ref={roomref} />
          <button onClick={handleRoom}>enter</button>
          <br></br>
          <label htmlFor="msg">Message:</label>

          <input type="text" name="" id="" ref={msgref} />

          <button onClick={handleMsg}>send</button>
          {data && <h1>{data}</h1>}
        </div>
        {query &&
          Songdata.map((ele, i) =>
            query.trim() == ele.name.trim() ? <Song {...ele} key={i} /> : null
          )}
      </div>
    </>
  );
};
export default GroupRoom;
