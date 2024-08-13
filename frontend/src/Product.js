import React, { useState } from 'react';
import axios from 'axios'; // Importez axios pour effectuer des requêtes HTTP

function Product({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value) || 1;
    setQuantity(newQuantity);
  };

  const addToCart = () => {
    const MontantTotal = product.Montant * quantity;
    const data = {
      Nom: product.Nom,
      quantite: quantity,
      MontantTotal: MontantTotal,
      Images: product.Images
    };

    axios.post('http://localhost:8081/server/addToCart', data)
      .then(response => {
        console.log(response.data);
        // Gérer la réponse du serveur si nécessaire

        // Envoie de notification vers le composant Home
        onAddToCart(product, quantity);
      })
      .catch(error => {
        console.error("Error adding to cart:", error);
        // Gérer les erreurs si nécessaire
      });
  };

  return (
    <div className="col-lg-3 mb-3">
      <div className="card h-100">
        <img src={`${process.env.PUBLIC_URL}/images/${product.Images}`} className="card-img-top" alt={product.Nom} />
        
        <div className="card-body">
          <h3 className="card-title">{product.Nom}</h3>
          <p className="card-text">Prix: {product.Montant} Ar</p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input
              type="number"
              value={quantity}
              min="1"
              className="form-control mb-2"
              style={{ width: '60px' }}
              onChange={handleQuantityChange}
            />
            <button className="btn btn-primary" onClick={addToCart}>Ajouter au panier</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
