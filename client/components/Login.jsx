import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
const BASEURL = import.meta.env.BASEURL;

console.log(BASEURL);;

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://signinoutcodedamn.onrender.com/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                }, body: JSON.stringify({email,password})
            });
            const data = await response.json();
            if(data.user) {
                localStorage.setItem('token', data.user);
                window.location.href = '/profile';
            } else {
                alert('Please Check Your Username or Password');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container">
        <div className='form-container'>
            <h2 className='page-name'>Log In</h2>
            <form  onSubmit={handleSubmit} className='form'>
                <input 
                    type="email" 
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /> 
                <input 
                    type="password" 
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className='cbtn'>
                    <button className='form-btn'>Login</button>
                </div>
            </form>
            <div className='extra'>
                <p className='extra-p'>Need an account?
                    <button className='extra-btn' onClick={() => navigate('/register')}>Register</button>
                </p>
            </div>
        </div>
    </div>
    )
}

export default Register;
