import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Vina from './pages/Vina'
import Sirevi from './pages/Sirevi'
import Uparivanje from './pages/Uparivanje'
import { RouteNames } from './constants' 

function App() {
  


  return (
    <Container>
      <Izbornik />
        <Routes>
          <Route path={RouteNames.HOME} element={<Home />} />
          <Route path={RouteNames.VINA} element={<Vina />} />
          <Route path={RouteNames.SIREVI} element={<Sirevi />} />
          <Route path={RouteNames.UPARIVANJE} element={<Uparivanje />} />
        </Routes>      
      <hr />
      &copy; Tankred
    </Container>
  )
}

export default App
