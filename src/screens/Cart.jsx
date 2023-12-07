import React from 'react'
import Button from 'react-bootstrap/Button';
import { useCart, useDispatchCart } from '../components/ConextReducer';
const url="https://go-food-backend-alpha.vercel.app"
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
   }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch(`${url}/api/orderData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th style={{color:"white"}} scope='row' >{index + 1}</th>
                <td  style={{color:"white"}} >{food.name}</td>
                <td style={{color:"white"}}>{food.qty}</td>
                <td style={{color:"white"}}>{food.size}</td>
                <td style={{color:"white"}}>{food.price}</td>
                <td style={{color:"white"}} ><button type="button" className="btn p-0">
          <Button variant="danger" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
            Delete
          </Button>
        </button></td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 'onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>

    </div>
  )
}
