import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Admin() {
    const token = localStorage.getItem('token');
    const roletype = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRole = async () => {
            if (!token || roletype !== "ADMIN") {
                navigate('/about');
                return;
            }
            try {
                const response = await fetch("https://localhost:7140/api/Auth/ValidateToken", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.role !== 1) {
                    navigate('/about');
                }
            } catch (err) {
                console.error(err);
                navigate('/about');
            }
        };
        fetchRole();
    }, []); // Add an empty dependency array

    if (roletype !== "ADMIN") {
        navigate('/about');
        return null;
    }

    return (
        <div className="bg-gray-700 flex justify-center items-center h-screen">
            <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
                <p className="text-lg text-gray-600 mb-4">ADMIN ACCESS ONLY PAGE DEMO DUMMY</p>
                <Link to='/about'>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 hover:cursor-pointer">
                        Back
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Admin;