import React, { useEffect, useState } from 'react'
import { Card, Carousel, Row, Col, Container} from 'react-bootstrap';
import { accessCategoryAPI, accessPaintingAPI, accessPhotosAPI } from '../services/AllApis';
import { Link } from 'react-router-dom';

function Home() {

  const [allPaintings,getAllPaintings] = useState([])
  const [allPhotos,getAllPhotos] = useState([])
  const [allCategories,getAllCategories] = useState([])

  const accessAllData = async()=>{
    const res1 = await accessPaintingAPI()
    getAllPaintings(res1.data)

    const res2 = await accessPhotosAPI()
    getAllPhotos(res2.data)

    const res3 = await accessCategoryAPI()
    getAllCategories(res3.data)
  };

  useEffect(()=>{
    accessAllData()
  },[])


  return (
    <div style={{fontFamily:'Playfair Display, serif', color:'#304D30'}}>
      <Carousel className='custom-carousel'>
        <Carousel.Item>
          <img src="./c2.png" alt="..." width='100%' height='400px' />
        </Carousel.Item>
        <Carousel.Item>
          <img src="./c3.png" alt="..." width='100%' height='400px' />
        </Carousel.Item>
        <Carousel.Item>
          <img src="./c4.png" alt="..." width='100%' height='400px' />
        </Carousel.Item>        
        <Carousel.Item>
          <img src="./c5.png" alt="..." width='100%' height='400px' />
        </Carousel.Item>        
        <Carousel.Item>
          <img src="./c6.png" alt="..." width='100%' height='400px' />
        </Carousel.Item>
      </Carousel>

      <div className='pt-5'>
        <h1 className='text-center'>Meet Our Categories</h1>

        <Container>
          <Row className='p-5 d-flex justify-content-around align-items-center'>
            {allCategories?.length>0 ? allCategories.map(i=>(
              <Col className='d-flex justify-content-center'>
                <Card style={{width:'9.4em',border:'none',outline:'none'}}>
                  <Link to={`/category/${i.id}`} style={{textDecoration:'none'}}><img variant="top" className='c4' src={i.cImage} alt={i.name} style={{borderRadius:'50%',width:'150px',height:'150px'}} /></Link>
                    <p className='text-center pt-3 fw-bold text-uppercase' style={{letterSpacing:'2px'}}>{i.name}</p>
                </Card>
              </Col>
            ))
              :
              <div>
                <h1>No Category Found</h1>
                <img src="./p1.gif" alt='...' height='60%'/>
              </div>
            }
          </Row>
        </Container>
      </div>
     
      <div>
        <div className='mx-5 d-flex justify-content-between'>
          <h1>Art Works</h1>
          <Link to={'/artworks'} style={{color:"#304D30"}}><h1><i className='fas fa-arrow-right' /></h1></Link>
        </div>
        <div className='p-5 d-flex justify-content-around'>
        {allPaintings?.length > 0 ? (
          allPaintings.slice(0, 3).map((i) => (
            <Card style={{ width: '18em' }}>
              <div className='card-cont'>
                <img src={i.pImage} style={{ cursor: 'pointer', width: '100%', height: '290px' }} alt={i.name} />
                <div className='overlay details' style={{color:"#FFBF00"}}>
                    <p><strong>Artist:</strong> {i.artist}</p>
                    <p><strong>Category:</strong> {i.category}</p>
                    <p><strong>Size:</strong> {i.size}</p>
                    <p><strong>Price:</strong> ${i.price}</p>
                </div>
              </div>
              <p className='text-center pt-3 fw-bold text-uppercase' style={{letterSpacing:'2px'}}>{i.name}</p>
            </Card>
          ))
        ) : (
          <div>
            <h1>No Paintings Found yet</h1>
            <img src="./p1.gif" alt='...' height='60%'/>
          </div>
        )}
        </div>
      </div>

      <div>
        <div className='mx-5 d-flex justify-content-between'>
          <h1>Photography Works</h1>
          <Link to={'/photography'} style={{color:"#304D30"}}><h1><i className='fas fa-arrow-right' /></h1></Link>
        </div>
        <div className='p-5 d-flex justify-content-around'>
        {allPhotos?.length > 0 ? (
          allPhotos.slice(0, 3).map((i) => (
            <Card style={{ width: '18em' }}>
            <div className='card-cont'>
              <img src={i.pImage} style={{ cursor: 'pointer', width: '100%', height: '290px' }} alt={i.name} />
              <div className='overlay details' style={{color:"#FFBF00"}}>
                <p><strong>Artist:</strong> {i.artist}</p>
                <p><strong>Category:</strong> {i.category}</p>
                <p><strong>Size:</strong> {i.size}</p>
                <p><strong>Price:</strong> ${i.price}</p>
              </div>
            </div>
            <p className='text-center pt-3 fw-bold text-uppercase' style={{letterSpacing:'2px'}}>{i.name}</p>
          </Card>
          ))
        ) : (
          <div>
            <h1>No Photos Found yet</h1>
            <img src="./p1.gif" alt='...' height='60%'/>
          </div>
        )}
        </div>
      </div>

      <div className='py-5'>
        <Container className='w-75 pb-5'>
          <Row className='d-flex align-items-center' style={{backgroundColor:'#EFECEC',boxShadow: '#E1ACAC 0px 1px 6px'}}>
            <Col md={6} className='ps-5'>
              <h1 className='py-3'>Art Gallery</h1>
              <p>Art history is always related to time, culture, and human image at that time. Discover different aspect of art and learn more about the artist behind each artwork.</p>
            </Col>
            <Col className='text-center pt-4'>
              <img src="./i7.png" alt="..." width='50%' height='300px' />
            </Col>
          </Row>
        </Container>
      </div>

    </div>
  )
}

export default Home
