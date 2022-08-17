import React,{useEffect,useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

function Cart() {

    const [tokenVal ,setTokenVal] = useState(false)

    useEffect(()=> {
      const token = localStorage.getItem("token")
      validateToken(token);
    })

  const validateToken = async ( rawToken ) => { 
      const response  = await axios.post("http://localhost:5000/validateToken",{
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
          },
          data: rawToken
      });
      if(response.data.tokenValidated){
        setTokenVal(true)
      }
  }
  return (
    <>
      {tokenVal ? 
        <div>
          <h2>Cart</h2>
          <Link to="/login">Login</Link>
        </div> : 
        <Redirect to="/login" />

      }
    </>
  )
}

export default Cart