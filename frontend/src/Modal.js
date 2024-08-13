import React from 'react';

function Modal({ onClose, showModal }) {
  const handleConfirm = () => {
    // Logique pour confirmer le panier, par exemple, envoyer une requête au serveur
    // Une fois confirmé, vous pouvez fermer ce modal et afficher le nouveau
    onClose(); // Ferme le modal lorsque confirmé
    // Ajoutez ici la logique pour confirmer le panier
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        {showModal ? (
          <div>
            <h2>Confirmer le panier</h2>
            <p>Voulez-vous vraiment confirmer votre panier ?</p>
            <div>
              <button className="btn btn-primary" onClick={handleConfirm}>
                Confirmer
              </button>
              <button className="btn btn-secondary" onClick={onClose}>
                Annuler
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2>Panier confirmé</h2>
            <p>Votre panier a été confirmé avec succès !</p>
            {/* Ajoutez ici le contenu du nouveau modal à afficher après la confirmation */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
