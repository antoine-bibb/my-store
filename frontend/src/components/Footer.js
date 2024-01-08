import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light">
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p className="mb-0">&copy; {currentYear} JCFits</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
