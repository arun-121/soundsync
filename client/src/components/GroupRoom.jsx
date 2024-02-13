import { useEffect, useRef, useState } from "react";
import animData from "../assets/animation.json";
import anim2 from "../assets/anim2.json";
import { socket } from "./scoket.js";
import { toast } from "react-toastify";
import GroupSong from "./GroupSong.jsx";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";
import Lottie from "lottie-react";
import SideBar from "./SideBar.jsx";
const GroupRoom = () => {
  const queryRef = useRef();
  const [query, setQuery] = useState(null);
  const [data, setData] = useState([]); //chat data
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
    console.log(data);
  }
  useEffect(() => {
    roomref.current.focus();
  }, []);

  useEffect(() => {
    function fetchData() {
      fetch("http://localhost:3000/songData")
        .then((r) => r.json())
        .then((data) => {
          setSongData(data);
        });
    }

    fetchData();
  }, []);

  function handleRoom() {
    if (roomref.current.value != "") {
      console.log(roomref.current.value);
      socket.emit("join_room", { Room: roomref.current.value });
      toast.success(`Joined in Room ${roomref.current.value} ❗`, {
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
  }

  useEffect(() => {
    function handleReceivedQuery(data) {
      setQuery(data);
    }
    socket.on("receive_query", handleReceivedQuery);

    return () => {
      socket.off("receive_query", handleReceivedQuery);
    };
  }, []);

  useEffect(() => {
    const handleMsgrecv = (r) => {
      setData(() => [...data, r]);
    };
    socket.on("receive", handleMsgrecv);
    return () => {
      socket.off("receieve", handleMsgrecv);
    };
  }, [data]);

  return (
    <div className="flex">
      <SideBar />
      <div className="w-[100%] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
        <div className=" w-[100%] h-[100vh]">
          {query && (
            <Lottie
              animationData={anim2}
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                bottom: "0px",
                width: "30%",
              }}
            />
          )}
          <div style={{}}>
            <div className="flex justify-center ">
              <div>
                <input
                  placeholder="search here"
                  className="bg-slate-200 m-5 w-[500px] h-[30px] font-custom rounded-md p-5 outline-none"
                  type="text"
                  ref={queryRef}
                />
              </div>
              <div>
                <button
                  className="font-custom bg-slate-200 m-5 w-[100px] h-[40px] rounded-md "
                  type="button"
                  onClick={() => {
                    socket.emit("send_query", {
                      query: queryRef.current.value,
                      Room: roomref.current.value,
                    });
                  }}
                >
                  search
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
            }}
          >
            <label className="font-custom" htmlFor="room">
              Enter Room id:
            </label>
            <div>
              <input
                type="number"
                onRateChange={(e) => {
                  console.log(e);
                }}
                name="room"
                id=""
                ref={roomref}
                className="font-custom bg-slate-200 m-1 w-[150px] h-[30px] rounded-md p-5 outline-none"
              />
              <button
                className="font-custom bg-slate-200 m-5 w-[100px] h-[40px] rounded-md"
                onClick={handleRoom}
              >
                enter
              </button>
            </div>
          </div>
          <div className="flex justify-center ">
            {query && (
              <>
                {Songdata.filter(
                  (ele) =>
                    ele.name.trim().toLowerCase() == query.trim().toLowerCase()
                ).map((ele) => (
                  <GroupSong
                    {...ele}
                    room={roomref.current.value}
                    key={ele.id}
                  />
                ))}
              </>
            )}
          </div>
        </div>
        {query && (
          <>
            <div
              className=" absolute flex flex-col"
              style={{
                borderRadius: "10px",
                background: "",
                boxShadow: "rgba(0, 0, 0, 0.8) 0px 5px 15px",
                bottom: "20px",
                right: "20px",
                height: "300px",
                padding: "10px",
                width: "30%",
              }}
            >
              <label htmlFor="msg" className="font-custom">
                Chat
              </label>

              <div
                className="noScrollBar font-custom"
                style={{
                  width: "100%",
                  height: "100%",

                  background: "rgba(0, 0, 0, 0.45) ",
                  borderRadius: "10px",
                  overflowY: "scroll",
                }}
              >
                <div className="font-custom p-6 text-red-50">
                  {data.map((e, i) => (
                    <div className="flex gap-2  w-[100%] ">
                      {/* <CircleUser /> */}
                      <p key={i} style={{ "font-size": "14px" }}>
                        {`⁘` + e}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-row h-[45px] justify-center align-middle font-custom">
                <input
                  style={{ borderRadius: "5px" }}
                  type="text"
                  name=""
                  id=""
                  ref={msgref}
                  placeholder="type here"
                  className="bg-slate-200 mt-2  w-[100%]  p-5 outline-none"
                />

                <button
                  onClick={handleMsg}
                  style={{ borderRadius: "5px " }}
                  className=" font-custom bg-white w-[100px] ml-2 h-[90%] mt-2 "
                >
                  send
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default GroupRoom;
