import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { RouteNames } from "../constants";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Izbornik() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, authUser } = useAuth();

  return (
    <Navbar className="silver-navbar" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto align-items-center">
            <Nav.Link onClick={() => navigate(RouteNames.HOME)}>
              🏠Početna
            </Nav.Link>

            {isLoggedIn && (
              <>
                <Nav.Link
                  onClick={() => navigate(RouteNames.NADZORNA_PLOCA)}
                >
                  Nadzorna Ploča
                </Nav.Link>

                <NavDropdown title="🍷Vina" id="vina-nav-dropdown">
                  <NavDropdown.Item
                    onClick={() => navigate(RouteNames.VINA_PREGLED)}
                  >
                    Pregled vina
                  </NavDropdown.Item>

                  {authUser.uloga === "admin" && (
                    <>
                      <NavDropdown.Divider />

                      <NavDropdown.Item
                        onClick={() => navigate(RouteNames.OPERATERI)}
                      >
                        Operateri
                      </NavDropdown.Item>

                      <NavDropdown.Divider />

                      <NavDropdown.Item
                        onClick={() =>
                          navigate(RouteNames.GENERIRANJE_PODATAKA)
                        }
                      >
                        Generiraj podatke
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>

                <NavDropdown title="🧀Sirevi" id="sirevi-nav-dropdown">
                  <NavDropdown.Item
                    onClick={() => navigate(RouteNames.SIREVI_PREGLED)}
                  >
                    Pregled sireva
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={() => navigate(RouteNames.SIREVI_NOVI)}
                  >
                    Dodavanje sireva
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title="🍷🧀Uparivanje"
                  id="uparivanje-nav-dropdown"
                >
                  <NavDropdown.Item
                    onClick={() =>
                      navigate(RouteNames.UPARIVANJE_VINO_PREGLED)
                    }
                  >
                    Upari vino sa sirom
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={() =>
                      navigate(RouteNames.UPARIVANJE_SIR_PREGLED)
                    }
                  >
                    Upari sir s vinima
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title="📚Zanimljivosti"
                  id="zanimljivosti-nav-dropdown"
                >
                  <NavDropdown.Item
                    onClick={() => navigate(RouteNames.ZANIMLJIVOSTI)}
                  >
                    Članci
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={() =>
                      navigate(RouteNames.ZANIMLJIVOSTI_STATISTIKA)
                    }
                  >
                    Statistika
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={() => navigate(RouteNames.ZANIMLJIVOSTI_NOVI)}
                  >
                    Dodaj članak/zanimljivost
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={() =>
                      navigate(RouteNames.ZANIMLJIVOSTI_PREPORUKE)
                    }
                  >
                    Preporuke
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav className="ms-auto">
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
                        onClick={() => navigate(RouteNames.REGISTRACIJA)}
                      >
                        Registracija
                      </Button>

                      <Button
                        onClick={() => navigate(RouteNames.LOGIN)}
                      >
                        Login
                      </Button>
                    </>
                  )}
                </Nav>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}