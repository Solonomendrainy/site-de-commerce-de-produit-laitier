import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart,FaSearch ,FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import axios from 'axios';
import Product from './Product';
import CustomModal from './CustomModal';
import { useNavigate } from 'react-router-dom';// Importer useNavigate
import  './Css.css'; // Importation du CSS global

function Home() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Nouvel état pour gérer l'état de connexion
  const navigate = useNavigate(); // Initialiser useNavigate
  const [activeMenu, setActiveMenu] = useState('/'); // Nouvel état pour le menu actif
  const [searchTerm, setSearchTerm] = useState('');
  
  
  
  

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
  
const handleSearchClick = () => {
    console.log("Recherche initiée avec le terme:", searchTerm);
    // Vous pouvez ajouter des actions supplémentaires ici, comme appeler un endpoint API ou faire autre chose avec searchTerm
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

  const filteredProducts = products.filter((product) =>
    product.Nom.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrer selon le terme de recherche
  );

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

         <li className="nav-item" style={{ marginLeft: '100px' }}>
      <div
        className="input-group"
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #ced4da',
          borderRadius: '0.25rem', // Bordures arrondies pour le groupe
          overflow: 'hidden', // Pour garantir que les bordures restent intactes
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher des produits"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.375rem 0.75rem', // Pour correspondre à la taille du bouton
            border: 'none', // Pas de bordure car le groupe en a une
            outline: 'none', // Pour éviter les bords bleus
          }}
        />
        <button
          className="btn"
          style={{
            border: 'none', // Pas de bordure car le groupe en a une
            backgroundColor: '#f8f9fa', // Couleur d'arrière-plan
            cursor: 'pointer',
            padding: '0.375rem 0.75rem', // Pour correspondre à la taille de l'input
          }}
          onClick={handleSearchClick} // Appelle handleSearchClick
        >
          <FaSearch />
        </button>
      </div>
    </li>
                
                {/* Déplacer le bouton de connexion après le bouton Contact */}
    <li className="nav-item">
 {/* Afficher le logo de profil si l'utilisateur est connecté, sinon afficher le bouton de connexion */}
 {loggedIn ? (
    <div className="nav-link" style={{ cursor: 'pointer', marginLeft: '300px' }}>
      {/* Ici, vous pouvez utiliser une image ou un icône pour le logo de profil */}
      <img src="/images/profil.png" alt="Profil" style={{ width: '30px', height: '30px' }} />
    </div>
 ) : (
    <div className="nav-link" onClick={handleShowModal} style={{ cursor: 'pointer', marginLeft: '280px' }}>
      Connexion
    </div>
 )}
</li>

 </ul>
              
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div className="d-flex flex-row justify-content-end">
                  <div className="" onClick={handleShowModal} style={{ cursor: 'pointer' }}>
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
      
      <div className="container mt-5" id="product-section">
        <h1 className="text-center my-4">Nos produits</h1>
        <div className="row">
          {filteredProducts.map((product) => ( // Utilise filteredProducts pour le rendu
            <Product key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
       
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

       <footer className="footer" style={{ backgroundColor: '#343a40', color: 'white', padding: '20px' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-center">
              <h5>À propos de nous</h5>
              <p>
                Nous sommes une entreprise spécialisée dans le commerce de produits laitiers de haute qualité.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <h5>Contact</h5>
              <p>Email: solonomendrainy@gmail.com</p>
              <p>Téléphone: +261 32 41 764 16</p>
              <p>Adresse: 601 Rue de Saint Auguste, Toliara, Madagascar</p>
            </div>
            <div className="col-md-4 text-center">
              <h5>Suivez-nous</h5>
              <div className="d-flex justify-content-center">
                <a href="https://www.facebook.com/johnfuldoh.fuldoh" className=" mx-2" target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={30} />
                </a>
                <a href="https://instagram.com" className=" mx-2" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={30} />
                </a>
                <a href="https://twitter.com" className=" mx-2" target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={30} />
                </a>
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <p>© {new Date().getFullYear()} Commerce de produits laitiers. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
