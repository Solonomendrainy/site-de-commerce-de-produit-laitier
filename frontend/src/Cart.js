import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal'; // Assurez-vous que le chemin est correct

function Cart({ cartItems }) {
  const [cartData, setCartData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cartConfirmed, setCartConfirmed] = useState(false);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/server/cart');
      setCartData(response.data);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const handleCancelItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/server/cart/${id}`);
      fetchCartData();
    } catch (error) {
      console.error('Error cancelling item:', error);
    }
  };

  const handleConfirm = async () => {
    try {
      // Logique pour confirmer le panier, par exemple, envoyer une requête au serveur
      setCartConfirmed(true);
      setShowModal(false);
    } catch (error) {
      console.error('Error confirming cart:', error);
    }
  };

  const montantTotal = cartData.reduce((total, achat) => total + achat.MontantTotal, 0);

  return (
    <div className="cart">
      <h2>Panier</h2>
      {!cartConfirmed ? (
        <>
          <ul className="list-group">
            {cartData.map(item => (
              <li key={item.id} className="list-group-item">
                <img
                  src={`${process.env.PUBLIC_URL}/images/${item.Images}`}
                  className="card-img-left"
                  style={{
                    width: '90px',
                    height: '90px',
                    objectFit: 'cover',
                    marginRight: '10px',
                  }}
                  alt={item.Nom}
                />
                <span>Quantite: {item.quantite} - {item.Nom} - {item.MontantTotal} <span className="ml-2">Ar</span></span>
                <button className="btn btn-danger" onClick={() => handleCancelItem(item.id)}>Annuler</button>
              </li>
            ))}
          </ul>
          <div className="total-price" style={{ backgroundColor: '#e0e0e0', padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
            <h3 className="text-center">Montant total des achats :</h3>
            <h4 className="text-center">{montantTotal} Ar</h4>
          </div>
          <button
            className="btn btn-success"
            style={{ width: 'auto', marginTop: '20px' }}
            onClick={() => setShowModal(true)}
          >
            Confirmer
          </button>
        </>
      ) : (
        <div className="confirmation-message">
          <h2>Payement reussi </h2>
          <p>Votre panier a été payer avec succès !</p>
        </div>
      )}
      <ConfirmationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirm}
      />
    </div>
  );
}

export default Cart;
