import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./GACNavbar.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function GACNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg"  className='nav'>
      <Container >
        <Navbar.Brand href="#home" className='nav-brand'>Ganadhar Ayucare</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="nav-nav-links me-auto">
            <Nav.Link href="#features">Products</Nav.Link>
            <Nav.Link href="#pricing">Categories</Nav.Link>
            <Nav.Link href="#pricing">About Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#">Login/Sign up</Nav.Link>
            <Nav.Link><i class="bi bi-basket3-fill">cart</i></Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GACNavbar;