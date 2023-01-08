import React, { useEffect, useState } from 'react'
import { Tabs } from '@mantine/core'
import { deleteUser, getAllUsers } from '../../api/UserRequest'
import profilePicture from '../../img/user.png'
import { Link } from 'react-router-dom'
import { getPostsReport } from '../../api/PostRequest'
import Post from '../Post/Post'
import './AdminSide.css'
import { useSelector } from 'react-redux'
import { UilExclamationOctagon } from '@iconscout/react-unicons'

const AdminSide = () => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const [activeTab, setActiveTab] = useState('users-manage')
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])

  const handleDeleteUser = async (id) => {
    await deleteUser(id, user.isAdmin)
    const users = await getAllUsers()
    setUsers(users.data)
  }

  useEffect(() => {
    const getData = async () => {
      const users = await getAllUsers()
      setUsers(users.data)
      const posts = await getPostsReport()
      setPosts(posts.data)
    }

    getData()
  }, [activeTab])

  return (
    <Tabs
      color="grape"
      variant="pills"
      value={activeTab}
      onTabChange={setActiveTab}
    >
      <Tabs.List grow>
        <Tabs.Tab value="users-manage">Quản lý người dùng</Tabs.Tab>
        <Tabs.Tab value="posts-report">Báo cáo bài viết</Tabs.Tab>
      </Tabs.List>

      {/* User Manage */}
      <Tabs.Panel value="users-manage">
        <div className="manage-user-container">
          {users.map((user) => (
            <div className="follower">
              <div>
                <img
                  src={
                    user.profilePicture?.url
                      ? user.profilePicture?.url
                      : profilePicture
                  }
                  alt=""
                  className="followerImg"
                />
                <div className="name">
                  <span>
                    <Link
                      to={`/profile/${user._id}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      {user.firstname} {user.lastname}
                    </Link>
                  </span>
                  <span>{user.username}</span>
                </div>
              </div>
              <button
                className="button  btn-delete"
                onClick={() => handleDeleteUser(user._id)}
              >
                Xoá tài khoản
              </button>
            </div>
          ))}
        </div>
      </Tabs.Panel>

      {/* Posts Report */}
      <Tabs.Panel value="posts-report">
        <div className="posts-report-manage">
          {posts?.length === 0 ? (
            <span style={{ textAlign: 'center' }}>
              Không có bài viết nào bị báo cáo
            </span>
          ) : (
            posts.map((post) => (
              <div className="post-report">
                <span>
                  <UilExclamationOctagon /> Có <b>{post?.report?.length}</b>{' '}
                  người báo cáo bài viết này
                </span>
                <Post post={post} location="viewPost" key={post._id} />
              </div>
            ))
          )}
        </div>
      </Tabs.Panel>
    </Tabs>
  )
}

export default AdminSide
