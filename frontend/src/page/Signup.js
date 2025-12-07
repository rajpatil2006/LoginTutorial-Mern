import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from '../util';

function Signup() {

  const [signupInfo,setsignupInfo] = useState({
    name: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate();
  const handleChange = (e) =>{
    const {name, value} =e.target;
    console.log(name,value);

    const copysignupInfo = { ...signupInfo};
    copysignupInfo[name] = value;
    setsignupInfo(copysignupInfo);
  }


  const handleSignup = async (e) =>{
    e.preventDefault()
    // client side validation

    const {name, email, password} = signupInfo;
    if (!name || !email || !password){
        return handleError('All field required ');
    }

    try{
        const url= "http://localhost:5000/auth/signup";
        const response = await fetch(url,
            {
                method:"POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(signupInfo)
            }
        );
        const result= await response.json();
        const {success, message, error} =result;
        if(success)
        {
            handleSuccess(message);
            setTimeout(()=>{
                navigate('/login')
            },1000)
        }else if(error)
        {
            const details = error?.details[0].message;
            handleError(message);
        } else if(!success){
            handleError(message);
        }
    }catch (err) {

    }
  }

 console.log('signupInfo -> ',signupInfo);
  return (
   <div className = 'container'>

        <h1>SignUp</h1>
        <form onSubmit={handleSignup}>
            <div>
                <label htmlFor='name'>Name</label>
                <input
                    onChange={handleChange}
                    type='text'
                    name='name'
                    autoFocus
                    placeholder='Enter Your Name...'    
                    value={signupInfo.name}
                />
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input
                    onChange={handleChange}
                    type='email'
                    name='email'
                    placeholder='Enter Your Email...'    
                    value={signupInfo.email}
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                    onChange={handleChange}
                    type='password'
                    name='password'
                    placeholder='Create Your Password...'    
                    value={signupInfo.password}
                />
            </div>
            <button type='submit'>Signup</button>
            <span>Already have an account? 
                <Link to ="/login">Login</Link>
            </span>
        </form>
        <ToastContainer />
   </div>
  )
}

export default Signup
