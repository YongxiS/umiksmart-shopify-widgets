import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
    useGSAP(() => {
        if (typeof window === "undefined") return;
        
        // Since SplitText is premium, we'll use a simpler word animation
        const words = document.querySelectorAll('#about h2');
        
        if (words.length > 0) {
            const scrollTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#about',
                    start: 'top center'
                }
            })

            scrollTimeline.from(words, {
                opacity: 0,
                duration: 1,
                y: 50,
                ease: 'expo.out',
                stagger: 0.02
            })
        }
    })

    return (
        <div id="about">
            <div className="mb-16">
                <div className="content">
                    <div className="main-content">
                        <p className="badge">Best Padlock</p>
                        <h2>Where every detail matters <span style={{color: 'white'}}>-</span>
                        from smart mechanism to silicone cover
                        </h2>
                    </div>

                    <div className="sub-content">
                        <p>
                            Every lock we craft is a testament to our commitment to detail —
                            from the initial design to the final silicone cover. This meticulous
                            attention transforms a simple security device into a personalized statement of style.
                        </p>

                        <div>
                            <p style={{fontSize: '1.5rem', fontWeight: 'bold'}}>
                                <span>4.5</span>/5
                            </p>
                            <p style={{fontSize: '0.875rem', color: '#000'}}>
                                More than +12000 customers
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="top-grid">
                <div className="grid-item fade-in">
                    <div className="noisy"/>
                    <img src="https://cdn.shopify.com/s/files/1/0757/2144/1500/files/photo1.jpg?v=1753249763" alt="grid-img-1" loading="lazy" />
                </div>

                <div className="grid-item-large fade-in">
                    <div className="noisy"/>
                    <img src="https://cdn.shopify.com/s/files/1/0757/2144/1500/files/photo2.jpg?v=1753249763" alt="grid-img-2" loading="lazy" />
                </div>

                <div className="grid-item fade-in">
                    <div className="noisy"/>
                    <img src="https://cdn.shopify.com/s/files/1/0757/2144/1500/files/photo3.jpg?v=1753249763" alt="grid-img-5" loading="lazy" />
                </div>
            </div>

            <div className="bottom-grid">
                <div className="grid-item-wide fade-in">
                    <div className="noisy"/>
                    <img src="https://cdn.shopify.com/s/files/1/0757/2144/1500/files/photo4.jpg?v=1753249763" alt="grid-img-3" loading="lazy" />
                </div>
                <div className="grid-item fade-in">
                    <div className="noisy"/>
                    <img src="https://cdn.shopify.com/s/files/1/0757/2144/1500/files/photo5.jpg?v=1753249763" alt="grid-img-4" loading="lazy" />
                </div>
            </div>
        </div>
    )
}

export default About
