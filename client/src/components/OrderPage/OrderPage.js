import React, { useEffect, useState } from 'react';
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import './OrderPage.css';
function OrderPage() {
  const [token,setToken] =useState(localStorage.getItem("token"));
  const [order,setOrder] = useState();
  useEffect(()=>{
    fetchOrder();
  },[])

  const fetchOrder = async () =>{
    const response = await axios.post("http://localhost:5000/OrderPage",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    },
    data: token
    })
    if(response.data.status == 'ok'){
      setOrder(response.data.order);
      console.log(response.data.order);
    }else if(response.data.status == 'error'){
      alert(response.data.message);
    }
  }
  return (
   <>
   {localStorage.getItem("token")? 
      
      <div>
      <div class="shopping-cart">
      <div class="title">Order Page</div>
      {order ? order.orderNumber.map((e,index)=> <div key={index}>
        <li class="item_order">
			  <div class="description">
          <h3>Order ID</h3>
          <h4>{e.session_id.split("cs_test_")}</h4>
          <h5>{e.Product.length} Products </h5>
			  </div>
        <div class="status">
				<div class="icon off"> </div>
				<h4 class="text">Shipped </h4>
			</div>
			  <div class="total">
          <h4>${(e.amount_total/100).toFixed(2)}</h4>
			  </div>
			  {/* <button class="view-btn">
          <span >View product</span>
			  </button> */}
  		</li>
      </div>):"no order found"}
      </div>
  </div>
:      <Redirect to="/login" />}

   </>
  )
}

export default OrderPage