import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllPosts, getPostForHastag } from '../../api/PostRequest'

const Hastag = ({ hastag, listHastags }) => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [count, setCount] = useState(0)

  // Func
  const handleClick = async () => {
    const { data } = await getPostForHastag(hastag)
    console.log(data)
    navigate('/posts/result', { state: { posts: data } })
  }

  useEffect(() => {
    listHastags.forEach((item) => {
      if (item === hastag) {
        setCount((prev) => prev + 1)
      }
    })
  }, [])

  return (
    <div>
      <span>
        <b style={{ color: 'purple', cursor: 'pointer' }} onClick={handleClick}>
          #{hastag}
        </b>
        <p>{count} bài viết</p>
      </span>
    </div>
  )
}

export default Hastag
