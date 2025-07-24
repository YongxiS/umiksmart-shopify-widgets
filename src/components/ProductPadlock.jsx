import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const productSeries = [
	{
		name: "Padlock",
		link: "/series1",
		products: [
			{
				name: "Padlock Blue",
				img: "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/Main_image4.webp?v=1753081174",
				btnLink: "https://umiksmart.com/products/fingerprint-lock-blue",
			},
			{
				name: "Padlock Pink",
				img: "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/Main_image3.webp?v=1753081174",
				btnLink: "https://umiksmart.com/products/fingerprint-lock-pink",
			},
			{
				name: "Padlock Tie Dye",
				img: "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/Main_image2.webp?v=1753081174",
				btnLink: "https://umiksmart.com/products/fingerprint-lock-tie-dye",
			},
			{
				name: "Padlock White",
				img: "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/Main_image1.webp?v=1753081174",
				btnLink: "https://umiksmart.com/products/fingerprint-lock-white",
			},
		],
	},
	{
		name: "Smart Lock",
		link: "/series2",
		products: [
			{
				name: "T83 Wood",
				img: "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/T83-1.webp?v=1753151266",
				btnLink: "https://umiksmart.com/products/umik-umiksamrt-smart-lock-smart-security-and-home-automation-for-your-hom-wood-grain",
			},
			{
				name: "T83 Black",
				img: "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/T83-3.webp?v=1753151266",
				btnLink: "https://umiksmart.com/products/home-security-smart-lock-automation",
			},
			{
				name: "T83 Silver",
				img: "https://cdn.shopify.com/s/files/1/0757/2144/1500/files/T83-2.webp?v=1753151266",
				btnLink: "https://umiksmart.com/products/umik-umiksamrt-smart-lock-smart-security-and-home-automation-for-your-home-silver",
			},
		],
	},
];

const ProductPadlock = () => {
	const [currentSeriesIndex, setCurrentSeriesIndex] = useState(0);
	const [currentProductIndex, setCurrentProductIndex] = useState(0);
	const containerRef = useRef(null);
	const imageRef = useRef(null);
	const titleRef = useRef(null);

	useEffect(() => {
		// 初始动画
		gsap.fromTo(
			containerRef.current,
			{ opacity: 0, y: 50 },
			{ opacity: 1, y: 0, duration: 1, ease: "power2.out" }
		);
	}, []);

	useEffect(() => {
		// 产品切换动画
		const tl = gsap.timeline();
		
		tl.to([imageRef.current, titleRef.current], {
			opacity: 0,
			y: 20,
			duration: 0.3,
			ease: "power2.inOut"
		})
		.set(imageRef.current, {
			rotation: gsap.utils.random(-5, 5)
		})
		.to([imageRef.current, titleRef.current], {
			opacity: 1,
			y: 0,
			duration: 0.5,
			ease: "back.out(1.7)"
		});
	}, [currentSeriesIndex, currentProductIndex]);

	const currentSeries = productSeries[currentSeriesIndex];
	const currentProduct = currentSeries?.products[currentProductIndex];

	const handleSeriesClick = (index) => {
		setCurrentSeriesIndex(index);
		setCurrentProductIndex(0);
	};

	const handleProductClick = (index) => {
		setCurrentProductIndex(index);
	};

	const handleShopNow = () => {
		if (currentProduct?.btnLink) {
			window.open(currentProduct.btnLink, '_blank');
		}
	};

	return (
		<div 
			ref={containerRef}
			className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 px-4"
		>
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
						Our Products
					</h2>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						Discover our complete range of smart security solutions
					</p>
				</div>

				{/* Series Navigation */}
				<div className="flex justify-center mb-12">
					<div className="bg-white/10 backdrop-blur-md rounded-full p-2">
						{productSeries.map((series, index) => (
							<button
								key={index}
								onClick={() => handleSeriesClick(index)}
								className={`px-6 py-3 mx-2 rounded-full transition-all duration-300 ${
									currentSeriesIndex === index
										? 'bg-yellow-500 text-black font-semibold'
										: 'text-white hover:bg-white/20'
								}`}
							>
								{series.name}
							</button>
						))}
					</div>
				</div>

				{/* Main Product Display */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
					{/* Product Image */}
					<div className="relative">
						<div className="aspect-square bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
							<img
								ref={imageRef}
								src={currentProduct?.img}
								alt={currentProduct?.name}
								className="w-full h-full object-contain filter drop-shadow-2xl"
							/>
						</div>
					</div>

					{/* Product Info */}
					<div className="text-center lg:text-left">
						<h3 
							ref={titleRef}
							className="text-3xl md:text-5xl font-bold text-white mb-6"
						>
							{currentProduct?.name}
						</h3>
						
						<p className="text-xl text-gray-300 mb-8 leading-relaxed">
							Experience the perfect blend of security and style with our premium smart locks. 
							Each device features cutting-edge technology wrapped in elegant design.
						</p>

						<button
							onClick={handleShopNow}
							className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-transform duration-200 shadow-2xl"
						>
							Shop Now
						</button>
					</div>
				</div>

				{/* Product Grid */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
					{currentSeries?.products.map((product, index) => (
						<div
							key={index}
							onClick={() => handleProductClick(index)}
							className={`relative aspect-square bg-white/5 rounded-2xl p-4 cursor-pointer transition-all duration-300 border-2 ${
								currentProductIndex === index
									? 'border-yellow-400 bg-yellow-400/10'
									: 'border-white/10 hover:border-white/30 hover:bg-white/10'
							}`}
						>
							<img
								src={product.img}
								alt={product.name}
								className="w-full h-full object-contain"
							/>
							<div className="absolute bottom-2 left-2 right-2">
								<p className="text-white text-sm font-medium truncate">
									{product.name}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Features */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
					<div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
						<div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-4 4-4-4 4-4 .257-.257A6 6 0 1118 8zm-6-2a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
							</svg>
						</div>
						<h4 className="text-xl font-semibold text-white mb-2">Fingerprint Recognition</h4>
						<p className="text-gray-300">Advanced biometric security with 0.3s unlock speed</p>
					</div>

					<div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
						<div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
							</svg>
						</div>
						<h4 className="text-xl font-semibold text-white mb-2">Smart Security</h4>
						<p className="text-gray-300">Multiple unlock methods with app integration</p>
					</div>

					<div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
						<div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
							</svg>
						</div>
						<h4 className="text-xl font-semibold text-white mb-2">Customizable Design</h4>
						<p className="text-gray-300">Interchangeable silicone covers in multiple colors</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductPadlock;
