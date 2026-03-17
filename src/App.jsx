import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { RouteNames } from './constants'
import VinaPregled from './pages/vina/VinaPregled'
import SireviPregled from './pages/sirevi/SireviPregled'
import UparivanjeService from './services/uparivanje/UparivanjeService'

function App() {



  return (
    <Container>
      <Izbornik />
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.VINA_PREGLED} element={<VinaPregled />} />
        <Route path={RouteNames.SIREVI_PREGLED} element={<SireviPregled />} />
        <Route path={RouteNames.UPARIVANJE} element={<UparivanjeService />} />
      </Routes>
      <hr />
      &copy; Tankred
    </Container>
  )
}

export default App
