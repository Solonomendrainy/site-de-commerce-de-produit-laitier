import React, { useState,useEffect  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';

function Achats() {
    const [cart] = useState([]);
    const [achats, setAchats] = useState([]);

    useEffect(() => {
      fetchAchats();
    }, []);

    const fetchAchats = async () => {
      try {
        const response = await axios.get('http://localhost:8081/server/cart/products');
        setAchats(response.data);
      } catch (error) {
        console.error('Error fetching product data from cart:', error);
      }
  };
  
   // Calculer le montant total
  const montantTotal = achats.reduce((total, achat) => total + achat.MontantTotal, 0);
  const handleConfirm = () => {
      alert('Achat confirmé!'); // Vous pouvez ajouter un autre traitement ici
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
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Accueil
                  </a>
                </li>
                <li className="nav-item" >
                  <a className="nav-link" href="/Produits">
                    Produits
                  </a>
                </li>
                <li className="nav-item">
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
       
        <div className="container">
                <h2>Liste des achats</h2>
                <div className="row">
                    {achats.map((achat) => (
                        <div key={achat.id} className="col-lg-6 mb-3"> {/* Largeur égale pour les divs */}
                            <div className="card h-100 d-flex flex-row align-items-center"> {/* Flex row pour image à gauche */}
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/${achat.Images}`}
                                    className="card-img-left"
                                    style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover', // Remarquez l'absence d'espaces autour du tiret
                                    marginRight: '10px', // Virgulé correctement
                                           }} // Fermer la définition des styles ici
                                   alt={achat.Nom} // "alt" doit être à la fin, après "style"
                                   // Correction des accolades qui entouraient ce commentaire
                                />
                                <div className="card-body">
                                    <h3 className="card-title">{achat.Nom}</h3>
                                    <p className="card-text">Quantité: {achat.quantite}</p>
                                    <p className="card-text">Montant total: {achat.MontantTotal} Ar</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

         {/* Div pour le montant total des achats avec styles Bootstrap et personnalisés */}
        <div className="total-price" style={{ backgroundColor: '#f8d7da', padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
                    <h3 className="text-center">Montant total des achats :</h3>
                    <h4 className="text-center">{montantTotal} Ar</h4>
        </div>
        {/* Bouton de confirmation des achats */}
          <div className="text-center" style={{ marginTop: '20px' }}>
            <button className="btn btn-primary" onClick={handleConfirm}>Confirmer l'achat</button>
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
  )
}

export default Achats
