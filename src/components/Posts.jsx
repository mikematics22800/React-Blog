import { Link } from "react-router-dom"
import { PostsContext } from '../App'
import { useContext } from 'react'

const Posts = ({lightMode, ModeButton}) => {
  // Get posts from PostsContext
  const posts = useContext(PostsContext)

  // Map through posts and return a list of containers with post information
  const list = posts.map((post, i) => {
    return (
      <div className='post' key={i}>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <h2>Posted by {post.username} on {post.date}</h2>
      </div>
    )
  })

  return (
    <div className={`posts ${lightMode == true ? ('light') : ('dark')}`}>
      <header>
        <h1>My First Blog</h1>
        {/* Navigate to posts page */}
        <div>
          <Link to='/'>
            <button class='post-btn'>Make Post</button>
          </Link>
          <ModeButton/>
        </div>
      </header>
      {/* Render message if posts are empty */}
      {posts.length == 0 ? (
        <div className="empty">
          <h1>You haven't posted anything yet.</h1>
        </div>
      ) : (
        <div className={`list ${lightMode == true ? ('border-black') : ('border-white')}`}>
          {list}
        </div>
      )}
      <footer>
        <h1>Created with <a href="https://vitejs.dev/">Vite</a> and <a href="https://tailwindcss.com/">Tailwind CSS</a></h1>
      </footer>
    </div>
  )
}

export default Posts