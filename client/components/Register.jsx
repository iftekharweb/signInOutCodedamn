import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import './style.css';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://signinoutcodedamn.onrender.com/api/register`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({name,email,password})
            });
            const data = await response.json();
            if(data.status === 'success') {
                navigate('/login');
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div className="container">
            <div className='form-container'>
                <h2 className='page-name'>Registration</h2>
                <form  onSubmit={handleSubmit} className='form'>
                    <input 
                        type="text" 
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    /> 
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
                        <button className='form-btn'>Register</button>
                    </div>
                </form>
                <div className='extra'>
                    <p className='extra-p'>Already have account?
                        <button className='extra-btn' onClick={() => navigate('/login')}>Login</button>
                    </p>
                </div>
            </div>
        </div>
      
    )
}

export default Register;
