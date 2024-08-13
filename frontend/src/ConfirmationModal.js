import React, { useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function ConfirmationModal({ show, handleClose, handleConfirm }) {
  const [orangePhoneNumber, setOrangePhoneNumber] = useState('');
  const [telmaPhoneNumber, setTelmaPhoneNumber] = useState('');
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><h3>Payement des achats</h3> </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <h4>choisir entre le deux operateur</h4>
        <p>Veuillez entrer et choisir un votre numero pour un seul operateur</p>
        <ul className="list-group">
          <li className="list-group-item d-flex align-items-center">
            <img
              src="/images/orange.png"
              className="card-img-left"
              style={{
                width: '90px',
                height: '90px',
                objectFit: 'cover',
                marginRight: '10px',
              }}
              alt=" Orange Money"
            />
            <div className="input-group">
               <input
                type="tel"
                id="orangePhoneNumber"
                name="orangePhoneNumber"
                value={orangePhoneNumber}
                onChange={(e) => setOrangePhoneNumber(e.target.value)}
                className="form-control"
                placeholder="+261 32 00 000 00"
                style={{ width: '270px', fontSize: '16px' }}
              />
            </div>
          </li>
          <li className="list-group-item d-flex align-items-center">
            <img
              src="/images/telma.png"
              className="card-img-left"
              style={{
                width: '90px',
                height: '90px',
                objectFit: 'cover',
                marginRight: '10px',
              }}
              alt="M Vola"
            />
                      <div className="input-group">
                          
              <input
                type="tel"
                id="telmaPhoneNumber"
                name="telmaPhoneNumber"
                value={telmaPhoneNumber}
                onChange={(e) => setTelmaPhoneNumber(e.target.value)}
                className="form-control"
                placeholder="+261 34 00 000 00"
                style={{ width: '200px', fontSize: '16px' }}
              />
            </div>
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirmer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
