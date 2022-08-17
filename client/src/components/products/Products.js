import React ,{useEffect, useState}from 'react';
import { useParams } from "react-router-dom";
import './product.css'

import '../home/Home.css'
import axios, { Axios } from 'axios';

function Products() {
    let { productId } = useParams();
    const [product, setProduct] = useState();
    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async () => {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`).catch((err)=> console.log("err",err));
        console.log(response.data);
        setProduct(response.data);
    }

    const addToCart = async (pid) => {
        const id = pid;
        const request = axios.get(`http://localhost:5000/addCart/${id}`);
        console.log(request);

    }

    return (
    <div>
        {product ?
            <div className="container"> 
            <div className="left-column">
                <img data-image="black" src={product.image} alt={product.title} />
            </div>
            <div className="right-column">
                <div className="product-description">
                    <span>{product.category}</span>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                </div>
                <div className='pricing-coloum'>$ {product.price}</div>
                <div className="solo-product-price">
                    <button onClick={() => addToCart(product.id)} className="cart-btn">Add to cart</button>
                </div>
            </div>
            </div>
        :""}
        </div>
  )
}

export default Products