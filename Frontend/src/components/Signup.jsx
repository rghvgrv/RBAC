import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setSuccess('');
            return;
        }

        const userData = {
            username,
            fullName: fullname,
            password,
        };

        try {
            const response = await fetch('https://localhost:7140/api/User/Add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.text();
                alert(data);
                setSuccess('Signup successful!');
                navigate('/login');
            } else {
                const data = await response.json();
                setError(data.message || 'Invalid signup data');
                setSuccess('');
            }
        } catch (err) {
            setError('An error occurred while signing up');
            setSuccess('');
        }
    };

    return (
        <div className="bg-gray-600 flex justify-center items-center h-screen">
            <div className="bg-white p-10 rounded-lg shadow-md w-1/2">
                <h1 className="text-3xl font-bold text-center mb-4">Signup</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-lg font-medium mb-2">Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="block w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-2">Fullname:</label>
                        <input
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            required
                            className="block w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-2">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-2">Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="block w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:cursor-pointer"
                    >
                        Signup
                    </button>
                    <Link to="/">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-5 hover:cursor-pointer"
                        >
                            Back
                        </button>
                    </Link>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                </form>
            </div>
        </div>
    );
}

export default Signup;