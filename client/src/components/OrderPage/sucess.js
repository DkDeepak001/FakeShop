import React, { useEffect,useState } from 'react';
import {useParams ,useHistory} from 'react-router-dom';
import axios from 'axios';

const Sucess = () => {
    let {id} = useParams();
    const history = useHistory();
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
       if(response.data.status === 'ok'){
        history.push("/OrderPage");
       }else if(response.data.status === 'error'){
        console.log("error")
       };
    }
  return (
    <div>Sucess {id}</div>
  )
}

export default Sucess