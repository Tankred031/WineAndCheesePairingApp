import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Sirevi from './pages/Sirevi'
import { RouteNames } from './constants' 

function App() {
  


  return (
    <Container>
      <Izbornik />
        <Routes>
          <Route path={RouteNames.HOME} element={<Home />} />
          <Route path={RouteNames.SIREVI} element={<Sirevi />} />
        </Routes>      
      <hr />
      &copy; Tankred
    </Container>
  )
}

export default App
