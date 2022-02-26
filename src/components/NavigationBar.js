import {Container, Nav, Navbar} from "react-bootstrap";

const NavigationBar = () => {
    return (
        <Navbar variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home"><strong>Kasir</strong> App</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Link href="#">Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;