import { Home } from "./screens/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
// import 'bootstrap-dark-5/dist/css/bootstrap-dark.main.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from "./screens/Signup";
import { CartProvider } from "./components/ConextReducer";
import MyOrder from "./screens/MyOrder";






function App() {
  return (

    <CartProvider>
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/creatuser" element={<Signup/>}/>
          <Route exact path="/myOrder" element={<MyOrder/>}/>
          
        </Routes>
      </div>
    </BrowserRouter>
    </CartProvider>
    
  );
}

export default App;
