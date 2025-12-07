import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from '../util';

function Login() {

  const [loginInfo,setLoginInfo] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate();
  const handleChange = (e) =>{
    const {name, value} =e.target;
    console.log(name,value);

    const copyloginInfo = { ...loginInfo};
    copyloginInfo[name] = value;
    setLoginInfo(copyloginInfo);
  }


  const handleLogin = async (e) =>{
    e.preventDefault()
    // client side validation

    const {email, password} = loginInfo;
    if (!email || !password){
        return handleError('All field required ');
    }

    try{
        const url= "http://localhost:5000/auth/login";
        const response = await fetch(url,
            {
                method:"POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(loginInfo)
            }
        );
        const result= await response.json();
        const {success, message, jwtToken , name, error} =result;
        if(success)
        {
            handleSuccess(message);
            localStorage.setItem('token',jwtToken);
            localStorage.setItem('loggedInUser', name);

            setTimeout(()=>{
                navigate('/home')
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

 console.log('loginInfo -> ',loginInfo);
  return (
   <div className = 'container'>

        <h1>Log In</h1>
        <form onSubmit={handleLogin}>
            
            <div>
                <label htmlFor='email'>Email</label>
                <input
                    onChange={handleChange}
                    type='email'
                    name='email'
                    placeholder='Enter Your Email...'    
                    value={loginInfo.email}
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                    onChange={handleChange}
                    type='password'
                    name='password'
                    placeholder='Create Your Password...'    
                    value={loginInfo.password}
                />
            </div>
            <button type='submit'>Log In</button>
            <span>Dont have an account? 
                <Link to ="/signup">SignUp</Link>
            </span>
        </form>
        <ToastContainer />
   </div>
  )
}

export default Login
