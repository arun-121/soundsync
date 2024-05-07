import { useContext, useState } from "react";
import PlayingContext from "./PlayingContext";
const PlayingContextProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <PlayingContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </PlayingContext.Provider>
  );
};

export function usePlayingContext() {
  return useContext(PlayingContext);
}

export default PlayingContextProvider;
