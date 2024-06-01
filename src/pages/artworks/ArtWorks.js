import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Button, Modal, Card, Container, Row, Col, Dropdown, Pagination } from 'react-bootstrap';
import '../artworks/ArtWork.css';
import { accessCategoryAPI, accessPaintingAPI, addPCategoryAPI, addPaintingAPI, deletePaintingAPI, editPaintingAPI } from '../../services/AllApis';
import { toast } from 'react-toastify';
import { Trash2 } from 'react-feather';

function ArtWorks() {
  const [show2, setShow2] = useState(false);
  const [allPaintings, setAllPaintings] = useState([]);
  const [sortedPaintings, setSortedPaintings] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedPaintingId, setSelectedPaintingId] = useState(null);
  const [paintingInputs, setPaintingInputs] = useState({
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
    setPaintingInputs({ ...paintingInputs, [name]: value });
  };

  const addPainting = async () => {
    const { name, artist, pImage, category, size, price } = paintingInputs;
    if (category === "" || pImage === "" || price === "" || size === "") {
      toast.warning("Fill all * data");
    } else {
      let updatedName = name === "" ? "Unknown" : name;
      let updatedArtist = artist === "" ? "Unknown" : artist;

      const newPainting = {
        name: updatedName,
        artist: updatedArtist,
        pImage,
        category,
        size,
        price
      };

      try {
        const out = await addPaintingAPI(newPainting);

        if (out.status >= 200 && out.status < 300) {
          const paintingId = out.data.id; 
          const newPaintingCat = {
            id: paintingId, 
            name: updatedName,
            artist: updatedArtist,
            pImage,
            size,
            price
          };

          const categoryData = allcategory.find(i => category === i.name);

          if (categoryData) {
            categoryData.paintings.push(newPaintingCat);
            await addPCategoryAPI(categoryData, categoryData.id);
          }
          setPaintingInputs({});
          handleClose2();
          toast('🦄 Painting added successfully!');
          setAllPaintings([...allPaintings, newPainting]);
          setSortedPaintings([...sortedPaintings, newPainting]);
        } else {
          throw new Error('Painting adding failed');
        }
      } catch (error) {
        toast.error(`${error.message}`);
      }
    }
  };

  const getPaintings = async () => {
    const out = await accessPaintingAPI();
    const out2 = await accessCategoryAPI();
    if (out.status >= 200 && out.status < 300) {
      setAllPaintings(out.data);
      setSortedPaintings(out.data);
      getAllCategory(out2.data);
    } else {
      toast.error("Paintingfetching failed");
    }
  };

  const searchItem = (e) => {
    let searchTerm = e.target.value.toLowerCase();
    let filteredPaintings = allPaintings.filter(p => 
      (p.name && p.name.toLowerCase().includes(searchTerm)) ||
      (p.artist && p.artist.toLowerCase().includes(searchTerm)) ||
      (p.category && p.category.toLowerCase().includes(searchTerm))
    );
    filteredPaintings.sort((a, b) => a.name.localeCompare(b.name));
    setSortedPaintings(filteredPaintings);
  };

  const sortedPainting = (order) => {
    const sorted = [...allPaintings].sort((a, b) => {
      if (order === "A-Z") {
        return a.name.localeCompare(b.name);
      } else if (order === "Z-A") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
    setSortedPaintings(sorted);
  };

  const filterByCategory = (category) => {
    if (category === 'All') {
      setSortedPaintings(allPaintings);
    } else {
      const filteredPaintings = allPaintings.filter(p => p.category === category);
      setSortedPaintings(filteredPaintings);
    }
  };

  const deletePaintings = async (i) => {
    const out = await deletePaintingAPI(i);
    if (out.status >= 200 && out.status < 300) {
      toast("Painting Deleted Successfully");
      getPaintings();
    } else {
      toast.error("Painting Deleting failed");
    }
  };

  const editPainting1 = (id) => {
    const paintingToEdit = allPaintings.find(p => p.id === id);
    if (paintingToEdit) {
      setPaintingInputs({
        name: paintingToEdit.name,
        artist: paintingToEdit.artist,
        pImage: paintingToEdit.pImage,
        category: paintingToEdit.category,
        size: paintingToEdit.size,
        price: paintingToEdit.price
      });
      setSelectedPaintingId(id);
      setEditMode(true);
      setShow2(true);
    }
  };

  const editPainting2 = async () => {
    const { name, artist, pImage, category, size, price } = paintingInputs;
    if (category === "" || pImage === "" || price === "" || size === "") {
      toast.warning("Fill all * data");
    } else {
      const updatedPating = {
        name: name === "" ? "Unknown" : name,
        artist: artist === "" ? "Unknown" : artist,
        pImage,
        category,
        size,
        price
      };

      const updatePaintingCat = {
        id: selectedPaintingId,
        name: name === "" ? "Unknown" : name,
        artist: artist === "" ? "Unknown" : artist,
        pImage,
        size,
        price
      };

      try {
        const res = await editPaintingAPI(selectedPaintingId, updatedPating);
        if (res.status >= 200 && res.status < 300) {
          const categoryData = allcategory.find(i => category === i.name);

          if (categoryData) {
            const updatedCategoryList = categoryData.paintings.filter(art => selectedPaintingId !== art.id);
            categoryData.paintings = [];
            if (updatedCategoryList != []) { updatedCategoryList.map(i => categoryData.paintings.push(i)) }
            categoryData.paintings.push(updatePaintingCat);
            console.log(categoryData);
            await addPCategoryAPI(categoryData, categoryData.id);
          }

          toast("Updated Successfully");
          setPaintingInputs({});
          setAllPaintings(allPaintings.map(p => p.id === selectedPaintingId ? updatedPating : p));
          setSortedPaintings(sortedPaintings.map(p => p.id === selectedPaintingId? updatedPating : p));
          setShow2(false);
          setEditMode(false);
          setSelectedPaintingId(null);
        } else {
          throw new Error('Painting updating failed');
        }
      } catch (error) {
        toast.error(`${error.message}`);
      }
    }
  };

  useEffect(() => { getPaintings(); }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedPaintings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedPaintings.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='py-5 art'>

      <Modal show={show2} onHide={() => setShow2(false)} backdrop="static" keyboard={false}>
        <div style={{ backgroundColor: '#FED8B1', padding: '10px', borderRadius: '10px', fontFamily: 'Playfair Display, serif' }}>
          <div style={{ backgroundColor: '#fff', color: 'black', borderRadius: '2px' }}>
            <Modal.Header className='d-flex text-center justify-content-center align-items-center flex-column'>
              <Modal.Title className='fs-2 pb-2'>{editMode ? 'Edit' : 'Add'} Painting Details</Modal.Title>
              <InputGroup>
                <Form.Control type="text" placeholder="Painting Name" name="name"
                  style={{ marginBottom: '14px', boxShadow: 'none', backgroundColor: 'transparent' }} value={paintingInputs.name} onChange={(e) => setData(e)} />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text style={{ backgroundColor: 'transparent', outline: 'none', border: 'none', position: 'absolute', zIndex: '1', top: '5px' }}>
                  *
                </InputGroup.Text>
                <Form.Control type="url" placeholder="Photograph Image Url" name="pImage"
                  style={{ marginBottom: '14px', paddingLeft: '30px', boxShadow: 'none', backgroundColor: 'transparent' }} value={paintingInputs.pImage} onChange={(e) => setData(e)} />
              </InputGroup>
              <InputGroup>
                <Form.Control type="text" placeholder="Artist Name" name="artist"
                  style={{ marginBottom: '14px', boxShadow: 'none', backgroundColor: 'transparent' }} value={paintingInputs.artist} onChange={(e) => setData(e)} />
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
                  style={{ marginBottom: '14px', paddingLeft: '30px', boxShadow: 'none', backgroundColor: 'transparent' }} value={paintingInputs.price} onChange={(e) => setData(e)} />
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
                <Button variant="outline-success border-2 fw-bolder" onClick={editMode ? editPainting2 : addPainting}>{editMode ? 'Update' : 'Add'} Painting</Button>
              </div>
            </Modal.Header>
          </div>
        </div>
      </Modal>

      <h1 className='a1 text-center pb-3'>Mesmerizing Artistry That Resonates with Your Spirit</h1>

      <Container>
        <div className='a2 d-flex justify-content-between my-5'>
          
          <Dropdown className='text-center'>
            <Dropdown.Toggle variant="outline-dark fw-bold mb-3" id="dropdown-basic">
              Sort by
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => sortedPainting("A-Z")}>A - Z</Dropdown.Item>
              <Dropdown.Item onClick={() => sortedPainting("Z-A")}>Z - A</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Form inline className="d-flex mb-3">
            <InputGroup className='shadow' style={{ borderRadius: '10px', width: '350px', border: '1px solid rgb(247, 212, 210)' }}>
              <InputGroup.Text style={{ backgroundColor: 'transparent', outline: 'none', border: 'none', position: 'absolute', zIndex: '1', top: '5px' }}>
                <i className="fas fa-magnifying-glass"></i>
              </InputGroup.Text>
              <Form.Control type="search" placeholder="Search by Art, Artist or Category" className="ms-4" aria-label="Search"
                onChange={(e) => searchItem(e)} style={{ outline: 'none', border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }} />
            </InputGroup>
          </Form>

          <Button variant='outline-dark mb-3 px-3' onClick={handleShow2}>Add New Painting</Button>
          
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

      {currentItems?.length > 0 ?
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
                          <Button variant="outline-light rounded-circle border-0 p-2" onClick={(e) => deletePaintings(i.id)}><Trash2 /></Button>
                          <Button variant="outline-light rounded-circle border-0" onClick={(e) => editPainting1(i.id)}><i className="fas fa-edit" /></Button>
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

            <Pagination className="justify-content-center mt-4">
              {[...Array(totalPages).keys()].map(number => (
                <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
                  {number + 1}
                </Pagination.Item>
              ))}
            </Pagination>

          </Container>
        </div>
        :
        <div className='text-center'>
          <h1>No Painting available</h1>
          <img src="./p1.gif" alt="..." />
        </div>      
      }
    </div>
  );
}

export default ArtWorks;