import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../api/PostRequest'

const Hastag = ({ hastag, listHastags }) => {
  const [posts, setPosts] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    listHastags.forEach((item) => {
      if (item === hastag) {
        console.log(item)
        setCount((prev) => prev + 1)
      }
    })
  }, [])

  return (
    <div>
      <span>
        <b style={{ color: 'purple', cursor: 'pointer' }}>{hastag}</b>
        <p>{count} bài viết</p>
      </span>
    </div>
  )
}

export default Hastag
