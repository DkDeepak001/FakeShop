import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./product.css";
import swal from "sweetalert2";
import "../home/Home.css";
import axios from "axios";

function Products() {
  const { productId } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState();


  useEffect(() => {
    validateToken(localStorage.getItem("token"));
  });

  const validateToken = async (rawToken) => {
    await axios.post(
      "https://fakeshop-ecommerce.herokuapp.com/validateToken",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: rawToken,
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .catch((err) => console.log("err", err));
    setProduct(response.data);
  };

  const addToCart = async (pid, title) => {
    if (!localStorage.getItem("token")) {
      history.push("/login");
    } else {
      const id = pid;
      const request = await axios.post(`https://fakeshop-ecommerce.herokuapp.com/addCart`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { token: localStorage.getItem("token"), itemId: id },
      });
      if (request.data.status === "ok") {
        swal.fire(
          " Added to cart",
          title + "added to your shopping bag!",
          "success"
        );
      }
    }
  };

  return (
    <div>
      {product ? (
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
            <div className="pricing-coloum">$ {product.price}</div>
            <div className="solo-product-price">
              <button
                onClick={() => addToCart(product.id, product.title)}
                className="cart-button-product"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Products;
