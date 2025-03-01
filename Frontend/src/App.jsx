import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about/:id" element={<About/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;