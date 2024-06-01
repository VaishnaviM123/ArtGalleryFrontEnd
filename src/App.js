import '@fortawesome/fontawesome-free/css/all.min.css';
import LandingPage from "./pages/LandingPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ArtWorks from "./pages/artworks/ArtWorks";
import Photography from "./pages/photography/Photography";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import Contact from "./pages/Contact";
import PNF from "./pages/pnf/PNF";
import Notification from './components/notification/Notification';
import Category from './pages/Category';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    handleShow()
  }, []);

  return (
    <div className="App">
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <div className='d-flex align-items-center'>
            <div className='text-center m-1'>
              <h3>JOIN OUR NEWSLETTER</h3>
              <p className='fw-bold'>Sign up to receive awesome content</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email address" className='shadow' />
                <button onClick={(e) => { e.preventDefault(); }}>Let’s keep in touch</button>
              </form>
            </div>
            <div className='m-1'>
              <img src="./logo.png" alt="" />
              <button className='btn-1 text-black fw-bold' onClick={handleClose} style={{border:'none',fontSize:'20px',backgroundColor:'transparent'}}> X </button>
            </div>
          </div>
        </Modal.Header>
      </Modal>

      <Header />
      <Routes>
      <Route path="/" element={<LandingPage></LandingPage>}></Route>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/artworks" element={<ArtWorks></ArtWorks>}></Route>
      <Route path="/photography" element={<Photography></Photography>}></Route>
      <Route path="/category/:id" element={<Category />}></Route>
      <Route path="/contact" element={<Contact></Contact>}></Route>
      <Route path="/*" element={<PNF />}></Route>
      </Routes>
      <Footer />
      <Notification />
    </div>
  );
}

export default App;
