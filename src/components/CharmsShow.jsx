import { useEffect, useRef } from "react";
import gsap from "gsap";

const bgList = [
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/background2.png?v=1753255487",
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/background3.png?v=1753255487",
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/background5.png?v=1753255487"
];

// 直接在这里自定义图片URL
const charmsList = [
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/purple1.webp?v=1753084318",
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/purple2.webp?v=1753084318",
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/purple3.webp?v=1753084318",
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/purple4.webp?v=1753084318",
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/purple5.webp?v=1753084318",
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/pink1.webp?v=1753084318",
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/pink2.webp?v=1753084318",
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/pink3.webp?v=1753084318",
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/pink4.webp?v=1753084318",
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/pink5.webp?v=1753084318",
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/blue1.webp?v=1753084317",
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/blue2.webp?v=1753084317",
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/blue3.webp?v=1753084317",
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/blue4.webp?v=1753084317",
  "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/blue5.webp?v=1753084317"
];

// 平均分组（每组5个，最后一组可多可少）
const groupSize = 5;
const charmsGroups = [];
for (let i = 0; i < charmsList.length; i += groupSize) {
  charmsGroups.push(charmsList.slice(i, i + groupSize));
}

const CharmsShow = () => {
  const containerRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      containerRefs.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
      {bgList.map((bg, idx) => (
        <div
          key={`group-${idx}`}
          ref={(el) => (containerRefs.current[idx] = el)}
          className="relative w-full rounded-3xl overflow-hidden mb-8 md:mb-12 lg:mb-16"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            aspectRatio: "16/9",
            minHeight: "300px"
          }}
        >
          {/* 叠加层以增强对比度 */}
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* 内容 */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8 p-6 md:p-8 lg:p-12 h-full">
            {charmsGroups[idx] && charmsGroups[idx].map((charm, charmIdx) => (
              <div
                key={charmIdx}
                className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 overflow-hidden shadow-lg hover:scale-110 transition-transform duration-300"
              >
                <img
                  src={charm}
                  alt={`Charm ${charmIdx + 1}`}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharmsShow;
