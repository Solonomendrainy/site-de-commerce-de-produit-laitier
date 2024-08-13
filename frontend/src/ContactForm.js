import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart } from 'react-icons/fa';
import './Css.css'; // Importation du CSS global
import { useNavigate } from 'react-router-dom';// Importer useNavigate

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const [cart] = useState([]);
   const navigate = useNavigate(); // Initialiser useNavigate
  const [activeMenu, setActiveMenu] = useState('/contactForm'); // Nouvel état pour le menu actif
  
  
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    navigate(menu); // Naviguer vers le menu sélectionné
  };

  return (
    <div>
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/">
              Commerce de produits laitiers
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li
                  className={`nav-item ${activeMenu === '/' ? 'active' : ''}`}
                  onClick={() => handleMenuClick('/')}
                >
                  <a className="nav-link" href="/">
                    Accueil
                  </a>
                </li>
                <li
                  className={`nav-item ${activeMenu === '/produits' ? 'active' : ''}`}
                  onClick={() => handleMenuClick('/produits')}
                >
                  <a className="nav-link" href="/produits">
                    Produits
                  </a>
                </li>
                <li
                  className={`nav-item ${activeMenu === '/contactForm' ? 'active' : ''}`}
                  onClick={() => handleMenuClick('/contactForm')}
                >
                  <a className="nav-link" href="/contactForm">
                    Contact
                  </a>
                </li>
              </ul>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div className="d-flex flex-row justify-content-end">
                  <a className="nav-link" href="/panier">
                    <FaShoppingCart className={cart.length > 0 ? 'has-items' : ''} />
                    {cart.length > 0 && (
                      <span className="badge badge-pill badge-danger position-absolute top-0 start-100 translate-middle badge-notification" style={{ backgroundColor: 'red' }}>
                        {cart.length}
                      </span>
                    )}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className='d-flex vh-100 bg-light justify-content-center align-items-center shadow-lg'>
        <div className='w-50 bg-white rounded p-3'>
          <h2 className="text-center mb-4">Nous Contacter</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="8" // Augmenté le nombre de lignes
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Envoyer</button>
          </form>
        </div>
      </div>

      <footer className="footer">
        <div className="container text-center">
          <p>
            © {new Date().getFullYear()} Commerce de produits laitiers. Tous
            droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ContactForm;
