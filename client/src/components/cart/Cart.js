import React, { useEffect, useState } from 'react';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
function Cart() {
  const [token,setToken] = useState(localStorage.getItem("token"))
  useEffect(()=>{
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
    if(response.data.status === 'failed'){
       swal(response.data.message)
       setToken("");
    }
}
  return (
    <>
      {localStorage.getItem('token') ?
      <div>
      <h2>Cart</h2>
      <Link to="/login">Login</Link>
      </div>:
      <Redirect to="/login" />}
    </>
  )
}

export default Cart