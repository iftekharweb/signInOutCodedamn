import { useState } from 'react'
import Register from '../components/Register';
import Login from '../components/Login';
import Profile from '../components/Profile';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
    const [redirectToProfile, setRedirectToProfile] = useState(false);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<Register/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/profile' index element={<Profile/>}></Route>
                <Route path='/*' element={<Profile />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
