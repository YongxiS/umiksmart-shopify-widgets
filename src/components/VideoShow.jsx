import gsap from "gsap";
import React, { useRef, useState, useEffect, useCallback } from "react";

const GAP = 16;
const MAX_CONTAINER = 1440;

const getVisibleCount = () => {
  if (window.innerWidth >= 1024) return 5;
  if (window.innerWidth >= 768) return 3;
  return 1;
};

const getCardWidth = (visibleCount) => {
  const containerPadding = 32;
  const screenWidth = Math.min(window.innerWidth, MAX_CONTAINER);
  const totalGap = GAP * (visibleCount - 1);
  let width = Math.floor((screenWidth - containerPadding - totalGap) / visibleCount);
  // 手机端等比缩小30%
  if (visibleCount === 1) {
    width = Math.floor(width * 0.7);
  }
  return width;
};

const ArrowButton = ({ direction, onClick, ariaLabel }) => (
  <button
    className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform duration-200 border-2 border-white/30 bg-transparent"
    onClick={onClick}
    aria-label={ariaLabel}
  >
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="rgba(0,0,0,0.3)" />
      {direction === "left" ? (
        <polyline points="24,12 16,20 24,28" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      ) : (
        <polyline points="16,12 24,20 16,28" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      )}
    </svg>
  </button>
);

const VideoShow = () => {
  const [videoList] = useState([
    "https://cdn.shopify.com/videos/c/o/v/81e47bfc0fda4d8c884ffa974fc5eb2c.mp4",
    "https://cdn.shopify.com/videos/c/o/v/d209a683ec5d4f01a7aadf94d22c8b48.mp4",
    "https://cdn.shopify.com/videos/c/o/v/9ae3acd297a84ba0b424477b943ce8f6.mp4",
    "https://cdn.shopify.com/videos/c/o/v/14856eef0f0c4e0fa7572d57f5ab5f06.mp4",
    "https://cdn.shopify.com/videos/c/o/v/676fb75db4434186b2033ab0717f2aa0.mp4",
    "https://cdn.shopify.com/videos/c/o/v/66325b4669b34d9fa129423415ee7985.mp4",
    "https://cdn.shopify.com/videos/c/o/v/d6e349d8582e408f9d61ad226fa62a5a.mp4"
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [cardWidth, setCardWidth] = useState(300);
  const [isLoading, setIsLoading] = useState(true);

  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  const updateLayout = useCallback(() => {
    const newVisibleCount = getVisibleCount();
    const newCardWidth = getCardWidth(newVisibleCount);
    
    setVisibleCount(newVisibleCount);
    setCardWidth(newCardWidth);
  }, []);

  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
    
    // 初始加载完成
    const timer = setTimeout(() => {
      setIsLoading(false);
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }, 500);

    return () => {
      window.removeEventListener('resize', updateLayout);
      clearTimeout(timer);
    };
  }, [updateLayout]);

  const maxIndex = Math.max(0, videoList.length - visibleCount);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  const slideToIndex = useCallback((index) => {
    if (!sliderRef.current) return;
    
    const translateX = -(index * (cardWidth + GAP));
    gsap.to(sliderRef.current, {
      x: translateX,
      duration: 0.6,
      ease: "power2.out"
    });
  }, [cardWidth]);

  useEffect(() => {
    slideToIndex(currentIndex);
  }, [currentIndex, slideToIndex]);

  const handleVideoClick = (index) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full py-16 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Product Showcase
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See our smart locks in action with detailed demonstrations
          </p>
        </div>

        {/* Video Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
            <ArrowButton
              direction="left"
              onClick={handlePrev}
              ariaLabel="Previous video"
            />
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
            <ArrowButton
              direction="right"
              onClick={handleNext}
              ariaLabel="Next video"
            />
          </div>

          {/* Video Container */}
          <div 
            className="overflow-hidden mx-16"
            style={{ 
              maxWidth: MAX_CONTAINER,
              margin: '0 auto',
              paddingLeft: '64px',
              paddingRight: '64px'
            }}
          >
            <div
              ref={sliderRef}
              className="flex"
              style={{ gap: `${GAP}px` }}
            >
              {videoList.map((videoSrc, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 cursor-pointer group"
                  style={{ width: cardWidth }}
                  onClick={() => handleVideoClick(index)}
                >
                  <div className="relative aspect-video bg-gray-800 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-300">
                    <video
                      src={videoSrc}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => e.target.pause()}
                    />
                    
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-yellow-400/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>

                    {/* Video Number Indicator */}
                    <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      {index + 1} / {videoList.length}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-yellow-400 w-8'
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {[
            { title: "4K Quality", desc: "Crystal clear video demonstrations" },
            { title: "Multiple Angles", desc: "See every detail and feature" },
            { title: "Real Usage", desc: "Actual product demonstrations" },
            { title: "Easy Setup", desc: "Step-by-step installation guides" }
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoShow;
