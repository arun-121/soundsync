import { useEffect, useState } from "react";
import { getAudioElement } from "./util";
import { usePlayingContext } from "./context/PlayingContextProvider";
import React from "react";
const Searchbar = React.memo(() => {
  const [query, setQuery] = useState("");
  const [suggestionUI, setSuggestionUI] = useState([]);
  const [cachedResponses, setCachedResponses] = useState({});
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { isPlaying, setIsPlaying } = usePlayingContext();
  // console.log(usePlayingContext());
  console.log(suggestionUI);
  useEffect(() => {
    if (query === "") return;
    if (cachedResponses[query]) {
      setSuggestionUI(cachedResponses[query]);
    } else {
      const res = setTimeout(() => {
        fetchSuggestions();
      }, 200);

      return () => {
        clearTimeout(res);
      };
    }
  }, [query]);

  function fetchSuggestions() {
    fetch("http://localhost:3000/search/" + query)
      .then((r) => r.json())
      .then((data) => {
        setCachedResponses((prevResponses) => ({
          ...prevResponses,
          [query]: data,
        }));
        setSuggestionUI(data);
      })
      .catch((error) => {
        console.log("Error fetching suggestions:", error);
      });
  }

  return (
    <>
      <div className="flex justify-center ">
        <div>
          <input
            placeholder="search here"
            className="bg-slate-200 m-5 w-[500px] h-[30px] font-custom rounded-md p-5 outline-none"
            type="text"
            onBlur={() => setIsSearchFocused(false)}
            onFocus={() => setIsSearchFocused(true)}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div></div>
      </div>

      {isSearchFocused && query != "" && suggestionUI.length != 0 && (
        <div
          className="flex flex-col  absolute  h-[100px]  w-[500px] z-[1]  gap-4 noScrollBar suggestion"
          style={{
            left: "calc(50%)",
            transform: "translateX(-50%)",
            padding: "10px",
            borderRadius: "10px",
            overflowY: "scroll",
          }}
        >
          {suggestionUI.map((e, i) => {
            return (
              <>
                <div
                  key={i}
                  style={{ cursor: "pointer" }}
                  onMouseDown={(event) => {
                    event.preventDefault(); // Prevents input blur
                    console.log(e);
                    getAudioElement().src = `http://localhost:3000/audio/${e.audio}`;
                    getAudioElement().play();
                    setIsPlaying(true);
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <img
                      src={`http://127.0.0.1:3000/${e.icon}`}
                      alt=""
                      width={"50px"}
                      height={"50px"}
                      onClick={() => console.log("f")}
                      style={{ borderRadius: "100px" }}
                    />
                    <h1 style={{ color: "white" }} className="font-custom">
                      {e.name}
                    </h1>
                  </div>
                  <hr
                    style={{
                      backgroundColor: "white",
                      height: 1,
                      marginTop: "5px",
                      borderColor: "white",
                    }}
                  />
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
});

export default Searchbar;
