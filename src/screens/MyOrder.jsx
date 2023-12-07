import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
let newArray=[];
    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/myorderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });
            const result = await response.json();
    
            // Access the latest data (last element) and exclude the first object
            const latestOrderData = result.orderData.order_data.pop(1);
            console.log(result.orderData.order_data)
            for (let i = 1; i < latestOrderData.length; i++) {
                const orderData1 = latestOrderData[i]
                console.log(orderData1);
                newArray.push(orderData1);
            }
            
            
    console.log(newArray)
            setOrderData(newArray || []);
        } catch (error) {
            console.error('Error fetching my order:', error);
        }
    };
    
    

    useEffect(() => {
        // eslint-disable-next-line
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData ? orderData.map((arrayData, index) => (
                        <div className='col-12 col-md-6 col-lg-3' key={index}>
                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                <div className="card-body">
                                    <h5 className="card-title">{arrayData.name}</h5>
                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                        <span className='m-1' style={{color:"black"}}>{arrayData.qty}</span>
                                        <span className='m-1' style={{color:"black"}}>{arrayData.size}</span>
                                        <span className='m-1' style={{color:"black"}}>{arrayData.date}</span>
                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' style={{color:"black"}}>
                                            ₹{arrayData.price}/-
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : null}
                </div>
            </div>
            <Footer />
        </div>
    );
}
