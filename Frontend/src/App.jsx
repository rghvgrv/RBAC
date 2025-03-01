import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';
import Update from './components/Update';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path='/update' element={<Update/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;