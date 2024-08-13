import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import Product from './Product';
import CustomModal from './CustomModal';
import { useNavigate } from 'react-router-dom';// Importer useNavigate
import  './Css.css'; // Importation du CSS global

function Produits() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Nouvel état pour gérer l'état de connexion
  const navigate = useNavigate(); // Initialiser useNavigate
  const [activeMenu, setActiveMenu] = useState('/#product-section'); // Nouvel état pour le menu actif
  
  

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await axios.get('http://localhost:8081/server/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  const addToCart = (product, quantity) => {
    const cartItem = {
      product_id: product.id,
      nom: product.Nom,
      quantite: quantity,
      montant: product.Montant,
      montant_total: quantity * product.Montant
    };
    setCart([...cart, cartItem]);
  };
  

  

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleGoToCheckout = () => {
    navigate('/achats'); // Utiliser navigate pour rediriger vers '/achats'
  };


  // Nouvelle fonction pour gérer le clic sur le bouton de connexion
  const handleLoginButton = () => {
    // Mettre à jour l'état de connexion
    setLoggedIn(true);
    // Fermer le modal de connexion
    handleCloseModal();
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    navigate(menu); // Naviguer vers le menu sélectionné
  };

  return (
    <div>
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
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
                  className={`nav-item ${activeMenu === '/#acccueil-section' ? 'active' : ''}`}
                  onClick={() => handleMenuClick('/#acccueil-section')}
                >
                  <a className="nav-link" href="/#acccueil-section">
                    Accueil
                  </a>
                </li>
                 <li
                  className={`nav-item ${activeMenu === '/#product-section' ? 'active' : ''}`}
                  onClick={() => handleMenuClick('/#product-section')}
                >
                  <a className="nav-link" href="#product-section">
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
                
                {/* Déplacer le bouton de connexion après le bouton Contact */}
    <li className="nav-item">
 {/* Afficher le logo de profil si l'utilisateur est connecté, sinon afficher le bouton de connexion */}
 {loggedIn ? (
    <div className="nav-link" style={{ cursor: 'pointer', marginLeft: '500px' }}>
      {/* Ici, vous pouvez utiliser une image ou un icône pour le logo de profil */}
      <img src="/images/profil.png" alt="Profil" style={{ width: '30px', height: '30px' }} />
    </div>
 ) : (
    <div className="nav-link" onClick={handleShowModal} style={{ cursor: 'pointer', marginLeft: '500px' }}>
      Connexion
    </div>
 )}
</li>


              </ul>
              
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div className="d-flex flex-row justify-content-end">
                  <div className="nav-link" onClick={handleShowModal} style={{ cursor: 'pointer' }}>
                    <FaShoppingCart className={cart.length > 0 ? 'has-items' : ''} />
                    {cart.length > 0 && (
                      <span className="badge badge-pill badge-danger position-absolute top-0 start-100 translate-middle badge-notification" style={{ backgroundColor: 'red' }}>
                        {cart.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

       
      
      <div className="container mt-5" id="product-section">
        <h1 className="text-center my-4">Nos produits</h1>
        <div className="row">
          {products.map((product) => (
            <Product key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
          </div>
          
          {/* Ajout de l'image d'accueil */}
      <div className="welcome-image" id="acccueil-section">
        <img 
          src="/images/acueil.jpg" 
          alt="Page d'accueil" 
          style={{
            width: '100%', // L'image occupe toute la largeur de son conteneur
            height: 'auto', // La hauteur est ajustée automatiquement pour maintenir le ratio d'aspect
            objectFit: 'cover' // L'image couvre toute la zone disponible sans déformation
          }}
        />
      </div>

      <CustomModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleLogin={handleLoginButton} // Utiliser la nouvelle fonction pour gérer le clic sur le bouton de connexion
        handleGoToCheckout={handleGoToCheckout} // Ajouter la nouvelle fonction pour gérer la redirection vers la page d'achats
        cart={cart}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn} // Ajoutez cette ligne pour passer la fonction setLoggedIn
        
      />

       <footer className="footer">
        <div className="container text-center">
          <p>© {new Date().getFullYear()} Commerce de produits laitiers. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default Produits;
