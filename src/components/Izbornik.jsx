import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { RouteNames, DATA_SOURCE } from "../constants";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Izbornik() {

  const navigate = useNavigate();

  const {
    isLoggedIn,
    logout,
    authUser
  } = useAuth();

  return (

    <Navbar className="silver-navbar" expand="lg">

      <Container>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="w-100 align-items-center">

            {/* POČETNA */}
            <Nav.Link
              onClick={() => navigate(RouteNames.HOME)}
            >
              🏠 Početna
            </Nav.Link>

            {/* MENI ZA LOGIRANE */}
            {isLoggedIn && (
              <>

                {/* VINA */}
                <NavDropdown
                  title="🍷 Vina"
                  id="vina-nav-dropdown"
                >

                  <NavDropdown.Item
                    onClick={() =>
                      navigate(RouteNames.VINA_PREGLED)
                    }
                  >
                    Pregled vina
                  </NavDropdown.Item>

                  {authUser.uloga === "admin" && (
                    <>
                      <NavDropdown.Divider />

                      <NavDropdown.Item
                        onClick={() =>
                          navigate(RouteNames.OPERATERI)
                        }
                      >
                        Operateri
                      </NavDropdown.Item>

                      <NavDropdown.Divider />

                      <NavDropdown.Item
                        onClick={() =>
                          navigate(
                            RouteNames.GENERIRANJE_PODATAKA
                          )
                        }
                      >
                        Generiraj podatke
                      </NavDropdown.Item>
                    </>
                  )}

                </NavDropdown>

                {/* SIREVI */}
                <NavDropdown
                  title="🧀 Sirevi"
                  id="sirevi-nav-dropdown"
                >

                  <NavDropdown.Item
                    onClick={() =>
                      navigate(RouteNames.SIREVI_PREGLED)
                    }
                  >
                    Pregled sireva
                  </NavDropdown.Item>

                  {authUser.uloga === "admin" && (
                    <NavDropdown.Item
                      onClick={() =>
                        navigate(RouteNames.SIREVI_NOVI)
                      }
                    >
                      Dodavanje sireva
                    </NavDropdown.Item>
                  )}

                </NavDropdown>

                {/* UPARIVANJE */}
                <NavDropdown
                  title="🍷🧀 Uparivanje"
                  id="uparivanje-nav-dropdown"
                >

                  <NavDropdown.Item
                    onClick={() =>
                      navigate(
                        RouteNames.UPARIVANJE_VINO_PREGLED
                      )
                    }
                  >
                    Upari vino sa sirom
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={() =>
                      navigate(
                        RouteNames.UPARIVANJE_SIR_PREGLED
                      )
                    }
                  >
                    Upari sir s vinima
                  </NavDropdown.Item>

                </NavDropdown>

                {/* ZANIMLJIVOSTI */}
                <NavDropdown
                  title="📚 Zanimljivosti"
                  id="zanimljivosti-nav-dropdown"
                >

                  <NavDropdown.Item
                    onClick={() =>
                      navigate(RouteNames.ZANIMLJIVOSTI)
                    }
                  >
                    Članci
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={() =>
                      navigate(
                        RouteNames.ZANIMLJIVOSTI_STATISTIKA
                      )
                    }
                  >
                    Statistika
                  </NavDropdown.Item>

                  {authUser.uloga === "admin" && (
                    <NavDropdown.Item
                      onClick={() =>
                        navigate(
                          RouteNames.ZANIMLJIVOSTI_NOVI
                        )
                      }
                    >
                      Dodaj članak/zanimljivost
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Item
                    onClick={() =>
                      navigate(
                        RouteNames.ZANIMLJIVOSTI_PREPORUKE
                      )
                    }
                  >
                    Preporuke
                  </NavDropdown.Item>

                </NavDropdown>

                {/* NADZORNA PLOČA */}
                {authUser.uloga === "admin" && (
                  <Nav.Link
                    onClick={() =>
                      navigate(RouteNames.NADZORNA_PLOCA)
                    }
                  >
                    Nadzorna Ploča
                  </Nav.Link>
                )}

              </>
            )}

            {/* DESNA STRANA */}
            <Nav className="ms-auto align-items-center">

              <div className="btn-group me-2">
                <Button
                  variant="warning"
                  size="sm"
                >
                  {DATA_SOURCE}
                </Button>

              </div>
              {isLoggedIn ? (

                <Button
                  className="me-2"
                  onClick={() => logout()}
                >
                  Logout {authUser.email}
                </Button>

              ) : (

                <>
                  <Button
                    className="me-2"
                    onClick={() =>
                      navigate(RouteNames.REGISTRACIJA)
                    }
                  >
                    Registracija
                  </Button>

                  <Button
                    onClick={() =>
                      navigate(RouteNames.LOGIN)
                    }
                  >
                    Login
                  </Button>
                </>

              )}

            </Nav>

          </Nav>

        </Navbar.Collapse>

      </Container>

    </Navbar>
  );
}