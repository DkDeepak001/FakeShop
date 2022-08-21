import React ,{useEffect}from 'react';
import {useHistory} from 'react-router-dom';


const Failed = () => {
    let history = useHistory();

    useEffect(() => {
      
    
      RedirectTolast();
    }, [])

    const RedirectTolast = ()=>{
        setTimeout(()=>history.push('/cart'),5000);
    }
    
  return (
    <div>Payment Failed</div>
  )
}

export default Failed