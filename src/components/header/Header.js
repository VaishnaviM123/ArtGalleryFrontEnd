import React from 'react'
import './header.css'
import { Nav, Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
        {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} className="py-0 ps-3 header" style={{background: 'linear-gradient(0deg, rgba(108,115,116,1) 0%, rgba(78,84,92,1) 72%)'}}>
          <Container fluid>
            <h1 className='pt-1'>
              <Link to={'/'}><img alt="..." src="logo.png" className='i1' />
              <img src="./name.png" alt="..." className='i2' /></Link>
            </h1>   
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
              <Nav className='nav'>
                <ul>
                    <Link to="/home" style={{textDecoration:'none'}}><li>Home</li></Link>
                    <Link to="/artworks" style={{textDecoration:'none'}}><li>Art Works</li></Link>
                    <Link to="/photography" style={{textDecoration:'none'}}><li>Photography</li></Link>
                    <Link to="/contact" style={{textDecoration:'none'}}><li>Contact</li></Link>
                  </ul>              
                </Nav>
            </Navbar.Collapse>

          </Container>
        </Navbar>
      ))}
    </div>
  )
}

export default Header