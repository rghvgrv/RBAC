import { Link } from 'react-router-dom'
import './Home.css'
function Home() {

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700 space-y-6">
      <h1 className="text-5xl font-bold text-white">Welcome</h1>
      <div className="flex space-x-6">
        <Link to="/login">
        <button className="text-white relative z-0 rounded bg-blue-500 px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-blue-700 after:transition-[all_0.3s_ease] hover:after:w-full hover:cursor-pointer">
          Login
        </button>
        </Link>
        <Link to="/signup">
        <button className=" text-white relative z-0 rounded bg-blue-500 px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-blue-700 after:transition-[all_0.3s_ease] hover:after:w-full hover:cursor-pointer">
          Signup
        </button>
        </Link>
      </div>
    </div>
    </>
  )
}

export default Home