import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" style={{background: 'linear-gradient(0deg, rgba(1,18,40,1) 39%, rgba(38,66,71,1) 100%)'}}>
      <div className="footer-container">
        <div className="newsletter pt-4">
          <h5 className='fw-bold'>JOIN OUR NEWSLETTER</h5>
          <p>Sign up to receive awesome content</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button onClick={(e) => { e.preventDefault(); }}>Let’s keep in touch</button>
          </form>
        </div>
        <div className="categories pt-4">
          <h5 className='fw-bold'>CATEGORIES</h5>
          <ul style={{gap:'10px'}}>
            <Link to="/" style={{textDecoration:'none',color:'white'}}><li>Landing Page</li></Link>
            <Link to="/home" style={{textDecoration:'none',color:'white'}}><li>Home</li></Link>
            <Link to="/artworks" style={{textDecoration:'none',color:'white'}}><li>Paintings</li></Link>
            <Link to="/photography" style={{textDecoration:'none',color:'white'}}><li>Photography</li></Link>
            <Link to="/contact" style={{textDecoration:'none',color:'white'}}><li>Contact</li></Link>
          </ul>
        </div>
        <div className="contact-info pt-4">
          <h5 className='fw-bold'>CONTACT INFO</h5>
          <ul>
            <li><i className="fas fa-phone"></i> 701 218 385</li>
            <li><i className="fas fa-envelope"></i> info@exhibiteasegallery.com</li>
            <li><i className="fas fa-map-marker-alt"></i> ExhibitEase Arts Gallery, Chelannur, Kozhikode, India.</li>
          </ul>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-pinterest"></i>
            <i className="fab fa-linkedin"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
        <div className='links pt-4'>
          <h5 className='fw-bold'>OFFICE HOURS</h5>
          <ul>
            <li className='fw-bold'>Tuesday - Sunday</li>
            <li>10:25 AM to 05:15 PM</li>
          </ul>
          <ul>
            <li className='fw-bold'>Lunch Break</li>
            <li>01:15 to 02:00 PM</li>
          </ul>
          <ul>
            <li className='fw-bold'>Monday : <span className='text-danger'>Holiday</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom pb-1">
        <p>© Copyright 2023 Tulika Art Gallery. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;