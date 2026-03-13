import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { IME_APLIKACIJE } from "../constants";
import { useNavigate } from "react-router-dom";

export default function Izbornik() {

  const navigate = useNavigate()

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="bg-wines" href="#home">{IME_APLIKACIJE}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
             onClick={()=>navigate(RouteNames.HOME)}>
              Početna</Nav.Link>

            <Nav.Link
             onClick={()=>navigate(RouteNames.VINA)}>
              Vina 🍷</Nav.Link>
              
            <Nav.Link
             onClick={()=>navigate(RouteNames.SIREVI)}
              >Sirevi 🧀</Nav.Link>

            <Nav.Link
             onClick={()=>navigate(RouteNames.UPARIVANJE)}
              >Uparivanje 🍷🧀</Nav.Link>
           
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}