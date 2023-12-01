import './App.css';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import DescriptionPage from './Components/DescriptionPage';
import Cart from './Components/Cart';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/description/:id' element={<DescriptionPage />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
