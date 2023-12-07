import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
const url="https://go-food-backend-olive.vercel.app"



export const Home = () => {
    const [search,setSearch]=useState('')

    const [foodcat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            let response = await fetch(`${url}/api/foodData`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                let data = await response.json();
                setFoodItem(data.food_items);
                setFoodCat(data.foodCategory);

            } else {
                console.error('Error fetching data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    console.log(foodcat, foodItem);

    return (
        <div>
            <div><Navbar /></div>
            <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
    <div className='carousel-caption' style={{zIndex:"10"}}>
        <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/* <button class="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div></div>

    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..." />
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900×700/?pastry" className="d-block w-100" style={{filter:"brightness(30%)"}}  alt="..." />
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900×700/?barbeque" className="d-block w-100" style={{filter:"brightness(30%)"}}  alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
  </div>
  </div>
            <div className='container'>
                {
                    foodcat
                        ? foodcat.map((data) => {
                            return (<div key={data._id} className='row mb-3'>
                                <div  className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {foodItem ?
                                    foodItem.filter((item) => (item.CategoryName === data.CategoryName)&& (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card
                                                        foodItem={filterItems}
                                                        options={filterItems.options[0]}
                                                        // imgSrc={filterItems.img}
                                                    >

                                                    </Card>
                                                </div> 
                                            )
                                        })
                                    : <div>No Such Data Found</div>}
                            </div>

                            )
                        })
                        : ""
                }


            </div>
            <div><Footer /> </div>
        </div>
    )
}
