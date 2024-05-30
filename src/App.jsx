import { useState, useEffect, createContext } from "react";
import { Routes, Route, HashRouter } from "react-router-dom"
import MakePost from "./components/MakePost" 
import Posts from "./components/Posts"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton, Tooltip } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';

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

  // Declare state hook for mode
  const [lightMode, setLightMode] = useState(true)

  // Declare function for toggling mode
  const toggleMode = () => {
    if (lightMode == true) {
      setLightMode(false)
    } else {
      setLightMode(true)
    }
  }

  const ModeButton = () => {
    return (
      <Tooltip placement='bottom' arrow title={lightMode == false ? ('Light Mode') : ('Dark Mode')}>
        <IconButton onClick={() => {toggleMode()}}>
            {lightMode == false ? (<LightModeIcon className='sm:!text-6xl !text-4xl text-yellow-300'/>) : (<ModeNightIcon className='sm:!text-6xl !text-4xl'/>)}
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <PostsContext.Provider value={posts}>
      <HashRouter>
        <Routes>
          <Route index element={<MakePost lightMode={lightMode} ModeButton={ModeButton}/>}/>
          <Route path="posts" element={<Posts lightMode={lightMode} ModeButton={ModeButton}/>}/>
        </Routes>
        <ToastContainer/>
      </HashRouter>
    </PostsContext.Provider>
  )
}

export default App
