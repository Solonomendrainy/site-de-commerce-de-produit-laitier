import React, { useState, useEffect } from 'react';

function Create({ show, onClose, cartItems }) {
  const [data, setData] = useState([]);
  const [orangePhoneNumber, setOrangePhoneNumber] = useState('');
  const [telmaPhoneNumber, setTelmaPhoneNumber] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch your data here
      setData([]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}>
      <div className="modal-dialog" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
        <h3>OrangeTelma Modal</h3>
        <p>Contenu de votre modal OrangeTelma ici...................</p>
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
                placeholder="Entrez votre numéro de téléphone Orange"
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
                placeholder="Entrez votre numéro de téléphone Telma"
                style={{ width: '200px', fontSize: '16px' }}
              />
            </div>
          </li>
        </ul>
        <button className="btn btn-secondary" onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}

export default Create;
