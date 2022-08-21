import React,{useState} from 'react';
import './login.css';
import {Link ,Redirect} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


function Login() {
    const [formDetails,setFormDetails] = useState({
        userName:"",
        password:"",
        email:""
 });

    const updateHandler = (e)=>{
        const name  = e.target.name;
        const value  = e.target.value;
        setFormDetails((prev) => {
            return{
                ...prev,
                [name]:value
            }
        })
       
      
    }

    const formData = async(data) =>{
        const bodyData = data;

        if(formDetails.userName !== '' &&  formDetails.password !== '' &&  formDetails.email !== ''){
            const response = await axios.post("http://localhost:5000/signUp",{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: bodyData
            });
            if(response.data.sucess){
                setFormDetails({
                    userName:"",
                    password:"",
                    email:""
                });
                window.location.href = "/login" ;

            }else{
                console.log(response.data);
                if(response.data.error){
                    swal(response.data.error)
                }else{
                    swal("something went wrong")
                }
            }
        }else{
            swal("please fill all details");
        }
        
    }
    const submitForm = (e) => {
        e.preventDefault();
        formData(formDetails);
       
    }
  return (
    <div className='login-container'>
        <div className="signup-card">
    <form>
      <h3 className="title"> Sign Up</h3>
      <p className="subtitle"> Already have an account?<Link to="/login"><a href="#" className='link'> Log in</a></Link></p>

      
      <p className="or"><span>or</span></p>

      <div className="email-login">
         <label><b>Username</b></label>
         <input type="text" placeholder="Enter username" value={formDetails.userName} name="userName" required onChange={updateHandler} />
         <label><b>Email</b></label>
         <input type="email" placeholder="Enter Email" name="email" value={formDetails.email} required onChange={updateHandler}/>
         <label><b>Password</b></label>
         <input type="password" placeholder="Enter Password" name="password"  value={formDetails.password}required onChange={updateHandler}/>
      </div>
      <button className="cta-btn" onClick={submitForm}>Create a account</button>
   </form>
</div>
   </div>
  )
}

export default Login