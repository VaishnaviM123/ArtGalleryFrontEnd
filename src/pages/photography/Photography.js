import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Button, Modal, Card, Container, Row, Col, Dropdown, Pagination } from 'react-bootstrap';
import '../artworks/ArtWork.css';
import { accessCategoryAPI, accessPhotosAPI, addPCategoryAPI, addPhotoAPI, deletePhotoAPI, editPhotoAPI } from '../../services/AllApis';
import { toast } from 'react-toastify';
import { Trash2 } from 'react-feather';

function Photography() {
  const [show2, setShow2] = useState(false);
  const [allPhotos, setAllPhotos] = useState([]);
  const [sortedPhotos, setSortedPhotos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [photographInputs, setPhotographInputs] = useState({
    name: "",
    artist: "",
    pImage: "",
    category: "",
    size: "",
    price: ""
  });
  const [allcategory, getAllCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);

  const setData = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setPhotographInputs({ ...photographInputs, [name]: value });
  };

  const addPhoto = async () => {
    const { name, artist, pImage, category, size, price } = photographInputs;
    if (category === "" || pImage === "" || price === "" || size === "") {
      toast.warning("Fill all * data");
    } else {
      let updatedName = name === "" ? "Unknown" : name;
      let updatedArtist = artist === "" ? "Unknown" : artist;

      const newPhoto = {
        name: updatedName,
        artist: updatedArtist,
        pImage,
        category,
        size,
        price
      };

      try {
        const out = await addPhotoAPI(newPhoto);

        if (out.status >= 200 && out.status < 300) {
          const photoId = out.data.id; 
          const newPhotoCat = {
            id: photoId, 
            name: updatedName,
            artist: updatedArtist,
            pImage,
            size,
            price
          };

          const categoryData = allcategory.find(i => category === i.name);

          if (categoryData) {
            categoryData.photographs.push(newPhotoCat);
            await addPCategoryAPI(categoryData, categoryData.id);
          }
          setPhotographInputs({});
          handleClose2();
          toast('🦄 Photograph added successfully!');
          setSortedPhotos([...allPhotos, newPhoto]);
        } else {
          throw new Error('Photograph adding failed');
        }
      } catch (error) {
        toast.error(`${error.message}`);
      }
    }
  };

  const getPhotos = async () => {
    const out = await accessPhotosAPI();
    const out2 = await accessCategoryAPI();
    if (out.status >= 200 && out.status < 300) {
      setAllPhotos(out.data);
      setSortedPhotos(out.data);
      getAllCategory(out2.data);
    } else {
      toast.error("Photos fetching failed");
    }
  };

  const searchItem = (e) => {
    let searchTerm = e.toLowerCase();
    let filteredPhotos = allPhotos.filter(photo =>
      photo.name.toLowerCase().includes(searchTerm) ||
      photo.artist.toLowerCase().includes(searchTerm) ||
      photo.category.toLowerCase().includes(searchTerm)
    );
    filteredPhotos.sort((a, b) => a.name.localeCompare(b.name));
    setSortedPhotos(filteredPhotos);
  };

  const sortPhotos = (order) => {
    const sorted = [...allPhotos].sort((a, b) => {
      if (order === "A-Z") {
        return a.name.localeCompare(b.name);
      } else if (order === "Z-A") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
    setSortedPhotos(sorted);
  };

  const filterByCategory = (category) => {
    if (category === 'All') {
      setSortedPhotos(allPhotos);
    } else {
      const filteredPhotos = allPhotos.filter(photo => photo.category === category);
      setSortedPhotos(filteredPhotos);
    }
  };

  const deletePhoto = async (i) => {
    const out = await deletePhotoAPI(i);
    if (out.status >= 200 && out.status < 300) {
      toast("Photo Deleted Successfully");
      getPhotos();
    } else {
      toast.error("Photo Deleting failed");
    }
  };

  const editPhoto1 = (id) => {
    const photoToEdit = allPhotos.find(photo => photo.id === id);
    if (photoToEdit) {
      setPhotographInputs({
        name: photoToEdit.name,
        artist: photoToEdit.artist,
        pImage: photoToEdit.pImage,
        category: photoToEdit.category,
        size: photoToEdit.size,
        price: photoToEdit.price
      });
      setSelectedPhotoId(id);
      setEditMode(true);
      setShow2(true);
    }
  };

  const editPhoto2 = async () => {
    const { name, artist, pImage, category, size, price } = photographInputs;
    if (category === "" || pImage === "" || price === "" || size === "") {
      toast.warning("Fill all * data");
    } else {
      const updatedPhoto = {
        name: name === "" ? "Unknown" : name,
        artist: artist === "" ? "Unknown" : artist,
        pImage,
        category,
        size,
        price
      };

      const updatePhotoCat = {
        id: selectedPhotoId,
        name: name === "" ? "Unknown" : name,
        artist: artist === "" ? "Unknown" : artist,
        pImage,
        size,
        price
      };

      try {
        const res = await editPhotoAPI(selectedPhotoId, updatedPhoto);
        if (res.status >= 200 && res.status < 300) {
          const categoryData = allcategory.find(i => category === i.name);

          if (categoryData) {
            const updatedCategoryList = categoryData.photographs.filter(video => selectedPhotoId !== video.id);
            categoryData.photographs = [];
            if (updatedCategoryList != []) { updatedCategoryList.map(i => categoryData.photographs.push(i)) }
            categoryData.photographs.push(updatePhotoCat);
            console.log(categoryData);
            await addPCategoryAPI(categoryData, categoryData.id);
          }

          toast("Updated Successfully");
          setPhotographInputs({});
          setAllPhotos(allPhotos.map(photo => photo.id === selectedPhotoId ? updatedPhoto : photo));
          setSortedPhotos(sortedPhotos.map(photo => photo.id === selectedPhotoId ? updatedPhoto : photo));
          setShow2(false);
          setEditMode(false);
          setSelectedPhotoId(null);
        } else {
          throw new Error('Photograph updating failed');
        }
      } catch (error) {
        toast.error(`${error.message}`);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => { getPhotos(); }, []);

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedPhotos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedPhotos.length / itemsPerPage);

  return (
    <div className='py-5 art'>

      <Modal show={show2} onHide={() => setShow2(false)} backdrop="static" keyboard={false}>
        <div style={{ backgroundColor: '#FED8B1', padding: '10px', borderRadius: '10px', fontFamily: 'Playfair Display, serif' }}>
          <div style={{ backgroundColor: '#fff', color: 'black', borderRadius: '2px' }}>
            <Modal.Header className='d-flex text-center justify-content-center align-items-center flex-column'>
              <Modal.Title className='fs-2 pb-2'>{editMode ? 'Edit' : 'Add'} Photograph Details</Modal.Title>
              <InputGroup>
                <Form.Control type="text" placeholder="Photograph Name" name="name"
                  style={{ marginBottom: '14px', boxShadow: 'none', backgroundColor: 'transparent' }} value={photographInputs.name} onChange={(e) => setData(e)} />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text style={{ backgroundColor: 'transparent', outline: 'none', border: 'none', position: 'absolute', zIndex: '1', top: '5px' }}>
                  *
                </InputGroup.Text>
                <Form.Control type="url" placeholder="Photograph Image Url" name="pImage"
                  style={{ marginBottom: '14px', paddingLeft: '30px', boxShadow: 'none', backgroundColor: 'transparent' }} value={photographInputs.pImage} onChange={(e) => setData(e)} />
              </InputGroup>
              <InputGroup>
                <Form.Control type="text" placeholder="Artist Name" name="artist"
                  style={{ marginBottom: '14px', boxShadow: 'none', backgroundColor: 'transparent' }} value={photographInputs.artist} onChange={(e) => setData(e)} />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text style={{ backgroundColor: 'transparent', outline: 'none', border: 'none', position: 'absolute', zIndex: '1', top: '5px' }}>
                  *
                </InputGroup.Text>
                <Form.Select name="category" style={{ marginBottom: '14px', paddingLeft: '30px', boxShadow: 'none', backgroundColor: 'transparent' }} onChange={(e) => setData(e)} disabled={editMode}>
                  <option value="">Select Category</option>
                  <option value="Summer">Summer</option>
                  <option value="Monsoon">Monsoon</option>
                  <option value="Winter">Winter</option>
                  <option value="People">People</option>
                  <option value="Nature">Nature</option>
                  <option value="Facade">Facade</option>
                  <option value="Figurative">Figurative</option>
                </Form.Select>
              </InputGroup>
              <InputGroup>
                <InputGroup.Text style={{ backgroundColor: 'transparent', outline: 'none', border: 'none', position: 'absolute', zIndex: '1', top: '5px' }}>
                  *
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Price" name="price"
                  style={{ marginBottom: '14px', paddingLeft: '30px', boxShadow: 'none', backgroundColor: 'transparent' }} value={photographInputs.price} onChange={(e) => setData(e)} />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text style={{ backgroundColor: 'transparent', outline: 'none', border: 'none', position: 'absolute', zIndex: '1', top: '5px' }}>
                  *
                </InputGroup.Text>
                <Form.Select name="size" style={{ marginBottom: '14px', paddingLeft: '30px', boxShadow: 'none', backgroundColor: 'transparent' }} onChange={(e) => setData(e)}>
                  <option value="">Select Size</option>
                  <option value="54 x 64cm">54 x 64cm</option>
                  <option value="70 x 84cm">70 x 84cm</option>
                  <option value="94 x 114cm">94 x 114cm</option>
                  <option value="118 x 144cm">118 x 144cm</option>
                  <option value="138 x 169cm">138 x 169cm</option>
                </Form.Select>              
              </InputGroup>
              <div className='mt-2'>
                <Button variant="outline-danger border-2 fw-bolder" onClick={() => setShow2(false)} className='me-4'>Close</Button>
                <Button variant="outline-success border-2 fw-bolder" onClick={editMode ? editPhoto2 : addPhoto}>{editMode ? 'Update' : 'Add'} Photograph</Button>
              </div>
            </Modal.Header>
          </div>
        </div>
      </Modal>

      <h1 className='a1 text-center pb-3'>Discover Captivating Photography That Speaks to Your Soul</h1>

      <Container>
        <div className='a2 d-flex justify-content-between my-5'>
          <Dropdown className='text-center'>
            <Dropdown.Toggle variant="outline-dark fw-bold mb-3" id="dropdown-basic">
              Sort by
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => sortPhotos("A-Z")}>A - Z</Dropdown.Item>
              <Dropdown.Item onClick={() => sortPhotos("Z-A")}>Z - A</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Form inline className="d-flex mb-3">
            <InputGroup className='shadow' style={{ borderRadius: '10px', width: '350px', border: '1px solid rgb(247, 212, 210)' }}>
              <InputGroup.Text style={{ backgroundColor: 'transparent', outline: 'none', border: 'none', position: 'absolute', zIndex: '1', top: '5px' }}>
                <i className="fas fa-magnifying-glass"></i>
              </InputGroup.Text>
              <Form.Control type="search" placeholder="Search by Art, Artist or Category" className="ms-4" aria-label="Search"
                onChange={(e) => searchItem(e.target.value)} style={{ outline: 'none', border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }} />
            </InputGroup>
          </Form>

          <Button variant='outline-dark mb-3 px-3' onClick={handleShow2}>Add New Photograph</Button>

          <Dropdown className='text-center'>
            <Dropdown.Toggle variant="outline-dark fw-bold mb-3" id="dropdown-basic">
              Filter by Category
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => filterByCategory('All')}>All</Dropdown.Item>
              {allcategory.map((cat, index) => (
                <Dropdown.Item key={index} onClick={() => filterByCategory(cat.name)}>
                  {cat.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          
        </div>
      </Container>

      {sortedPhotos?.length > 0 ?
        <div>
          <h1 className='text-center pb-5'>Our Entire Collection</h1>
          <Container className='d-flex flex-column'>
            <Row className='justify-content-center'>
              {currentItems.map(i => (
                <Col key={i.id} className='mb-4 d-flex justify-content-center'>
                  <Card style={{ width: '18em' }}>
                    <div className='card-cont'>
                      <img src={i.pImage} style={{ cursor: 'pointer', width: '100%', height: '290px' }} alt={i.name} />
                      <div className='overlay'>
                        <div className='button-container'>
                          <Button variant="outline-light rounded-circle border-0 p-2" onClick={(e) => deletePhoto(i.id)}><Trash2 /></Button>
                          <Button variant="outline-light rounded-circle border-0" onClick={(e) => editPhoto1(i.id)}><i className="fas fa-edit" /></Button>
                        </div>
                        <div className='details' style={{color:"#FFBF00"}}>
                          <p><strong>Artist:</strong> {i.artist}</p>
                          <p><strong>Category:</strong> {i.category}</p>
                          <p><strong>Size:</strong> {i.size}</p>
                          <p><strong>Price:</strong> ${i.price}</p>
                        </div>
                      </div>
                    </div>
                    <p className='text-center pt-3 fw-bold text-uppercase' style={{letterSpacing:'2px'}}>{i.name}</p>
                  </Card>
                </Col>
              ))}
            </Row>

            <Pagination className="justify-content-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Container>
        </div>
        :
        <div className='text-center'>
          <h1>No Photo available</h1>
          <img src="./p1.gif" alt="..." />
        </div>      
      }
    </div>
  );
}

export default Photography;