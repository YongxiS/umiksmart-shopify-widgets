import Hero from './components/Hero'
import SiliconeMenu from './components/SiliconeMenu'
import About from './components/About'
import CharmsShow from './components/CharmsShow'
import ProductPadlock from './components/ProductPadlock'
import VideoShow from './components/VideoShow'
import Show from './components/Show'

function App() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <SiliconeMenu />
      <About />
      <CharmsShow />
      <ProductPadlock />
      <VideoShow />
      <Show />
    </main>
  )
}

export default App
