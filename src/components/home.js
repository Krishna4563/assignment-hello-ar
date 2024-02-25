import React, { useState, useEffect } from "react";
import "./home.css";

const Home = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [likes, setLikes] = useState(Array(videoUrls.length).fill(false));

  useEffect(() => {
    setPlaying(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && currentVideoIndex > 0) {
        setCurrentVideoIndex((prevIndex) => prevIndex - 1);
      } else if (
        e.key === "ArrowRight" &&
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

  useEffect(() => {
    const videoItem = document.getElementById(
      `video-item-${currentVideoIndex}`
    );
    if (videoItem) {
      videoItem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentVideoIndex]);

  const handleVideoClick = () => {
    setPlaying(!playing);
  };

  const toggleLike = (index) => {
    setLikes((prevLikes) => {
      const newLikes = [...prevLikes];
      newLikes[index] = !newLikes[index];
      return newLikes;
    });
  };

  return (
    <section className="section">
      <div className="video-carousel">
        {videoUrls.map((url, index) => (
          <div
            key={index}
            id={`video-item-${index}`}
            className={`video-item ${
              index === currentVideoIndex ? "active" : ""
            }`}
            onClick={() => setCurrentVideoIndex(index)}
          >
            <div className="iframe-container">
              <iframe
                title={`video-${index}`}
                src={url}
                frameBorder="0"
                autoplay="autoplay"
                {...(index === currentVideoIndex && { autoplay: "autoplay" })}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="react-player"
                onClick={handleVideoClick}
              ></iframe>
              <button
                className={`like-button ${likes[index] ? "liked" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(index);
                }}
              >
                <svg
                  class="filled"
                  height="32"
                  width="32"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0H24V24H0z" fill="none"></path>
                  <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path>
                </svg>
                {/* {likes[index] ? "Liked" : "Like"} */}
              </button>
            </div>
          </div>
        ))}

        <div className="controls">
          <button
            className="left-prev-btn"
            onClick={() =>
              setCurrentVideoIndex(
                currentVideoIndex === 0
                  ? videoUrls.length - 1
                  : currentVideoIndex - 1
              )
            }
          >
            Previous
          </button>
          <button
            className="right-next-btn"
            onClick={() =>
              setCurrentVideoIndex(
                currentVideoIndex === videoUrls.length - 1
                  ? 0
                  : currentVideoIndex + 1
              )
            }
          >
            Next
          </button>
        </div>

        <div className="scroll-buttons">
          <button
            className="scroll-up"
            onClick={() =>
              setCurrentVideoIndex(
                currentVideoIndex === 0
                  ? videoUrls.length - 1
                  : currentVideoIndex - 1
              )
            }
          >
            Up
          </button>
          <button
            className="scroll-down"
            onClick={() =>
              setCurrentVideoIndex(
                currentVideoIndex === videoUrls.length - 1
                  ? 0
                  : currentVideoIndex + 1
              )
            }
          >
            Down
          </button>
        </div>
      </div>
    </section>
  );
};

const videoUrls = [
  "https://player.vimeo.com/video/353394440",
  "https://player.vimeo.com/video/453600755",
  "https://player.vimeo.com/video/454811664",
  "https://player.vimeo.com/video/592765562",
  "https://player.vimeo.com/video/473384846",
  "https://player.vimeo.com/video/453256886",
  "https://player.vimeo.com/video/513077157",
  "https://player.vimeo.com/video/526013050",
];

export default Home;
