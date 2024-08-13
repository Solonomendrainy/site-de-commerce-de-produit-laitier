import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'; // Pour afficher les messages d'alerte
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Connection({ showModal, handleCloseModal, cart, loggedIn, setLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });
  const [alertMessage, setAlertMessage] = useState(null); // État pour stocker le message d'alerte
  const [alertVariant, setAlertVariant] = useState(''); // État pour stocker le type d'alerte (success, danger, etc.)
  const [showPassword, setShowPassword] = useState(false); // Nouvel état pour contrôler la visibilité du mot de passe
  // Déterminez si le formulaire est valide chaque fois que les champs changent
  const isFormValid = email !== '' && password !== '';

   // Fonction pour basculer la visibilité du mot de passe
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: value === '', // Indique si le champ email est vide
      }));
    } else if (name === 'password') {
      setPassword(value);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: value === '', // Indique si le champ password est vide
      }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!isFormValid) {
    setAlertMessage("Formulaire invalide. Veuillez remplir tous les champs requis.");
    setAlertVariant('danger');
    return;
  }

  try {
    const userData = { email, password };
    console.log("Données de connexion envoyées :", userData);

    const response = await axios.post('http://localhost:8081/server/login', userData);

    console.log("Réponse reçue :", response.data);

    if (response.data.success) {
      setAlertMessage("Connexion réussie !");
      setAlertVariant('success');

      // Mettre à jour l'état de connexion dans le composant parent (Home)
      setLoggedIn(true); // Ajoutez cette ligne
      
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } else {
      setAlertMessage("Connexion échouée. Veuillez vérifier vos identifiants.");
      setAlertVariant('danger');
    }
  } catch (error) {
 console.error('Erreur lors de la connexion :', error);
 setAlertMessage(`Erreur lors de la connexion. Veuillez réessayer. Détails : ${error.message}`);
 setAlertVariant('danger');
  }
};


  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Connexion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Afficher le message d'alerte s'il existe */}
        {alertMessage && (
          <Alert variant={alertVariant} onClose={() => setAlertMessage(null)} dismissible>
            {alertMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Adresse email</label>
            <input
              type="email"
              className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <small className="text-danger">Ce champ est requis</small>
            )}
          </div>

          <div className="mb-3">
  <label htmlFor="password" className="form-label">Mot de passe</label>
  <div className="input-group">
    <input
      type={showPassword ? "text" : "password"}
      className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
      id="password"
      name="password"
      value={password}
      onChange={handleInputChange}
    />
    <span className="input-group-text" onClick={togglePasswordVisibility}>
      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
    </span>
  </div>
  {formErrors.password && (
    <small className="text-danger">Ce champ est requis</small>
  )}
</div>


          <Button
            variant="success"
            type="submit"
            disabled={!isFormValid} // Désactivez le bouton si le formulaire n'est pas valide
          >
            Se Connecter
          </Button>
        </form>

  
        
      </Modal.Body>
    </Modal>
  );
}

export default Connection;
