import { useState } from 'react'
import blog from '../assets/images/blog.png'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import { PostsContext } from '../App'
import { useContext } from 'react'
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { IconButton, Tooltip } from '@mui/material'

const MakePost = () => {
  // Declare state hooks for variables
  const [username, setUsername] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // Declare state hooks for light mode and night mode
  const [lightMode, setLightMode] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const toggleMode = () => {
    if (lightMode == true) {
      setLightMode(false)
      setDarkMode(true)
    } else {
      setLightMode(true)
      setDarkMode(false)
    }
  }

  // Get posts from PostsContext
  const posts = useContext(PostsContext)

  // Push post to posts cache
  const submit = (e) => {
    // Prevent page from refreshing
    e.preventDefault()
    
    // Get current month and convert to string
    let month = new Date().getMonth()
    switch (month) {
      case 0:
        month = 'January'
        break
      case 1:
        month = 'February'
        break
      case 2:
        month = 'March'
        break
      case 3:
        month = 'April'
        break
      case 4:
        month = 'May'
        break
      case 5:
        month = 'June'
        break
      case 6:
        month = 'July'
        break
      case 7:
        month = 'August'
        break
      case 8:
        month = 'September'
        break
      case 9:
        month = 'October'
        break
      case 10:
        month = 'November'
        break
      case 11:
        month = 'December'
        break
    }
    
    // Get current day of month
    const day = new Date().getDate()
    
    // Get current year
    const year =  new Date().getFullYear()
    
    // Concatenate day, month, and year
    const date = `${month} ${day}, ${year}`
    
    // Convert post to JSON object
    const post = {
      username, 
      title, 
      content, 
      date
    }
    
    // Push post to posts
    posts.push(post)
    
    // Update posts cache
    localStorage.setItem('posts', JSON.stringify(posts))
    
    // Clear inputs
    const inputs = document.getElementsByTagName('input');
    for (let i=0; i < inputElements.length; i++) {
      inputs[i].value = '';
    }
    document.querySelector('textarea').value=''
    
    // Render success toast
    toast('Post uploaded!', {theme: 'light'})
  }

  return (
    <div className="make-post">
      <img className='image' src={blog}/>
      <form className={`inputs ${lightMode == true ? ('light-mode') : ('dark-mode')}`} onSubmit={submit}>
        <div className='mode-button-container'>
        <Tooltip placement='bottom' arrow title={lightMode == false ? ('Light Mode') : ('Dark Mode')}>
          <IconButton onClick={() => {toggleMode()}}>
              {lightMode == false ? (<LightModeIcon className='!text-6xl text-yellow-300'/>) : (<ModeNightIcon className='!text-6xl'/>)}
          </IconButton>
        </Tooltip>
        </div>
        <h1>What's on your mind?</h1>
        <div>
          <h2>Username</h2>
          <input required onChange={(e) => {setUsername(e.target.value)}}/>
        </div>
        <div>
          <h2>Title</h2>
          <input required onChange={(e) => {setTitle(e.target.value)}}/>
        </div>
        <div className='mb-10'>
          <h2>Content</h2>
          <textarea required onChange={(e) => {setContent(e.target.value)}}/>
        </div>
        <button className='submit-btn' type='submit'>Submit</button>
        <Link to='/posts' className='w-full'><button className='submit-btn'>View Posts</button></Link>
      </form>
    </div>
  )
}

export default MakePost