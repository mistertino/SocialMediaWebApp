import React, { useEffect, useState } from 'react'
import './TrendCard.css'
import { getAllPosts } from '../../api/PostRequest'

const TrendCard = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await getAllPosts()
      console.log(data)
      setPosts(data)
    }
    fetchPosts()
  }, [])
  return (
    <div className="TrendCard">
      {posts.map((post) => {
        if (post.hastag !== undefined && post.likes.length > 1) {
          return (
            <div className="trend">
              <span>{post.hastag ? '#' + post.hastag : null}</span>
              <span>
                {post.hastag ? post.likes.length + ' Lượt thích' : null}{' '}
              </span>
            </div>
          )
        }
      })}
    </div>
  )
}

export default TrendCard
