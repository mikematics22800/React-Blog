import { useState } from 'react'
import blog from '../assets/images/blog.png'
import { Link } from 'react-router-dom'
import { PostsContext } from '../App'
import { useContext } from 'react'
import { toast } from 'react-toastify'

const MakePost = ({lightMode, ModeButton}) => {
  // Declare state hooks for variables
  const [username, setUsername] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // Get posts from PostsContext
  const posts = useContext(PostsContext)

  // Push post to posts cache
  const submitPromise =  async () => {
    // Get current month
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[new Date().getMonth()]

    // Get current day of month
    const day = new Date().getDate()
    
    // Get current year
    const year =  new Date().getFullYear()

    // Get current hour
    const hour = new Date().getHours()

    // Get current minute
    const minute = new Date().getMinutes()

    // Concantenate hour and minute
    const time = `${hour}:${minute} UTC`
    
    // Concatenate day, month, year, and time
    const date = `${month} ${day}, ${year} at ${time}`
    
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
  }

  // Load success message if post saves to cache, error message if it fails.
  const submit = (e) => {
    // Prevent page from refreshing
    e.preventDefault()
    submitPromise().then(() => {
      toast('Post saved!', {theme: 'light'})
    }).catch(() => {
      toast.error('Failed to save post.')
    }).finally(() => {
      // Clear inputs after submission
      const inputs = document.getElementsByTagName('input');
      for (let i = 0; i < inputs.length; i++) {
          inputs[i].value = '';
      }
      document.querySelector('textarea').value = '';
    });;
  };

  return (
    <div className="make-post">
      <img className='image' src={blog}/>
      <form className={`${lightMode == true ? ('') : ('dark')}`} onSubmit={submit}>
        <div className='mode-btn-container'>
          <ModeButton/>
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