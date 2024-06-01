import React from 'react';
import './Contact.css';
import { Button, Col, Row } from 'react-bootstrap';

function Contact() {
  return (
    <div>
        <section className="contact-section pt-1 pb-5">
            <Row className="d-flex justify-content-between">
                <Col className='px-5 mt-5' md={6}>
                    <h1 className='py-4'>CONTACT</h1>
                    <p>For questions or inquiries you can reach out at <span style={{color:'black',fontWeight:'800',cursor:'pointer'}}> contact@exhibiteasegallery.com </span> or use the contact form.</p>
                    <p>Save time and explore the FAQ for the information you need. If you can't find what you're looking for, feel free to reach out to the support team.</p>
                    <Button variant="outline-light fs-5 rounded"><i className="fas fa-arrow-left"></i>  Back to Home </Button>
                </Col>
                <Col>
                    <form className="contact-form px-5 mt-5">
                        <div>
                            <div className="form-field">
                                <label htmlFor="first-name">First name</label>
                                <input type="text" id="first-name" placeholder="First name" />
                                <label htmlFor="last-name">Last name</label>
                                <input type="text" id="last-name" placeholder="Last name" />
                                <label htmlFor="email">Email *</label>
                                <input type="email" id="email" placeholder="Email" />
                                <label htmlFor="message">Message *</label>
                                <textarea id="message" placeholder="Message"></textarea>
                            </div>
                        </div>
                        <Button variant='dark py-2'>Submit</Button>
                    </form>
                </Col>
            </Row>
        </section>
    </div>
  );
}

export default Contact;
