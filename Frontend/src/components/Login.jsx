import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handlelogin = async (e) => {
        e.preventDefault();

        const credentials = { username, password };

        try {
            const response = await fetch("https://localhost:7140/api/Auth/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.name);
                localStorage.setItem('id', data.id);
                localStorage.setItem('role', data.role);
                setSuccess('Login successful!');
                setError('');
                navigate(`/about`);
            } else if (response.status === 401) {
                setError('Unauthorized: Invalid username or password');
                setSuccess('');
            } else {
                const data = await response.json();
                setError(data.message || 'Invalid login or password');
                setSuccess('');
            }
        } catch (err) {
            setError('An error occurred while logging in');
            setSuccess('');
        }

        setUsername('')
        setPassword('')
    };

    return (
        <div className="bg-gray-700 flex justify-center items-center h-screen">
            <div className="bg-white p-10 rounded-lg shadow-md w-1/2">
                <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
                <form onSubmit={handlelogin} className="space-y-4">
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
                        <label className="block text-lg font-medium mb-2">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:cursor-pointer"
                    >
                        Login
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

export default Login;