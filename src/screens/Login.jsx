import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
const url="https://go-food-backend-olive.vercel.app"



const Login = () => {
  const [credentials,setcredentials] = useState({email:"",password:""})
  let navigate=useNavigate();

  const handlesubmit= async(e)=>{
    e.preventDefault();
    console.log(JSON.stringify({
      email:credentials.email,
      password:credentials.password
      }));
    const response= await fetch(`${url}/api/loginuser`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:credentials.email,
            password:credentials.password,
            })
  });
  const json =await response.json()
  console.log(json);
  if(!json.success){
    alert("Enter Valid Credentials")
  }
  if(json.success){
    localStorage.setItem("userEmail",credentials.email);
    localStorage.setItem("authToken",json.authToken);
    console.log(localStorage.getItem("authToken"));
    navigate("/");
  }
}


const onChange=(event)=>{
setcredentials({...credentials,[event.target.name]:event.target.value})
}

  return (
    <>
    <div className='container'>
     <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to="/creatuser" className='m-3 btn btn-danger'>I'm a New User</Link>
</form>   
</div>
    </>
  )
}

export default Login