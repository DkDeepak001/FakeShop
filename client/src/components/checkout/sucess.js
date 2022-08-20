import React, { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const Sucess = () => {
    let {id} = useParams();
    const [token,setToken] = useState(localStorage.getItem("token"));


    useEffect(()=>{
        checkPayment();
    })

    const checkPayment =async ()=>{
        const data = {
            id,token
          }
        const headers = {
            "content-Type":"application/json"
          }
        const response = await axios.post("http://localhost:5000/order/sucess",{header:headers,data:data})
        console.log(response.data);
    }
  return (
    <div>Sucess {id}</div>
  )
}

export default Sucess