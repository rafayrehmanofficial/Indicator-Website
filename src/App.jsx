import Nav from './components/Nav'
import Ticker from './components/Ticker'
import Hero from './components/Hero'
import Engine from './components/Engine'
import Stats from './components/Stats'
import Proof from './components/Proof'
import Method from './components/Method'
import Qualify from './components/Qualify'
import Seat from './components/Seat'
import Faq from './components/Faq'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <div className="crt" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Engine />
        <Stats />
        <Proof />
        <Method />
        <Qualify />
        <Seat />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
