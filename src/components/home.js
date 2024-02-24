import React, { useState, useEffect } from "react";
import "./home.css";

const Home = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [playing, setPlaying] = useState(true); // Auto play the active video
  const [likes, setLikes] = useState(Array(videoUrls.length).fill(false));

  useEffect(() => {
    // Auto play the first video when the component mounts
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
    setPlaying(!playing); // Toggle play/pause
  };

  const scrollToVideo = (index) => {
    setCurrentVideoIndex(index);
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
                allow="autoplay"
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
                {likes[index] ? "Liked" : "Like"}
              </button>
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
            </div>
          </div>
        ))}
      </div>

      <div className="scroll-buttons">
        <button
          onClick={() =>
            scrollToVideo(
              currentVideoIndex === 0
                ? videoUrls.length - 1
                : currentVideoIndex - 1
            )
          }
        >
          Up
        </button>
        <button
          onClick={() =>
            scrollToVideo(
              currentVideoIndex === videoUrls.length - 1
                ? 0
                : currentVideoIndex + 1
            )
          }
        >
          Down
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
  "https://player.vimeo.com/video/453600755",
  "https://player.vimeo.com/video/453600755",
  "https://player.vimeo.com/video/453600755",
  "https://player.vimeo.com/video/453600755",
];

export default Home;
