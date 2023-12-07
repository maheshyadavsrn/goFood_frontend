import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Cart from '../screens/Cart';
import Modal from '../Modal';
import Badge from "react-bootstrap/Badge";
import { useCart } from './ConextReducer';
// import ShoppingCartIcon from "react-bootstrap/ShoppingCartIcon";

const Navbar = () => {
let data=useCart()
  const [cartView, setCartView] = useState(false)
localStorage.setItem('temp', "first")

  const navigate=useNavigate();
  const handleLogout=()=>{
localStorage.removeItem("authToken")
navigate("/login")
  }
//   const loadCart = () => {
//     setCartView(true)
// }

  return (
    <div>
       <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link active fs-6 " aria-current="page" to="/">Home</Link>
        </li>
       {(localStorage.getItem("authToken"))?
       <li className="nav-item">
       <Link className="nav-link active fs-6 " aria-current="page" to="/myorder">My Order</Link>
     </li>
     :""
       }

      </ul>
      {(!localStorage.getItem("authToken"))?
      <form className='d-flex'>
      <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
      <Link className="btn bg-white text-success mx-1" to="/creatuser">SignUp</Link>
      </form>
         :
         <div>
         <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
         My Cart {" "}
         <Badge pill bg="danger">{data.length}</Badge>
        </div>
        {cartView ? <Modal onClose={()=>setCartView(false)}><Cart/></Modal> : null}

         <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
          Logout
         </div>
         </div>
         }
      
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar