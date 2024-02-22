import './App.css';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import DescriptionPage from './Components/DescriptionPage';
import Cart from './Components/Cart';
import Register from './Components/Register';
import { PaymentProvider } from "./Components/paymentContext.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/description/:id' element={<DescriptionPage />} />
          <Route path='/cart' element={<PaymentProvider><Cart /></PaymentProvider>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
