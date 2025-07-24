import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef, memo } from "react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Constants for menu items
const cocktailLists = [
  { name: "Transparent Style" },
  { name: "Transparent Blue" },
  { name: "Transparent Pink" },
  { name: "Transparent Yellow" },
  { name: "Transparent Green" },
  { name: "Black Style" },
  { name: "White Style" },
  { name: "Red Style" },
  { name: "Blue Style" },
  { name: "Pink Style" },
  { name: "Yellow Style" },
  { name: "Green Style" },
];

const mockTailLists = [
  { name: "Animal Charms" },
  { name: "Flower Charms" },
  { name: "Heart Charms" },
  { name: "Star Charms" },
  { name: "Music Note Charms" },
  { name: "Sports Charms" },
  { name: "Food Charms" },
  { name: "Nature Charms" },
  { name: "Symbol Charms" },
  { name: "Letter Charms" },
  { name: "Number Charms" },
  { name: "Custom Charms" },
];

const SiliconeMenu = memo(() => {
  const sectionRef = useRef(null)

  useGSAP(() => {
    if (typeof window === "undefined") return;
    
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 30%',
        end: 'bottom 80%',
        scrub: true,
      }
    })

    parallaxTimeline
      .from('#c-left-leaf', { x: -100, y: 100 })
      .from('#c-right-leaf', { x: 100, y: 100 })

    return () => {
      parallaxTimeline.kill()
      if (parallaxTimeline.scrollTrigger) parallaxTimeline.scrollTrigger.kill()
    }
  }, [])

  return (
    <section id="cocktails" ref={sectionRef}>
      <img
        src="https://cdn.shopify.com/s/files/1/0757/2144/1500/files/charms12.webp?v=1753171174"
        alt="Decorative left leaf"
        id="c-left-leaf"
        loading="lazy"
      />
      <img
        src="https://cdn.shopify.com/s/files/1/0757/2144/1500/files/charms21.webp?v=1753171175"
        alt="Decorative right leaf"
        id="c-right-leaf"
        loading="lazy"
      />

      <div className="list">
        <div className="popular">
          <h2>Craft Your Smart Lock with Silicone Covers:</h2>
          <ul>
            {cocktailLists.map(({ name }) => (
              <li key={name}>
                <h3>{name}</h3>
              </li>
            ))}
          </ul>
        </div>

        <div className="loved">
          <h2>Personalize Your Smart Lock with Shoe Charms:</h2>
          <ul>
            {mockTailLists.map(({ name }) => (
              <li key={name}>
                <h3>{name}</h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
})

SiliconeMenu.displayName = 'SiliconeMenu'

export default SiliconeMenu
