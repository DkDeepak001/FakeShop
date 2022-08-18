import React, { useEffect, useState } from 'react';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
import './cart.css';
function Cart() {
  const [token,setToken] = useState(localStorage.getItem("token"));
  const [cartProducts ,setCartProducts] = useState();
  const [total, setTotal] = useState(0);
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
    }
    );
    if(response.data.status === 'failed'){
       swal(response.data.message)
       setToken("");
    }
}

    useEffect( ( ) => {
        fetchCartData();
    }, [] )

    const fetchCartData = async()=>{
      const response  = await axios.post("http://localhost:5000/getCart",{
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
          },
          data: token
      });
      const fetchProductData = await axios.get("https://fakestoreapi.com/products");
      const product = fetchProductData.data.filter((data) => {return  response.data.cart.some((x) => {return data.id === parseInt(x.productId)}) });
      const quantity = response.data.cart.map((x) => x.productCount);
      for(let i = 0 ; i< quantity.length ; i++){
        product[i].quantity = quantity[i];
      }
      
      setCartProducts(product);
      const arrOfPrice = (product.map(x=> (x.quantity*x.price)))
      const total = arrOfPrice.reduce((a, b) => (parseFloat(a) + parseFloat(b)).toFixed(2), 0)
      setTotal(total);
    }

    const [change ,setChange] = useState(0)
    const changeQuantity = async (e,  pid, quantity) => {
      const req = await axios.post("http://localhost:5000/updateCartQuantity",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {type:e.target.name , productId : pid ,quantity : quantity,token :token }
      })
      if(req.data.status == 'ok'){
        setChange(change+1);
      }
    }
    useEffect(()=>{
      fetchCartData();
    },[change])


    const removeitem = async (id) => {
      const response = await axios.post("http://localhost:5000/deleteItem",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {productId : id ,token :token }
      })
      if(response.data.status == 'ok'){
        setChange(change+1);
      }
    }

  return (
    <>
      {localStorage.getItem('token') ?
      <div>
      <div class="shopping-cart">
      <div class="title">Shopping Bag</div>
      {cartProducts ? cartProducts.map((p,index) =>
       <div class="item" key={index}>
       <div class="buttons" onClick={()=>removeitem(p.id)}>
         <span class="delete-btn"></span>
       </div>

       <div class="image">
         <img src={p.image} alt={p.title} />
       </div>

       <div class="description">
         <h3>{p.title}</h3>
         <h4>{p.category}</h4>
       </div>

       <div class="quantity">
         <button class="plus-btn inc-btn" type="button" name="increament"onClick={(e)=> changeQuantity(e ,p.id , p.quantity)}  >+
         </button>
         <h3>{p.quantity}</h3>
         <button class="minus-btn inc-btn" type="button" name="decreament" onClick={(e)=> p.quantity <= 1? " " :changeQuantity(e ,p.id , p.quantity)} >-
         </button>
       </div>

       <div class="total-price">$ {(p.price * p.quantity).toFixed(2)}</div>
     </div>
      )  
     
    :"No  Items in you cart"
  }
      <div className='footer-cart-container'> 
        <div className='footer-cart'>
          <h3>Total : {total} </h3>
          <Link to="/checkOut" className='cart-button-product'>Checkout</Link>
        </div>
      </div>

      </div>
  </div>
      :
      <Redirect to="/login" />}
    </>
  )
}

export default Cart