import { useState } from 'react'
import blog from '../assets/images/blog.png'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import { PostsContext } from '../App'
import { useContext } from 'react'

const MakePost = () => {
  // Declare state hooks for variables
  const [username, setUsername] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

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
      <form className="inputs" onSubmit={submit}>
        <h1>What's on your mind?</h1>
        <div>
          <h2>Username</h2>
          {/* Set username to input value */}
          <input required onChange={(e) => {setUsername(e.target.value)}}/>
        </div>
        <div>
          <h2>Title</h2>
          {/* Set title to input value */}
          <input required onChange={(e) => {setTitle(e.target.value)}}/>
        </div>
        <div className='mb-10'>
          <h2>Content</h2>
          {/* Set content to input value */}
          <textarea required onChange={(e) => {setContent(e.target.value)}}/>
        </div>
        {/* Submit post */}
        <button type='submit'>Submit</button>
        {/* Navigate to posts page */}
        <Link to='/posts' className='w-full'><button>View Posts</button></Link>
      </form>
    </div>
  )
}

export default MakePost