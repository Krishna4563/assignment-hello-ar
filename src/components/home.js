import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./home.css";

const Home = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [playing, setPlaying] = useState(false); // State to manage play/pause

  useEffect(() => {
    setPlaying(true); // Start playing the active video when component mounts
  }, [currentVideoIndex]); // Update playing state when current video index changes

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" && currentVideoIndex > 0) {
        setCurrentVideoIndex((prevIndex) => prevIndex - 1);
      } else if (
        e.key === "ArrowDown" &&
        currentVideoIndex < videoUrls.length - 1
      ) {
        setCurrentVideoIndex((prevIndex) => prevIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentVideoIndex]);

  return (
    <section>
      <div className="video-carousel">
        {videoUrls.map((url, index) => (
          <div
            key={index}
            className={`video-item ${
              index === currentVideoIndex ? "active" : ""
            }`}
            onClick={() => setCurrentVideoIndex(index)}
          >
            <ReactPlayer
              url={url}
              playing={index === currentVideoIndex && playing} // Set playing based on index and playing state
              controls={false}
              loop
              width="100%"
              height="100%"
            />
          </div>
        ))}
      </div>

      <div className="controls">
        <button
          onClick={() => setCurrentVideoIndex((prevIndex) => prevIndex - 1)}
          disabled={currentVideoIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentVideoIndex((prevIndex) => prevIndex + 1)}
          disabled={currentVideoIndex === videoUrls.length - 1}
        >
          Next
        </button>
      </div>
    </section>
  );
};

const videoUrls = [
  "https://player.vimeo.com/video/453600755",
  "https://player.vimeo.com/video/453600755",
  "https://player.vimeo.com/video/453600755",
  "https://player.vimeo.com/video/453600755",
];

export default Home;
