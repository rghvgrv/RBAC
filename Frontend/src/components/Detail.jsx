import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Detail() {
    const [userDetails, setUserDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token')

    const handleEdit = (username) => {
        localStorage.setItem('editUsername', username);
        navigate('/update');
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!id) {
                setError('User  ID is not available');
                return;
            }

            try {
                const response = await fetch(`https://localhost:7140/api/User/GetDetails/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUserDetails(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserDetails();
    }, [id]);

    if (isLoading) {
        return <div class="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 class="text-3xl font-bold text-center mb-4">Loading...</h1>
        </div>
    }

    if (error) {
        return <div class="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 class="text-3xl font-bold text-center mb-4">Error: {error}</h1>
        </div>
    }
    return (
        <div class="bg-gray-700 h-screen flex justify-center items-center bg-gray-100">
            <div class="p-4 bg-white rounded-lg shadow-md">
                <h1 class="text-3xl font-bold text-center mb-4">Hello {userDetails.length == 1 ? userDetails[0].fullName : "Admin"}</h1>
                <table class="w-full table-auto">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="px-4 py-2 text-left">S.No.</th>
                            <th class="px-4 py-2 text-left">Username</th>
                            <th class="px-4 py-2 text-left">Fullname</th>
                            <th class="px-4 py-2 text-left">Password</th>
                            <th class="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userDetails.map((user, index) => (
                            <tr key={index} class="border-b border-gray-200">
                                <td class="px-4 py-2">{index + 1}</td>
                                <td class="px-4 py-2">{user.username}</td>
                                <td class="px-4 py-2">{user.fullName}</td>
                                <td class="px-4 py-2">**********</td>
                                <td class="px-4 py-2 flex justify-center">
                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 hover:cursor-pointer" onClick={() => handleEdit(user.username)}>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to='/about'>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 hover:cursor-pointer">
                        Back
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Detail;