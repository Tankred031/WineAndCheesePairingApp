import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UparivanjePregled from './pages/uparivanje/UparivanjeVinoPregled'
import { RouteNames } from './constants'
import VinaPregled from './pages/vina/VinaPregled'
import SireviPregled from './pages/sirevi/SireviPregled'
import VinaNovi from './pages/vina/VinaNovi'
import SireviNovi from './pages/sirevi/SireviNovi'
import VinaPromjena from './pages/vina/VinaPromjena'
import SireviPromjena from './pages/sirevi/SireviPromjena'
import Zanimljivosti from './pages/zanimljivosti/Zanimljivosti'
import UparivanjeVinoPromjena from './pages/uparivanje/UparivanjeVinoPromjena'
import UparivanjeVinoPregled from './pages/uparivanje/UparivanjeVinoPregled'
import UparivanjeSirPromjena from './pages/uparivanje/UparivanjeSirPromjena'
import UparivanjeSirPregled from '.pages/uparivanje/UparivanjeSirevaPregled'
import GeneriranjePodataka from './pages/GeneriranjePodataka'



function App() {



  return (
    <Container style={{ backgroundColor: window.localStorage === 'localhost' ? 'salmon' : 'none' }}>
      <Izbornik />
      <Container className='app'>
        <Routes>
          <Route path={RouteNames.HOME} element={<Home />} />
          <Route path={RouteNames.VINA_PREGLED} element={<VinaPregled />} />
          <Route path={RouteNames.SIREVI_PREGLED} element={<SireviPregled />} />

          <Route path={RouteNames.UPARIVANJE_VINO_PREGLED} element={<UparivanjeVinoPregled />} />
          <Route path={RouteNames.UPARIVANJE_VINO_PROMJENA} element={<UparivanjeVinoPromjena />} />          
          <Route path={RouteNames.UPARIVANJE_SIR_PREGLED} element={<UparivanjeSirPregled />} />
          <Route path={RouteNames.UPARIVANJE_SIR_PROMJENA} element={<UparivanjeSirPromjena />} />

          <Route path={RouteNames.VINA_NOVI} element={<VinaNovi />} />
          <Route path={RouteNames.SIREVI_NOVI} element={<SireviNovi />} />
          <Route path={RouteNames.VINA_PROMJENA} element={<VinaPromjena />} />
          <Route path={RouteNames.SIREVI_PROMJENA} element={<SireviPromjena />} />

          <Route path={RouteNames.ZANIMLJIVOSTI} element={<Zanimljivosti />} />
          <Route path={RouteNames.GENERIRANJE_PODATAKA} element={<GeneriranjePodataka />} />
        </Routes>
      </Container>
      <hr />
      <p className='footer'>&copy; Wine and Cheese Pairing App</p>
    </Container>
  )
}

export default App
