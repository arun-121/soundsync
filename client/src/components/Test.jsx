import { useState, useEffect } from "react";
import SideBar from "./SideBar";

const Test = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    function fetchData() {
      fetch("http://localhost:3000/songData")
        .then((r) => r.json())
        .then((data) => {
          setData(data);
          console.log(data);
        });
    }

    fetchData();
  }, []);

  if (data.length != 0) {
    return (
      <div className="flex  ">
        <div>
          <SideBar />
        </div>
        <div
          className="flex flex-wrap
         overflow-y-scroll  h-[50vh] bg-violet-200"
        >
          {data.map((e, i) => (
            <div key={i} className="m-2 bg-green-200 p-3">
              <img
                onClick={() => {}}
                src={`http://127.0.0.1:3000/${e.icon}`}
                alt=""
                width="150px"
                height="150px"
                style={{ borderRadius: "10px" }}
              />
              <h1>{e.name}</h1>
              <p>{e.artist}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Test;
