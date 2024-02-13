import { useState } from "react";
import img1 from "../assets/16.png";
const Carousel = () => {
  const img = [
    "https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  const handlePrev = (e) => {
    current == 0 ? setCurrent(img.length - 1) : setCurrent((c) => c - 1);
    console.log(current);
  };

  const handleNext = (e) => {
    current == img.length - 1 ? setCurrent(0) : setCurrent((c) => c + 1);
    console.log(current);
  };
  const [current, setCurrent] = useState(0);
  return (
    <>
      <div className="flex ">
        <button onClick={handlePrev}>prev</button>
        <img src={img[current]} width="800" height="300" />
        <button onClick={handleNext}>next</button>
      </div>
    </>
  );
};

export default Carousel;
