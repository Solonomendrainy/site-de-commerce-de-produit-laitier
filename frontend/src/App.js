
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './Create'
import ContactForm from './ContactForm'
import Cart from './Cart';
import Achats from './Achats';
import Produits from './Produits';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/create' element={<Create />}></Route>   
        <Route path='/contactForm' element={<ContactForm />}></Route> 
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/achats' element={<Achats />}></Route>
        <Route path='/Produits' element={<Produits />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
