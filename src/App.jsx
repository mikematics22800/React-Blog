import { useState, useEffect, createContext } from "react";
import { Routes, Route, HashRouter } from "react-router-dom"
import MakePost from "./components/MakePost" 
import Posts from "./components/Posts"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Declare and export PostsContext
export const PostsContext = createContext()

const App = () => {
  // Declare state hook for posts array
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // Check for posts cache
    const cache = localStorage.getItem('posts')
    // If posts cache exists, update posts array
    if (cache) {
      setPosts(JSON.parse(cache))
    }
  }, [])


  return (
    /* Gives children access to posts array */
    <PostsContext.Provider value={posts}>
      {/* Enables page navigation */}
      <HashRouter>
        <Routes>
          {/* Links root page to MakePost component */}
          <Route index element={<MakePost/>}/>
          {/* Links posts page to Posts component */}
          <Route path="posts" element={<Posts/>}/>
        </Routes>
        {/* Enables react-toastify */}
        <ToastContainer/>
      </HashRouter>
    </PostsContext.Provider>
  )
}

export default App
