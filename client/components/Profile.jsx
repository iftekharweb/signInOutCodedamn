import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom'; 
import IMG from '../src/assets/home.png';
import './style.css'

const Profile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    const decodeToken = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
              .join('')
        );
        return JSON.parse(jsonPayload);
    };
    
    async function populateProfile() {
        const response = await fetch(`https://signinoutcodedamn.onrender.com/api/profile`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        const data = await response.json();
        setName(data.user.name);
        setEmail(data.user.email);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            const user = decodeToken(token);
            if(!user) {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                populateProfile();
            }
        } else {
            navigate('/login');
        }
    }, []);

    const handleClick = (e) => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <div className='profile-container'>
            <nav className='navv'>
                <div className='img-div'>
                    <img src={IMG} alt="Home Icon" style={{width:'30px', height:'30px'}}/>
                </div>
                <div>
                    <p className='p-email'>
                        {email}
                    </p>
                </div>
            </nav>
            <div  className="content">
                <h2 className='theh2'>Hello, <span style={{color:'#0078AA'}}>{name}</span> 😃</h2>
                <h2 className='theh2'>Your have logged in successfully.</h2>
                <button onClick={handleClick} className='out-btn'>Logout</button>
            </div>
        </div>
    );
}

export default Profile
