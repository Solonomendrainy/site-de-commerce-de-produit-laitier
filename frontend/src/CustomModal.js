import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Cart from './Cart';
import Connection from './Connection';
import axios from 'axios';

const isFormValid = (firstName, lastName, email, password) => (
  firstName !== '' && lastName !== '' && email !== '' && password !== ''
);

function CustomModal({ showModal, handleCloseModal, handleLogin, cart, loggedIn, setLoggedIn }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [showConnection, setShowConnection] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Nouvel état pour les messages d'erreur

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'lastName') {
      setLastName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    const formIsValid = isFormValid(firstName, lastName, email, password);

    if (!formIsValid) {
      console.log("Formulaire invalide. Veuillez remplir tous les champs requis.");
      return;
    }

    try {
      const userData = { firstName, lastName, email, password };
      const response = await axios.post('http://localhost:8081/server/register', userData);

      if (response.data.success) {
        handleLogin(true);
        handleCloseModal();
      } else {
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    }
  };

  const handleOpenConnectionModal = () => {
    handleCloseModal();
    setShowConnection(true);
  };

  const handleCloseConnectionModal = () => {
    setShowConnection(false);
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          {!loggedIn && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <h2>Inscription</h2>
                <label htmlFor="firstName" className="form-label">Prénom</label>
                <input
                  type="text"
                  className={`form-control ${attemptedSubmit && firstName === '' ? 'is-invalid' : ''}`}
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={handleInputChange}
                />
                {attemptedSubmit && firstName === '' && (
                  <small className="text-danger">Ce champ est requis</small>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Nom</label>
                <input
                  type="text"
                  className={`form-control ${attemptedSubmit && lastName === '' ? 'is-invalid' : ''}`}
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleInputChange}
                />
                {attemptedSubmit && lastName === '' && (
                  <small className="text-danger">Ce champ est requis</small>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Adresse e-mail</label>
                <input
                  type="email"
                  className={`form-control ${attemptedSubmit && email === '' ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                />
                {attemptedSubmit && email === '' && (
                  <small className="text-danger">Ce champ est requis</small>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${attemptedSubmit && password === '' ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                  <span className="input-group-text" onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
                {attemptedSubmit && password === '' && (
                  <small className="text-danger">Ce champ est requis</small>
                )}
              </div>

              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}

              <Button
                variant="success"
                type="submit"
                disabled={!isFormValid(firstName, lastName, email, password)}
              >
                S'inscrire
              </Button>
            </form>
          )}

          {loggedIn && <Cart cartItems={cart} />}
        </Modal.Body>
        <Modal.Footer>
          {!loggedIn && (
            <Button
              variant="success"
              onClick={handleOpenConnectionModal}
            >
              Se Connecter
            </Button>
          )}
          {loggedIn && (
            <Button variant="danger" onClick={handleCloseModal}>
              Annuler
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Connection
        showModal={showConnection}
        handleCloseModal={handleCloseConnectionModal}
        cart={cart}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
    </div>
  );
}

export default CustomModal;
