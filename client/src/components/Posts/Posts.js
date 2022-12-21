import React, { useEffect } from 'react'
import './Posts.css'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getTimelinePosts } from '../../action/PostAction'
import { useParams } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import Spinner from 'react-bootstrap/Spinner'

import InfiniteScroll from 'react-infinite-scroller'
import { getTimlinePosts } from '../../api/PostRequest'

const Posts = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  let { posts, loading } = useSelector((state) => state.postReducer)
  let page = 1

  useEffect(() => {
    if (params.id) {
    }
    dispatch(getTimelinePosts(user._id, page))
  }, [posts.length, params.id])

  const postsLoading = async (page) => {
    const { data: newPostsLoading } = await getTimlinePosts((user._id, page))

    if (posts.length <= 5) {
      await setData((posts) => [...posts, ...newPostsLoading])
    }
  }

  if (params.id) {
    posts = posts.filter((post) => post.userId === params.id)
  }

  if (!posts) return 'Không có bài viết nào hiện tại!'
  else
    return (
      <div className="Posts">
        {loading ? (
          <div className="loading">
            <Spinner animation="border" />
            <span style={{ color: 'purple' }}>Đang tải bài viết....</span>
          </div>
        ) : (
          // posts.map((post, id) => (
          //   <>
          //     <LazyLoad
          //       key={post._id}
          //       height={50}
          //       offset={[-50, 50]}
          //       placeholder={
          //         <div className="loading">
          //           <Spinner animation="border" />
          //           <span style={{ color: 'purple' }}>
          //             Đang tải bài viết....
          //           </span>
          //         </div>
          //       }
          //     >
          //       <Post post={post} posts={posts} key={id} />
          //     </LazyLoad>
          //   </>
          // ))

          <InfiniteScroll
            pageStart={page}
            loadMore={postsLoading(page)}
            hasMore={true || false}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
          >
            {posts.map((post, index) => (
              <Post post={post} posts={posts} key={id} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    )
}

export default Posts
