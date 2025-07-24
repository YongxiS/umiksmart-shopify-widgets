import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const videoRef = useRef();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    // 叶子滚动动画
    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    // 视频滚动动画
    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    // 确保视频加载完成后再开始动画
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        tl.to(videoRef.current, {
          currentTime: videoRef.current.duration,
        });
      };
    }
  }, [isMobile]);

  // 添加噪点背景
  useEffect(() => {
    const heroElement = document.getElementById('hero');
    if (heroElement && !heroElement.querySelector('.noisy')) {
      const noisyDiv = document.createElement('div');
      noisyDiv.className = 'noisy';
      heroElement.appendChild(noisyDiv);
    }
  }, []);

  return (
    <>
      <section id="hero">
        <h1 className="title" aria-label="Umiksmart">
          {Array.from("Umiksmart").map((char, i) => (
            <span
              key={i}
              className="char-animate text-gradient"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {char}
            </span>
          ))}
        </h1>

        <img
          src="https://cdn.shopify.com/s/files/1/0757/2144/1500/files/left-charms17.webp?v=1753165410"
          alt="left-charms"
          className="left-leaf"
          loading="eager"
        />

        <img
          src="https://cdn.shopify.com/s/files/1/0757/2144/1500/files/right-charms1.webp?v=1753165409"
          alt="right-charms"
          className="right-leaf"
          loading="eager"
        />

        <div className="body">
          <div className="content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="hidden md:block">
              <p
                className="subtitle fade-in subtitle-animate"
                style={{
                  color: "#eb611b",
                  fontFamily: "'DM Serif Text', 'Mona Sans', Arial, sans-serif",
                  fontWeight: 'bold',
                  fontSize: isMobile ? '1.5rem' : '2.25rem',
                  letterSpacing: "0.02em",
                  lineHeight: 1.2,
                }}
              >
                Smart Lock <br /> Quick Unlock and <br/>Security
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle fade-in subtitle-animate" style={{ 
                color: '#000',
                marginBottom: '24px',
                display: 'block',
                width: '100%'
              }}>
                Each of our DIY smart locks is a fusion of innovative design,
                superior craftsmanship, and cutting-edge technology – crafted to elevate your security and style.
              </p>
              <a
                href="#cocktails"
                style={{ 
                  color: 'var(--color-yellow)',
                  display: 'block',
                  width: '100%',
                  marginTop: '16px',
                  textDecoration: 'none'
                }}
                className="fade-in"
              >
                View Style
              </a>
            </div>
          </div>
        </div>

        <video
          ref={videoRef}
          src="https://cdn.shopify.com/videos/c/o/v/5f22e6bafbdf43c3b7fb1d026d31c95e.mp4"
          muted
          playsInline
          preload="auto"
        />
      </section>
    </>
  );
};

export default Hero;
