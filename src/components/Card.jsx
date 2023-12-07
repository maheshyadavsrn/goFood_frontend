
import React, { useState, useRef, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ConextReducer'
export default function Card(props) {
  let data = useCart();

  // let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const dispatch = useDispatchCart();
  // const handleClick = () => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/login")
  //   }
  // }
  const handleAddToCart = async () => {
    let food=[]
    for(const item of data){
      if(item.id===props.foodItem._id){
        food=item;
        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if(food.size !==size){
 await dispatch({ 
  type: "ADD",
   id: props.foodItem._id, 
   name:  props.foodItem.name, 
   price: finalPrice,
    qty: qty, 
    size: size,
    img: props.foodItem.img });
    return
  }
  return
}
  await dispatch({ 
    type: "ADD",
     id: props.foodItem._id, 
     name:  props.foodItem.name, 
     price: finalPrice,
      qty: qty, 
      size: size,
      img: props.foodItem.img });
  //  console.log(data);
    }


  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

 

  let finalPrice = qty * parseInt(options[size]);   //This is where Price is changing
  return (
    <div>

      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title" style={{color:"black"}}>{props.foodItem.name} </h5>
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onChange={(e)=>setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef}  onChange={(e)=>setQty(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
            <div className=' d-inline ms-2 h-100 w-20 fs-5'style={{color:"black"}} >
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
    </div>
  )
}
