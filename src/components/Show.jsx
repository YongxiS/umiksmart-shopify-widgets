import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Show = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const video = videoRef.current;
    if (!video) return;

    // GSAP控制视频播放
    gsap.to(video, {
      scrollTrigger: {
        trigger: video,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => video.play(),
        onEnterBack: () => video.play(),
        onLeave: () => video.pause(),
        onLeaveBack: () => video.pause(),
        toggleActions: "play pause play pause"
      },
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power2.out"
    });
  }, []);

  return (
    <section id="show-section">
      <div className="showvideo-container">
        <video
          ref={videoRef}
          className="showvideo"
          src="https://cdn.shopify.com/videos/c/o/v/2db3e02dfd8541c08d030051e57fa668.mp4"
          type="video/mp4"
          muted
          playsInline
          loop
          preload="none"
        />
      </div>
    </section>
  );
};

export default Show;
