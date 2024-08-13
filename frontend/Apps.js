import React, { useState } from 'react';
import Connection from './Connection';

function Apps() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (success) => {
    setIsLoggedIn(success); 
  };

  return (
    <div>
      <Connection
        showModal={true}
        handleCloseModal={() => {}}
        handleLogin={handleLogin} // Transmettez la fonction correcte
      />
    </div>
  );
}

export default Apps;
