import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }
  }, []);


  const handleLogout = async () => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (userId && token) {
      try {
        const response = await fetch("https://localhost:7140/api/Auth/Logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId }),
        });

        if (response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("id");
          localStorage.clear();
          navigate("/"); // Redirect to login page
        } else {
          console.error("Logout failed", await response.text());
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    } else {
      console.error("User is not logged in.");
    }
  };
  return (
    <div className="bg-gray-700 flex justify-center items-center h-screen">
      <div className="w-200 p-4 bg-white rounded-lg shadow-md">
        <p className="text-lg text-gray-600 mb-4">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
        <div className="flex justify-between">
          <Link to='/detail'>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer">Detail</button>
          </Link>
          {role === 'ADMIN' && (
            <Link to='/admin'>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer">Admin</button>
            </Link>
          )}
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;