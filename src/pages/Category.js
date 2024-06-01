import { Link, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { accessSingleCategoryAPI } from '../services/AllApis';

function Category() {
  const params = useParams();
  const [category, setCategory] = useState(null);

  const singleData = async () => {
    const { data } = await accessSingleCategoryAPI(params.id);
    setCategory(data);
  };

  useEffect(() => {
    singleData();
  }, [params,singleData]); 

  return (
    <div className='py-5' style={{ backgroundColor: '#EEEEEE', color: '#135D66' }}>
      {category ?
        <div>
          <div className='text-center py-5 pe-1'>
            <h1 className='f1 mb-5 text-uppercase' style={{ fontSize: '350%' }}>{category.name}</h1>
            <Link to="/artWorks" style={{ textDecoration: "none", color: '#135D66' }}>
              <Row className='py-3'>
                <Col sm={3}><h2 className='text-start'>Paintings :</h2></Col>
                <Col className='text-center'>
                  {category.paintings?.length > 0 ? (
                    <Row className='d-flex'>
                      {category.paintings.map((painting) => (
                        <Col className='me-3 mb-4'><img src={painting.pImage} alt="..." width='100px' height='100px' /></Col>
                      ))}
                    </Row>
                  ) : (
                    <h4>No Painting Added Yet!</h4>
                  )}
                </Col>
              </Row>
            </Link>
            <Link to="/artWorks" style={{ textDecoration: "none", color: '#135D66' }}>
              <Row className='py-3'>
                <Col sm={4}><h2 className='text-start'>Photographs : </h2></Col>
                <Col>
                  {category.photographs?.length > 0 ? (
                    <Row className='d-flex'>
                      {category.photographs.map((photo) => (
                        <Col className='me-3 mb-4'><img src={photo.pImage} alt="..." width='100px' height='100px' /></Col>
                      ))}
                    </Row>
                  ) : (
                    <h4>No Photos Added Yet!</h4>
                  )}
                </Col>
              </Row>
            </Link>
          </div>
        </div>
        :
        <h1>Not Found</h1>
      }
    </div>
  );
}

export default Category;