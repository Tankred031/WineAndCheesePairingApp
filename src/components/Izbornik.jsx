import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { RouteNames } from "../constants";
import { useNavigate } from "react-router-dom";



export default function Izbornik() {
  const navigate = useNavigate()

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => navigate(RouteNames.HOME)}>
              Početna</Nav.Link>

            <NavDropdown title="🍷Vina" id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={() => navigate(RouteNames.VINA_PREGLED)}
              >Pregled vina</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="🧀Sirevi" id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={() => navigate(RouteNames.SIREVI_PREGLED)}
              >Pregled sireva</NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => navigate(RouteNames.SIREVI_NOVI)}
              >Dodavanje sireva</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link
              onClick={() => navigate(RouteNames.UPARIVANJE)}
            >🍷🧀Uparivanje</Nav.Link>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

   

  )
}