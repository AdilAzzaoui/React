import React from 'react';
import './detail.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactezNous = () => {
  return (
    <div className="contact-page">
      <Container>
        <Row>
          <Col md={6}>
            <h1>Contactez-nous</h1>
            <p>N'hésitez pas à nous contacter pour toute question ou demande d'information.</p>
            <ul className="contact-info">
              <li><i className="fas fa-envelope"></i> contact@exemple.com</li>
              <li><i className="fas fa-phone"></i> +123 456 7890</li>
              <li><i className="fas fa-map-marker-alt"></i> Adresse, Ville, Pays</li>
            </ul>
          </Col>
          <Col md={6}>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Nom</Form.Label>
                <Form.Control type="text" placeholder="Votre nom" />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Votre email" />
              </Form.Group>
              <Form.Group controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Votre message" />
              </Form.Group>
              <Button variant="primary" type="submit">Envoyer</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactezNous;
