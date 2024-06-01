import { Link } from 'react-router-dom';
import './LandingPage.css';
import { Button, Row, Col } from 'react-bootstrap';

const LandingPage = () => {

  return (
    <div className="landing-page">
      <section id="section1" className="section">
        <p>ExhibitEase Art Gallery</p>
        <Link to={"/home"}><Button variant='outline-light fw-bold px-4 py-2'>Our Collections</Button></Link>
      </section>
      <section id="section3" className="section py-4">
        <Row className='pic mx-4 px-5 pb-5 pt-4 align-items-center'>
          <Col md={6} className= 'pt-4'>
            <div className='d-flex justify-content-between'>
              <img src="./image10.png" alt="..." width='48%' height='200px' />
              <img src="./image11.png" alt="..." width='48%' height='200px' style={{brightness:'0.1'}}/>
            </div>
            <img src="./i1.png" alt="..." width='100%' height='270px' style={{paddingTop:'20px'}}/>
          </Col>
          <Col className='ps-3 pt-4'>
            <p className='picCol text-center'>ExhibitEase Art Gallery</p>
            <p className='picp'>Welcome to ExhibitEase Art Gallery, an esteemed cultural institution nestled in the heart of the city. Our gallery is renowned for its exquisite collection of diverse art forms, making it a premier destination for art enthusiasts and tourists alike. With a rich history and a vibrant present, ExhibitEase is dedicated to celebrating the beauty and power of visual art.</p>
            <p className='picp'>Founded in 1985, ExhibitEase Art Gallery has grown to become one of the leading art galleries in the region. Housed in a beautifully restored historical building, the gallery offers an enchanting blend of classical and contemporary architecture, providing a perfect backdrop for the artworks on display.</p>
          </Col>
        </Row>
      </section>
      <section id="section2" className="section py-4">
      <Row className='pic mx-5 p-5 align-items-center'>
          <Col className='pe-3 pt-3'>
            <p className='head text-center'>The Collection</p>
            <p className='pipp'>“IT IS PROBABLY NOT ONLY WHAT YOU SEE BUT MORE WHAT YOU FEEL."  Inviting you to experience the <b>ExhibitEase </b>Collection featuring artwork that captures the beauty and complexity of the world around us. The selection offers emotional journeys that are full of aesthetic beauty, nostalgia, and awe. Each image tells a meaningful story that connects us to the subjects. From abstract prints to landscapes, the <b>ExhibitEase</b> Collection offers a diverse range of artwork to suit any taste or style.</p>
            <Link to={"/home"}><Button variant='outline-dark fs-4 fw-bold rounded-circle'><i className="fas fa-arrow-right"></i></Button></Link>
          </Col>
          <Col md={6} className='text-center pt-4'>
            <img src="./image9.png" alt="..." width='90%' height='350px' />
          </Col>
        </Row>
      </section>
      <section id="section4" className="section py-5">
        <p className='fs-1 fw-bold pb-5' style={{color:'#B3C8CF',fontFamily:'Sedan SC, serif'}}>Featured Paintings</p>
        <Row className='d-flex image mb-5' style={{width:'100%'}}>
          <Col className="image-grid pt-3">
            <div className="grid-item">
              <img src="./image1.png" alt="..." />
            </div>
            <div className="grid-item">
              <img src="./image2.png" alt="..." />
            </div>
            <div className="grid-item">
              <img src="./image3.png" alt="..." />
            </div>
            <div className="grid-item">
              <img src="./image4.png" alt="..." />
            </div>
          </Col>
          <Col class="container collage1">
            <div class="grid-container">
              <div class="item item1">
                <img src="./i3.jpg" alt="image1" width='100px' height='100px' />
              </div>
              <div class="item item2">
                <img src="./g3.jpg" alt="image2" width='150px' height='150px' />
              </div>
              <div class="item item3">
                <img src="./i4.jpg" alt="image3" width='175px' height='175px' />
              </div>
              <div class="item item4">
                <img src="./g2.jpg" alt="image4" width='150px' height='150px' />
              </div>
              <div class="item item5">
                <img src="./i2.jpg" alt="image5" width='100px' height='100px' />
              </div>
              <div class="item item6">
                <img src="./i1.png" alt="image6" width='200px' height='200px' />
              </div>
              <div class="item item7">
                <img src="./g1.jpg" alt="image7" width='150px' height='175px' />
              </div>
            </div>
          </Col>
          <Col className="image-grid pt-3">
            <div className="grid-item">
              <img src="./image5.png" alt="..." />
            </div>
            <div className="grid-item">
              <img src="./image6.png" alt="..." />
            </div>
            <div className="grid-item">
              <img src="./image7.png" alt="..." />
            </div>
            <div className="grid-item">
              <img src="./image8.png" alt="..." />
            </div>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default LandingPage;