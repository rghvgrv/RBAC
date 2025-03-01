import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Update() {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [matchPassword, setMatchPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        const editUsername = localStorage.getItem('editUsername');
        if (editUsername) {
            setUsername(editUsername);
            // Fetch user data from API to populate the form fields
            fetchUserData(editUsername);
        } else {
            navigate('/'); // Redirect to home page if no username is found
        }
    }, []);

    const fetchUserData = async (username) => {
        try {
            const response = await fetch(`https://localhost:7140/api/User/GetDetailsByUserName/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setFullName(data.fullName);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== matchPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await fetch(`https://localhost:7140/api/User/Update/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    fullName,
                    password,
                }),
            });
            const data = await response.text();
            if (response.ok) {
                alert("Update Successfully")
                navigate(`/about`);
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error(error);
        }
        localStorage.removeItem('editUsername');
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
                <h1 className="text-2xl font-bold mb-4">Update Details for {username}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-lg font-medium">Full Name:</label>
                        <input type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} className="p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-medium">Password:</label>
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-medium">Match Password:</label>
                        <input type="password" value={matchPassword} onChange={(event) => setMatchPassword(event.target.value)} className="p-2 border border-gray-300 rounded-lg" />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer">Update</button>
                    <Link to="/about" onClick={() => localStorage.removeItem('editUsername')}>
                        <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer">Back</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Update;