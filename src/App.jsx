import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './pages/zanimljivosti/statistika.css'
import { Button, Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
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
import UparivanjeSirPregled from './pages/uparivanje/UparivanjeSirPregled'
import GeneriranjePodataka from './pages/GeneriranjePodataka'
import Statistika from './pages/zanimljivosti/Statistika'
import Preporuke from './pages/zanimljivosti/preporuke'
import DodajZanimljivost from './pages/zanimljivosti/DodajZanimljivost'
import LoadingSpinner from './components/LoadingSpinner'
import ZanimljivostiPromjena from './pages/zanimljivosti/ZanimljivostiPromjena'
import NadzornaPloca from './pages/NadzornaPloca'
import Login from './pages/login/Login'
import Registracija from './pages/registracija/Registracija'
import useAuth from './hooks/useAuth'
import OperaterPregled from './pages/operateri/OperaterPregled'
import OperaterNovi from './pages/operateri/OperaterNovi'
import OperaterPromjena from './pages/operateri/OperaterPromjena'
import OperaterPromjenaLozinke from './pages/operateri/OperaterPromjenaLozinke'
import "./accessibility/accessibility.css";
import { useState } from 'react'
import AccessibilityMenu from './accessibility/AccessibilityMenu'
import { useAccessibility } from './accessibility/AccessibilityContext'


function App() {

  const { isLoggedIn, authUser } = useAuth()
  const [showAccessibility, setShowAccessibility] = useState(false);
  const {
    increaseText,
    decreaseText,
    toggleGrayscale,
    toggleHighContrast,
    toggleNegativeContrast,
    toggleLightBackground,
    toggleUnderlineLinks,
    toggleReadableFont,
    resetAccessibility
  } = useAccessibility();

  return (
    <>


      <LoadingSpinner />
      <Container className='app-container'>
        <Izbornik />
        <Container className='app'>
          <Routes>

            <Route path={RouteNames.HOME} element={<Home />} />

            {isLoggedIn ? (
              <>

                <Route path={RouteNames.NADZORNA_PLOCA} element={<NadzornaPloca />} />

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
                <Route path={RouteNames.ZANIMLJIVOSTI_STATISTIKA} element={<Statistika />} />
                <Route path={RouteNames.ZANIMLJIVOSTI_PREPORUKE} element={<Preporuke />} />


                <Route path={RouteNames.ZANIMLJIVOSTI_NOVI} element={<DodajZanimljivost />} />
                <Route path={RouteNames.ZANIMLJIVOSTI_PROMJENA} element={<ZanimljivostiPromjena />} />

                {authUser?.uloga === 'admin' && (
                  <>

                    <Route path={RouteNames.OPERATERI} element={<OperaterPregled />} />
                    <Route path={RouteNames.OPERATERI_NOVI} element={<OperaterNovi />} />
                    <Route path={RouteNames.OPERATERI_PROMJENA} element={<OperaterPromjena />} />
                    <Route path={RouteNames.OPERATERI_PROMJENA_LOZINKE} element={<OperaterPromjenaLozinke />} />
                    <Route path={RouteNames.ZANIMLJIVOSTI_NOVI} element={<DodajZanimljivost />} />

                    <Route path={RouteNames.GENERIRANJE_PODATAKA} element={<GeneriranjePodataka />} />

                  </>
                )}

              </>

            ) : (

              <>

                <Route path={RouteNames.LOGIN} element={<Login />} />
                <Route path={RouteNames.REGISTRACIJA} element={<Registracija />} />

              </>

            )}

          </Routes>
        </Container>
        <hr />
        <p className='footer'>&copy; Wine and Cheese Pairing App <br />
          Izradio: Tankred Kralj
        </p>
      </Container>


      <Button
        className={`accessibility-button ${showAccessibility ? "accessibility-button-open" : ""
          }`}
        variant="dark"
        onClick={() => setShowAccessibility(prev => !prev)}
      >
        ♿
      </Button>

      <AccessibilityMenu
        show={showAccessibility}
        handleClose={() => setShowAccessibility(false)}

        increaseText={increaseText}
        decreaseText={decreaseText}
        toggleGrayscale={toggleGrayscale}
        toggleHighContrast={toggleHighContrast}
        toggleNegativeContrast={toggleNegativeContrast}
        toggleLightBackground={toggleLightBackground}
        toggleUnderlineLinks={toggleUnderlineLinks}
        toggleReadableFont={toggleReadableFont}
        resetAccessibility={resetAccessibility}
      />

    </>
  )
}

export default App
