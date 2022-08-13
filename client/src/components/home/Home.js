import axios from 'axios';
import React, { useEffect, useLayoutEffect }  from 'react';
import {useSelector ,useDispatch} from 'react-redux';
import {fetchProducts} from '../../feauters/reducer'

import './Home.css';

function Home() {
  
  const dispatch = useDispatch()
  const products = useSelector((state)=> state.data.value);
  console.log(products);

  useLayoutEffect(()=>{
    fetchData();
  },[])

  const fetchData = async () => {
      const response = await axios.get('https://fakestoreapi.com/products').catch((err) => console.log('err',err))
      console.log(response.data);
      dispatch(fetchProducts(response.data));

  }
  
  return (
    <div className='home-container'>
      <div className='home-grid'>
      {products.map((p,index) =>  
        <div class="product-card" key={index}>
        <div class="badge">Hot</div>
        <div class="product-tumb">
          <img src={p.image} alt="" />
        </div>
        <div class="product-details">
          <span class="product-catagory">{p.category}</span>
          <h4><a href="">{p.title}</a></h4>
          <div class="product-bottom-details">
            <div class="product-price">${p.price}</div>
            <div class="product-links">
              <a href=""><i class="fa fa-heart"></i></a>
              <a href=""><i class="fa fa-shopping-cart"></i></a>
            </div>
          </div>
        </div>
      </div>
        )}
 
      </div>
    </div>
  )
}

export default Home