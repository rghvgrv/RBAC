// components/Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
        } else {
            // Call API to create new user
            console.log('New user created:', { username, fullname, password });
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
                    <Link to ="/">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:cursor-pointer"
                    >
                        Signup
                    </button>
                    </Link>
                    <Link to ="/">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-5 hover:cursor-pointer"
                    >
                        Back
                    </button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;